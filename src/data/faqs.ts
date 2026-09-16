import type { FaqItem } from '../types';

export const faqs: FaqItem[] = [
  {
    id: 'how-it-works',
    question: 'How does Curbside Health work?',
    answer:
      'Choose a condition, answer a few health questions, and a licensed doctor reviews your case. For async visits you receive a care plan within hours; for video visits you meet live with a physician.',
  },
  {
    id: 'licensed-doctors',
    question: 'Are the doctors licensed?',
    answer:
      'Yes. Every physician on our platform is licensed in the United States and vetted before joining. We verify credentials and monitor quality of care continuously.',
  },
  {
    id: 'prescriptions',
    question: 'Can I get prescriptions through Curbside?',
    answer:
      'When clinically appropriate, your doctor may prescribe medication and send it to your preferred pharmacy. Controlled substances and certain medications may not be available via telehealth.',
  },
  {
    id: 'insurance',
    question: 'Do you accept insurance?',
    answer:
      'Many visits are self-pay for convenience and speed. We are expanding insurance partnerships — check your specific treatment page for current pricing and coverage options.',
  },
  {
    id: 'privacy',
    question: 'Is my health information private?',
    answer:
      'Absolutely. We follow HIPAA guidelines and use encrypted connections for all data. Your medical information is never sold to third parties.',
  },
  {
    id: 'emergencies',
    question: 'Can I use this for emergencies?',
    answer:
      'No. Curbside Health is not for medical emergencies. If you are experiencing a life-threatening situation, call 911 or go to your nearest emergency room immediately.',
  },
  {
    id: 'states',
    question: 'Which states do you serve?',
    answer:
      'We currently serve patients in most U.S. states. Your state is verified during sign-up to ensure we can provide care in your location.',
  },
  {
    id: 'cancel-subscription',
    question: 'How do I cancel a subscription plan?',
    answer:
      'You can cancel any subscription from your account settings at any time. You will retain access through the end of your current billing period.',
  },
];

export const homeFaqTeaser = faqs.slice(0, 5);
