import type { Treatment } from '../types';


export const treatments: Treatment[] = [
  {
    id: 'uti',
    name: 'UTI (Urinary Tract Infection) Algorithm',
    description: 'Get relief for uncomplicated urinary tract infections with a quick async consultation.',
    mode: 'async',
    subscriptionRequired: false,
    healthieUrl: 'https://securestaging.gethealthie.com/appointments/embed_appt?dietitian_id=6590487&embed_form_id=2391965&form_only=true&primary_color=4A9625',
  },
  {
    id: 'uri',
    name: 'URI (Upper Respiratory Infection)',
    description: 'Treatment guidance for common upper respiratory infections without leaving home.',
    mode: 'async',
    subscriptionRequired: false,
    healthieUrl: 'https://securestaging.gethealthie.com/appointments/embed_appt?dietitian_id=6590487&embed_form_id=2391968&form_only=true&primary_color=4A9625'
  },
  {
    id: 'sti-exposure',
    name: 'STI Exposure',
    description: 'Screening and triage for recent STI exposure, discharge, and asymptomatic testing.',
    mode: 'async',
    subscriptionRequired: false,
    healthieUrl: 'https://securestaging.gethealthie.com/appointments/embed_appt?dietitian_id=6590487&embed_form_id=2391969&form_only=true&primary_color=4A9625'
  },
];

export async function fetchTreatments(): Promise<Treatment[]> {
  // TODO: swap to real API call — return fetch('/api/treatments').then(r => r.json())
  return treatments;
}
