import { Patient, Doctor, Nurse, DeliveryRecord } from '../types';

const firstNames = ['Sarah', 'Emily', 'Jessica', 'Ashley', 'Amanda', 'Stephanie', 'Nicole', 'Jennifer', 'Rachel', 'Amy'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
const nationalities = ['American', 'British', 'Canadian', 'Australian', 'German', 'French', 'Spanish', 'Italian', 'Dutch', 'Swedish'];
const specialties = ['Obstetrics', 'Gynecology', 'Maternal-Fetal Medicine', 'Perinatology', 'Family Medicine'];
const departments = ['Labor & Delivery', 'Antenatal Care', 'Postnatal Care', 'NICU', 'General Ward'];

const generatePhoneNumber = () => {
  return `+1-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`;
};

const generateEmail = (name: string) => {
  return `${name.toLowerCase().replace(' ', '.')}@hospital.com`;
};

const medicalConditions = ['Hypertension', 'Diabetes', 'Anemia', 'Thyroid disorders', 'Heart conditions', 'Kidney disease'];
const medications = ['Prenatal vitamins', 'Iron supplements', 'Calcium', 'Folic acid', 'Insulin', 'Blood pressure medication'];
const allergies = ['Penicillin', 'Nuts', 'Shellfish', 'Latex', 'Sulfa drugs', 'None'];

export const seedData = () => {
  // Generate patients
  const patients: Patient[] = Array.from({ length: 15 }, (_, index) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const weight = Math.floor(Math.random() * 40 + 50); // 50-90 kg
    const height = Math.floor(Math.random() * 30 + 150); // 150-180 cm
    const bmi = Math.round((weight / Math.pow(height / 100, 2)) * 10) / 10;
    
    return {
      id: (index + 1).toString(),
      fileNumber: `ANC${String(index + 1).padStart(4, '0')}`,
      name: `${firstName} ${lastName}`,
      nationality: nationalities[Math.floor(Math.random() * nationalities.length)],
      age: Math.floor(Math.random() * 15 + 20), // 20-35 years
      weight,
      height,
      phone: generatePhoneNumber(),
      bmi,
      typeOfVisit: Math.random() > 0.5 ? 'screening' : 'follow-up',
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      vitalSigns: {
        bloodPressure: `${Math.floor(Math.random() * 30 + 110)}/${Math.floor(Math.random() * 20 + 70)}`,
        pulse: Math.floor(Math.random() * 20 + 70),
        temperature: Math.round((Math.random() * 2 + 97) * 10) / 10,
        oxygen: Math.floor(Math.random() * 3 + 97),
        lastUpdated: new Date().toISOString()
      },
      medicalHistory: {
        conditions: medicalConditions.slice(0, Math.floor(Math.random() * 3)),
        medications: medications.slice(0, Math.floor(Math.random() * 3)),
        allergies: [allergies[Math.floor(Math.random() * allergies.length)]],
        previousPregnancies: Math.floor(Math.random() * 4),
        complications: Math.random() > 0.7 ? ['Previous C-section'] : []
      },
      socialHistory: {
        smokingStatus: Math.random() > 0.8 ? 'Former smoker' : 'Non-smoker',
        alcoholUse: Math.random() > 0.9 ? 'Occasional' : 'None',
        occupation: ['Teacher', 'Nurse', 'Engineer', 'Designer', 'Manager'][Math.floor(Math.random() * 5)],
        supportSystem: 'Partner and family',
        educationLevel: ['High School', 'Bachelor\'s', 'Master\'s', 'PhD'][Math.floor(Math.random() * 4)]
      },
      riskScore: Math.floor(Math.random() * 100),
      riskCategory: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low'
    };
  });

  // Generate doctors
  const doctors: Doctor[] = Array.from({ length: 8 }, (_, index) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `Dr. ${firstName} ${lastName}`;
    
    return {
      id: (index + 1).toString(),
      name,
      specialty: specialties[Math.floor(Math.random() * specialties.length)],
      phone: generatePhoneNumber(),
      email: generateEmail(name),
      experience: Math.floor(Math.random() * 20 + 5) // 5-25 years
    };
  });

  // Generate nurses
  const nurses: Nurse[] = Array.from({ length: 12 }, (_, index) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    
    return {
      id: (index + 1).toString(),
      name,
      department: departments[Math.floor(Math.random() * departments.length)],
      phone: generatePhoneNumber(),
      email: generateEmail(name),
      experience: Math.floor(Math.random() * 15 + 2) // 2-17 years
    };
  });

  // Generate delivery records
  const deliveries: DeliveryRecord[] = patients.slice(0, 8).map((patient, index) => ({
    ...patient,
    deliveryDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    deliveryType: ['normal', 'cesarean', 'assisted'][Math.floor(Math.random() * 3)] as 'normal' | 'cesarean' | 'assisted',
    complications: Math.random() > 0.7 ? ['Prolonged labor'] : [],
    babyWeight: Math.round((Math.random() * 1.5 + 2.5) * 1000) / 1000, // 2.5-4.0 kg
    babyGender: Math.random() > 0.5 ? 'male' : 'female',
    apgarScore: Math.floor(Math.random() * 3 + 7) // 7-10
  }));

  return { patients, doctors, nurses, deliveries };
};