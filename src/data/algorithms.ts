export type AlgorithmAnswers = Record<string, string | string[]>;

export type AlgorithmQuestion = {
  id: string;
  label: string;
  helpText?: string;
  type: 'single' | 'multi' | 'text' | 'number';
  options?: string[];
  showWhen?: (answers: AlgorithmAnswers) => boolean;
  emergencyWhen?: (answer: string | string[] | undefined) => boolean;
};

const yesIsEmergency = (answer: string | string[] | undefined) => answer === 'Yes';

export const treatmentAlgorithms: Record<string, AlgorithmQuestion[]> = {
  uti: [
    { id: 'sex', label: 'Are you male or female?', type: 'single', options: ['Female', 'Male'], emergencyWhen: (answer) => answer === 'Male' },
    { id: 'kidney-stones', label: 'Do you have a history of kidney stones?', type: 'single', options: ['Yes', 'No'] },
    { id: 'stones-feel-same', label: 'Does this feel like your previous kidney stones?', type: 'single', options: ['Yes', 'No'], showWhen: (a) => a['kidney-stones'] === 'Yes' },
    { id: 'stones-surgery', label: 'Have you ever required surgery or a procedure for a kidney stone?', type: 'single', options: ['Yes', 'No'], showWhen: (a) => a['kidney-stones'] === 'Yes' && a['stones-feel-same'] === 'Yes', emergencyWhen: yesIsEmergency },
    { id: 'urine-infections', label: 'Do you have a history of urine infections?', type: 'single', options: ['Yes', 'No'], showWhen: (a) => !(a['kidney-stones'] === 'Yes' && a['stones-feel-same'] === 'Yes' && a['stones-surgery'] === 'No') },
    { id: 'uti-hospital', label: 'Do you usually get hospitalized for urine infections?', type: 'single', options: ['Yes', 'No'], showWhen: (a) => a['urine-infections'] === 'Yes', emergencyWhen: yesIsEmergency },
    { id: 'resistant-organisms', label: 'Do you have a history of growing drug-resistant organisms?', type: 'single', options: ['Yes', 'No'], showWhen: (a) => !(a['kidney-stones'] === 'Yes' && a['stones-feel-same'] === 'Yes' && a['stones-surgery'] === 'No'), emergencyWhen: yesIsEmergency },
    { id: 'urinating-blood', label: 'Are you urinating blood?', type: 'single', options: ['Yes', 'No'], showWhen: (a) => !(a['kidney-stones'] === 'Yes' && a['stones-feel-same'] === 'Yes' && a['stones-surgery'] === 'No'), emergencyWhen: yesIsEmergency },
    { id: 'uti-symptoms', label: 'What symptoms are you experiencing?', helpText: 'Select all that apply.', type: 'multi', options: ['Burning on urination', 'Blood in the urine (pink-tinged urine)', 'Lower abdominal pain'] },
    { id: 'uti-fever', label: 'Are you having any fever or chills?', type: 'single', options: ['Yes, I have taken a temperature and it is above 100.4°F', 'Yes, I feel feverish', 'No'] },
    { id: 'mid-back-pain', label: 'Are you experiencing mid-back pain around your kidneys?', type: 'single', options: ['Yes', 'No'] },
  ],
  uri: [
    { id: 'uri-emergency', label: 'Do any of these apply right now?', helpText: 'Shortness of breath, coughing blood, or chest pain.', type: 'single', options: ['Yes', 'No'], emergencyWhen: yesIsEmergency },
    { id: 'uri-symptoms', label: 'What symptoms are you having?', helpText: 'Select all that apply.', type: 'multi', options: ['Cough', 'Runny nose', 'Sinus congestion'] },
    { id: 'uri-onset-number', label: 'When did the symptoms start?', type: 'number' },
    { id: 'uri-onset-unit', label: 'Choose the time unit.', type: 'single', options: ['Days ago', 'Weeks ago', 'Months ago'] },
    { id: 'mucus-color', label: 'What color is the mucus from your cough or runny nose?', type: 'single', options: ['Clear', 'Green', 'Rust-colored'] },
    { id: 'uri-fever', label: 'Do you have any fever or chills?', type: 'single', options: ['Yes, I have taken a temperature and it is above 100.4°F', 'Yes, I feel like I have a fever', 'No'] },
  ],
  'sti-exposure': [
    { id: 'genital-lesions', label: 'Do you have any new genital skin lesions on your penis, scrotum, or vagina?', type: 'single', options: ['Yes', 'No'], emergencyWhen: yesIsEmergency },
    { id: 'genital-pain', label: 'Do you have testicular pain or vaginal/pelvic pain?', type: 'single', options: ['Yes', 'No'], emergencyWhen: yesIsEmergency },
    { id: 'bloody-discharge', label: 'Are you having bloody discharge from your penis or vagina?', type: 'single', options: ['Yes', 'No'], emergencyWhen: yesIsEmergency },
    { id: 'unresolved-std', label: 'Have you recently been treated for an STD and symptoms have not improved?', type: 'single', options: ['Yes, treated but symptoms have not improved', 'No, I have not been treated recently'], emergencyWhen: (answer) => answer === 'Yes, treated but symptoms have not improved' },
    { id: 'discharge-color', label: 'What color is your penile or vaginal discharge?', type: 'text' },
  ],
};
