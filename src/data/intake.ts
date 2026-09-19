export type IntakeQuestion = {
  id: string;
  section: string;
  prompt: string;
  helpText?: string;
  type: 'single' | 'multi' | 'text' | 'number' | 'date';
  options?: string[];
  required?: boolean;
  showWhen?: { questionId: string; includes: string };
};

// This is the front-end source of truth for the demo. Move this list to a CMS
// or API when clinicians should manage questions without a deployment.
export const intakeQuestions: IntakeQuestion[] = [
  { id: 'care', section: 'Getting started', prompt: 'What would you like help with today?', type: 'single', options: ['Simple UTI', 'Cold or flu symptoms', 'Skin concern', 'Birth control', 'Weight management', 'Something else'], required: true },
  { id: 'state', section: 'Getting started', prompt: 'Which state are you currently in?', helpText: 'This helps us confirm whether care is available where you are.', type: 'single', options: ['Alabama', 'California', 'Florida', 'New York', 'Texas', 'Washington', 'Another state'], required: true },
  { id: 'age', section: 'About you', prompt: 'What is your age?', type: 'number', required: true },
  { id: 'uti-signs', section: 'Your symptoms', prompt: 'Which UTI symptoms are you experiencing?', helpText: 'Choose all that apply.', type: 'multi', options: ['Burning when urinating', 'Frequent urge to urinate', 'Lower abdominal discomfort', 'Blood in urine', 'None of these'], showWhen: { questionId: 'care', includes: 'UTI' }, required: true },
  { id: 'birth-control-goal', section: 'Your care goals', prompt: 'What are you looking for from birth control?', type: 'single', options: ['Start a new method', 'Renew or change a prescription', 'Manage symptoms', 'Not sure yet'], showWhen: { questionId: 'care', includes: 'Birth Control' }, required: true },
  { id: 'weight-goal', section: 'Your care goals', prompt: 'What would you like support with?', type: 'multi', options: ['Weight management', 'Medication eligibility', 'Nutrition habits', 'Existing medication follow-up'], showWhen: { questionId: 'care', includes: 'GLP' }, required: true },
  { id: 'uri-signs', section: 'Your symptoms', prompt: 'Which cold or flu symptoms are you experiencing?', type: 'multi', options: ['Cough', 'Sore throat', 'Congestion', 'Fever or chills', 'Body aches'], showWhen: { questionId: 'care', includes: 'URI' }, required: true },
  { id: 'rash-details', section: 'Your symptoms', prompt: 'Which best describes your skin concern?', type: 'multi', options: ['Itching', 'Redness', 'Dry or scaly skin', 'Pain', 'Spreading or changing area'], showWhen: { questionId: 'care', includes: 'Rash' }, required: true },
  { id: 'second-opinion-goal', section: 'Your care goals', prompt: 'What would you like reviewed in your second opinion?', type: 'single', options: ['A diagnosis', 'A treatment plan', 'Test results', 'Medication options'], showWhen: { questionId: 'care', includes: 'Second Opinion' }, required: true },
  { id: 'hormonal-goal', section: 'Your care goals', prompt: 'What would you like help with?', type: 'multi', options: ['Menopause symptoms', 'Hormone treatment follow-up', 'Low energy or mood changes', 'Other hormonal concerns'], showWhen: { questionId: 'care', includes: 'Hormonal' }, required: true },
  { id: 'medicine-goal', section: 'Your care goals', prompt: 'What would you like to discuss with a doctor?', type: 'single', options: ['Medication question', 'New symptom', 'Treatment advice', 'General health concern'], showWhen: { questionId: 'care', includes: 'Medicine Consultation' }, required: true },
  { id: 'symptoms', section: 'Your symptoms', prompt: 'Which symptoms are you experiencing?', helpText: 'Choose all that apply.', type: 'multi', options: ['Pain or discomfort', 'Fever', 'Rash or skin change', 'Fatigue', 'No symptoms — seeking preventive care'], required: true },
  { id: 'symptom-details', section: 'Your symptoms', prompt: 'Please tell us a little more about what is going on.', helpText: 'Include when it started and anything that makes it better or worse.', type: 'text', required: true },
  { id: 'pregnant', section: 'Safety check', prompt: 'Are you pregnant, breastfeeding, or trying to become pregnant?', type: 'single', options: ['Yes', 'No', 'Not sure', 'Prefer not to say'], required: true },
  { id: 'medications', section: 'Safety check', prompt: 'Do you take any prescription medicines, over-the-counter medicines, or supplements?', type: 'single', options: ['Yes', 'No', 'Not sure'], required: true },
  { id: 'medication-details', section: 'Safety check', prompt: 'Please list the medicines or supplements you take.', type: 'text', showWhen: { questionId: 'medications', includes: 'Yes' }, required: true },
  { id: 'allergies', section: 'Safety check', prompt: 'Do you have medication allergies or past reactions?', type: 'single', options: ['Yes', 'No', 'Not sure'], required: true },
  { id: 'red-flags', section: 'Safety check', prompt: 'Are you experiencing any of these symptoms right now?', helpText: 'Choose all that apply. If you have a medical emergency, call 911.', type: 'multi', options: ['Trouble breathing', 'Chest pain', 'Fainting', 'Thoughts of self-harm', 'None of these'], required: true },
  { id: 'dateOfBirth', section: 'Your secure account', prompt: 'What is your date of birth?', type: 'date', required: true },
  { id: 'firstName', section: 'Your secure account', prompt: 'What is your first name?', type: 'text', required: true },
  { id: 'lastName', section: 'Your secure account', prompt: 'What is your last name?', type: 'text', required: true },
  { id: 'email', section: 'Your secure account', prompt: 'What is your email address?', helpText: 'This is the last step before we securely connect you to Healthie.', type: 'text', required: true },
];

export const isEmergencyAnswer = (answer: string | string[] | undefined) =>
  Array.isArray(answer) && answer.some((item) => item !== 'None of these');
