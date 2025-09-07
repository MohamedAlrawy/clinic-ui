export interface User {
  id: string;
  username: string;
  role: 'admin' | 'doctor' | 'nurse';
  name: string;
}

export interface Patient {
  id: string;
  fileNumber: string;
  name: string;
  nationality: string;
  age: number;
  weight: number;
  height: number;
  phone: string;
  bmi: number;
  typeOfVisit: 'screening' | 'follow-up';
  createdAt: string;
  vitalSigns?: VitalSigns;
  medicalHistory?: MedicalHistory;
  socialHistory?: SocialHistory;
  assignedDoctor?: string;
  assignedNurse?: string;
  riskScore?: number;
  riskCategory?: 'low' | 'medium' | 'high';
  visitSchedule?: VisitSchedule[];
  referral?: Referral;
}

export interface VitalSigns {
  bloodPressure: string;
  pulse: number;
  temperature: number;
  oxygen: number;
  lastUpdated: string;
}

export interface MedicalHistory {
  conditions: string[];
  medications: string[];
  allergies: string[];
  previousPregnancies: number;
  complications: string[];
}

export interface SocialHistory {
  smokingStatus: string;
  alcoholUse: string;
  occupation: string;
  supportSystem: string;
  educationLevel: string;
}

export interface VisitSchedule {
  id: string;
  date: string;
  type: string;
  status: 'scheduled' | 'completed' | 'missed';
  notes?: string;
}

export interface Referral {
  isRequired: boolean;
  clinic: string;
  reason: string;
  urgency: 'routine' | 'urgent' | 'emergency';
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  phone: string;
  email: string;
  experience: number;
}

export interface Nurse {
  id: string;
  name: string;
  department: string;
  phone: string;
  email: string;
  experience: number;
}

export interface DeliveryRecord extends Patient {
  deliveryDate?: string;
  deliveryType?: 'normal' | 'cesarean' | 'assisted';
  complications?: string[];
  babyWeight?: number;
  babyGender?: 'male' | 'female';
  apgarScore?: number;
}