export interface QuestionOption {
  label: string;
  nextStep: string;
}

export interface Question {
  id: string;
  text: string;
  type: 'button' | 'checkbox' | 'text';
  options?: QuestionOption[];
}

export interface TreatmentAlgorithm {
  id: string;
  name: string;
  healthieUrl: string;
  startQuestionId: string;
  questions: Record<string, Question>;
}

export const ALGORITHMS: Record<string, TreatmentAlgorithm> = {
  // --- UTI ALGORITHM ---
  uti: {
    id: 'uti',
    name: 'Urinary Tract Infection',
    healthieUrl:
      'https://securestaging.gethealthie.com/appointments/embed_appt?dietitian_id=6590487&embed_form_id=2391967&form_only=true&primary_color=4A9625',
    startQuestionId: 'q1',
    questions: {
      q1: {
        id: 'q1',
        text: '1. Are you male or female?',
        type: 'button',
        options: [
          { label: 'MALE', nextStep: 'er' },
          { label: 'FEMALE', nextStep: 'q2' },
        ],
      },
      q2: {
        id: 'q2',
        text: '2. Do you have a history of kidney stones?',
        type: 'button',
        options: [
          { label: 'YES', nextStep: 'q2_feel' },
          { label: 'NO', nextStep: 'q3' },
        ],
      },
      // --- REPLACED INFORMAL LANGUAGE WITH OPTION A / OPTION B ---
      q2_feel: {
        id: 'q2_feel',
        text: 'Does this feel like your previous kidney stones?',
        type: 'button',
        options: [
          {
            label: 'YES',
            nextStep: 'q2_surg',
          },
          {
            label: 'No',
            nextStep: 'q3',
          },
        ],
      },
      q2_surg: {
        id: 'q2_surg',
        text: 'Have you ever required surgery/procedures for your kidney stone?',
        type: 'button',
        options: [
          { label: 'YES', nextStep: 'er' },
          { label: 'NO', nextStep: 'q5' },
        ],
      },
      q3: {
        id: 'q3',
        text: '3. Do you have a history of urine infections?',
        type: 'button',
        options: [
          { label: 'YES', nextStep: 'q3_hosp' },
          { label: 'NO', nextStep: 'q4' },
        ],
      },
      q3_hosp: {
        id: 'q3_hosp',
        text: 'Do you usually get hospitalized for your urine infections?',
        type: 'button',
        options: [
          { label: 'YES', nextStep: 'er' },
          { label: 'NO', nextStep: 'q4' },
        ],
      },
      q4: {
        id: 'q4',
        text: '4. Do you have a history of growing drug resistance organisms?',
        type: 'button',
        options: [
          { label: 'YES', nextStep: 'er' },
          { label: 'NO', nextStep: 'q4a' },
        ],
      },
      q4a: {
        id: 'q4a',
        text: '4a. Are you urinating blood?',
        type: 'button',
        options: [
          { label: 'YES', nextStep: 'er' },
          { label: 'NO', nextStep: 'form' },
        ],
      }
    },
  },

  // --- STI ALGORITHM ---
  sti: {
    id: 'sti',
    name: 'STI Exposure & Screening',
    healthieUrl:
      'https://securestaging.gethealthie.com/appointments/embed_appt?dietitian_id=6590487&embed_form_id=2391969&form_only=true&primary_color=4A9625',
    startQuestionId: 'q1',
    questions: {
      q1: {
        id: 'q1',
        text: '1. Do you have any new genital skin lesions on your penis, scrotum or vagina?',
        type: 'button',
        options: [
          { label: 'YES', nextStep: 'er' },
          { label: 'NO', nextStep: 'q2' },
        ],
      },
      q2: {
        id: 'q2',
        text: '2. Do you have any testicular pain (males) OR vaginal/pelvic pain (females)?',
        type: 'button',
        options: [
          { label: 'YES', nextStep: 'er' },
          { label: 'NO', nextStep: 'q2a' },
        ],
      },
      q2a: {
        id: 'q2a',
        text: '2a. Are you having bloody discharge from your penis/vagina?',
        type: 'button',
        options: [
          { label: 'YES', nextStep: 'er' },
          { label: 'NO', nextStep: 'q3' },
        ],
      },
      q3: {
        id: 'q3',
        text: '3. Have you recently been treated for an STD and if so, has the infection not resolved?',
        type: 'button',
        options: [
          { label: 'YES', nextStep: 'er' },
          { label: 'NO', nextStep: 'form' },
        ],
      }
    },
  },

  // --- URI / UTR ALGORITHM ---
  uri: {
    id: 'uri',
    name: 'Upper Respiratory Infection',
    healthieUrl:
      'https://securestaging.gethealthie.com/appointments/embed_appt?dietitian_id=6590487&embed_form_id=2391968&form_only=true&primary_color=4A9625',
    startQuestionId: 'q1',
    questions: {
      q1: {
        id: 'q1',
        text: '1. Do any of the following apply? (Shortness of breath, Coughing blood, Chest pain)',
        type: 'button',
        options: [
          { label: 'YES', nextStep: 'er' },
          { label: 'NO', nextStep: 'form' },
        ],
      }
    },
  },
};