const HEALTHIE_URL = process.env.HEALTHIE_GRAPHQL_URL || 'https://api.gethealthie.com/graphql';

async function healthie(query, variables) {
  const response = await fetch(HEALTHIE_URL, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Basic ${process.env.HEALTHIE_API_KEY}`, AuthorizationSource: 'API' }, body: JSON.stringify({ query, variables }) });
  const result = await response.json();
  if (!response.ok || result.errors?.length) throw new Error(result.errors?.[0]?.message ?? 'Healthie request failed.');
  return result.data;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed.' });
  const config = ['HEALTHIE_API_KEY', 'HEALTHIE_PROVIDER_ID', 'HEALTHIE_INTAKE_FORM_ID', 'HEALTHIE_QUESTION_ID_MAP'];
  const missingConfig = config.filter((key) => !process.env[key]);
  if (missingConfig.length) return res.status(503).json({ message: `Healthie setup is missing: ${missingConfig.join(', ')}.` });
  const { firstName, lastName, email, answers } = req.body ?? {};
  if (![firstName, lastName, email].every((value) => typeof value === 'string' && value.trim())) return res.status(400).json({ message: 'Name and email are required.' });
  try {
    const found = await healthie('query ($keywords: String!, $providerId: String!) { users(keywords: $keywords, provider_id: $providerId, limited_to_provider: true) { id email } }', { keywords: email.trim(), providerId: process.env.HEALTHIE_PROVIDER_ID });
    let patient = found.users.find((user) => user.email?.toLowerCase() === email.trim().toLowerCase());
    if (!patient) {
      const created = await healthie('mutation ($firstName: String!, $lastName: String!, $email: String!, $providerId: String!) { createClient(input: { first_name: $firstName, last_name: $lastName, email: $email, dietitian_id: $providerId, dont_send_welcome: false }) { user { id email } messages { message } } }', { firstName: firstName.trim(), lastName: lastName.trim(), email: email.trim(), providerId: process.env.HEALTHIE_PROVIDER_ID });
      patient = created.createClient.user;
      if (!patient?.id) throw new Error(created.createClient.messages?.[0]?.message ?? 'Could not create patient.');
    }
    const map = JSON.parse(process.env.HEALTHIE_QUESTION_ID_MAP);
    const formAnswers = Object.entries(answers ?? {}).filter(([key]) => map[key]).map(([key, answer]) => ({ custom_module_id: String(map[key]), user_id: String(patient.id), answer: Array.isArray(answer) ? answer.join(', ') : String(answer) }));
    await healthie('mutation ($formId: String!, $userId: String!, $formAnswers: [FormAnswerInput!]!) { createFormAnswerGroup(input: { finished: true, custom_module_form_id: $formId, user_id: $userId, form_answers: $formAnswers }) { form_answer_group { id } messages { message } } }', { formId: process.env.HEALTHIE_INTAKE_FORM_ID, userId: String(patient.id), formAnswers });
    const record = await healthie('query ($id: ID!) { user(id: $id) { set_password_link } }', { id: patient.id });
    const redirectUrl = record.user?.set_password_link || process.env.HEALTHIE_SIGN_IN_URL;
    if (!redirectUrl) throw new Error('No secure sign-in link is available.');
    return res.status(200).json({ redirectUrl });
  } catch (error) {
    console.error('Healthie intake handoff failed', error);
    return res.status(502).json({ message: 'We could not finish your secure account connection.' });
  }
}
