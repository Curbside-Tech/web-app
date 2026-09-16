export type TreatmentMode = 'async' | 'video';

export interface Treatment {
  id: string;
  name: string;
  description: string;
  mode: TreatmentMode;
  subscriptionRequired: boolean;
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
  message: string;
}

export type FormErrors<T> = Partial<Record<keyof T, string>>;
