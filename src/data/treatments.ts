import type { Treatment } from '../types';

// TODO: Replace with fetch('/api/treatments') when treatment-listing API is ready
export const treatments: Treatment[] = [
  {
    id: 'simple-uti',
    name: 'Simple UTI',
    description: 'Get relief for uncomplicated urinary tract infections with a quick async consultation.',
    mode: 'async',
    subscriptionRequired: false,
  },
  {
    id: 'simple-uri',
    name: 'Simple URI',
    description: 'Treatment guidance for common upper respiratory infections without leaving home.',
    mode: 'async',
    subscriptionRequired: false,
  },
  {
    id: 'rash-consult',
    name: 'Rash Consult',
    description: 'Show your rash to a licensed doctor via secure video for diagnosis and care plan.',
    mode: 'video',
    subscriptionRequired: false,
  },
  {
    id: 'second-opinion',
    name: 'Second Opinion',
    description: 'Have a licensed physician review your existing diagnosis and treatment plan.',
    mode: 'async',
    subscriptionRequired: false,
  },
  {
    id: 'hormonal-therapy',
    name: 'Hormonal Therapy',
    description: 'Personalized hormonal health evaluation and ongoing treatment management.',
    mode: 'async',
    subscriptionRequired: false,
  },
  {
    id: 'obesity-glp',
    name: 'Obesity Management / GLP Evaluation',
    description: 'Medical weight management with GLP-1 evaluation and ongoing subscription care.',
    mode: 'async',
    subscriptionRequired: true,
  },
  {
    id: 'birth-control',
    name: 'Birth Control',
    description: 'Convenient contraceptive consultations with prescription management via subscription.',
    mode: 'async',
    subscriptionRequired: true,
  },
  {
    id: 'medicine-consultation',
    name: 'Medicine Consultation',
    description: 'Live video visit with a doctor for medication questions and general medical advice.',
    mode: 'video',
    subscriptionRequired: false,
  },
];

export async function fetchTreatments(): Promise<Treatment[]> {
  // TODO: swap to real API call — return fetch('/api/treatments').then(r => r.json())
  return treatments;
}
