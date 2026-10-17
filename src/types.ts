export type TreatmentMode = 'async' | 'video' | 'subscription';

export interface Treatment {
  id: string;
  name: string;
  description: string;
  mode: TreatmentMode;
  subscriptionRequired: boolean;
  healthieUrl: string; // Add this property to store the Healthie form URL
  price?: string;
  durationMinutes?: string;
  category?: string;
  organSystem?: string;
  details?: string[];
  popular?: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface PatientProfile {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  state: string;
}

export interface SignInFormState {
  email: string;
  password: string;
}

export interface SignUpFormState extends PatientProfile {
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

export interface ContactFormState {
  name: string;
  email: string;
  phone?: string;
  category: 'feedback' | 'concern' | 'question' | 'billing' | 'other';
  visitReference?: string;
  message: string;
  followUp: 'email' | 'phone' | 'none';
}

export type FormErrors<T> = Partial<Record<keyof T, string>>;

