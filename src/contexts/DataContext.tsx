import React, { createContext, useContext, useState, useEffect } from 'react';
import { Patient, Doctor, Nurse, DeliveryRecord } from '../types';
import { seedData } from '../data/seedData';

interface DataContextType {
  patients: Patient[];
  doctors: Doctor[];
  nurses: Nurse[];
  deliveries: DeliveryRecord[];
  addPatient: (patient: Omit<Patient, 'id'>) => void;
  updatePatient: (id: string, patient: Partial<Patient>) => void;
  deletePatient: (id: string) => void;
  addDoctor: (doctor: Omit<Doctor, 'id'>) => void;
  updateDoctor: (id: string, doctor: Partial<Doctor>) => void;
  deleteDoctor: (id: string) => void;
  addNurse: (nurse: Omit<Nurse, 'id'>) => void;
  updateNurse: (id: string, nurse: Partial<Nurse>) => void;
  deleteNurse: (id: string) => void;
  addDelivery: (delivery: Omit<DeliveryRecord, 'id'>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [nurses, setNurses] = useState<Nurse[]>([]);
  const [deliveries, setDeliveries] = useState<DeliveryRecord[]>([]);

  useEffect(() => {
    // Load seed data
    const data = seedData();
    setPatients(data.patients);
    setDoctors(data.doctors);
    setNurses(data.nurses);
    setDeliveries(data.deliveries);
  }, []);

  const addPatient = (patient: Omit<Patient, 'id'>) => {
    const newPatient = { ...patient, id: Date.now().toString() };
    setPatients(prev => [...prev, newPatient]);
  };

  const updatePatient = (id: string, patientData: Partial<Patient>) => {
    setPatients(prev => prev.map(p => p.id === id ? { ...p, ...patientData } : p));
  };

  const deletePatient = (id: string) => {
    setPatients(prev => prev.filter(p => p.id !== id));
  };

  const addDoctor = (doctor: Omit<Doctor, 'id'>) => {
    const newDoctor = { ...doctor, id: Date.now().toString() };
    setDoctors(prev => [...prev, newDoctor]);
  };

  const updateDoctor = (id: string, doctorData: Partial<Doctor>) => {
    setDoctors(prev => prev.map(d => d.id === id ? { ...d, ...doctorData } : d));
  };

  const deleteDoctor = (id: string) => {
    setDoctors(prev => prev.filter(d => d.id !== id));
  };

  const addNurse = (nurse: Omit<Nurse, 'id'>) => {
    const newNurse = { ...nurse, id: Date.now().toString() };
    setNurses(prev => [...prev, newNurse]);
  };

  const updateNurse = (id: string, nurseData: Partial<Nurse>) => {
    setNurses(prev => prev.map(n => n.id === id ? { ...n, ...nurseData } : n));
  };

  const deleteNurse = (id: string) => {
    setNurses(prev => prev.filter(n => n.id !== id));
  };

  const addDelivery = (delivery: Omit<DeliveryRecord, 'id'>) => {
    const newDelivery = { ...delivery, id: Date.now().toString() };
    setDeliveries(prev => [...prev, newDelivery]);
  };

  const value = {
    patients,
    doctors,
    nurses,
    deliveries,
    addPatient,
    updatePatient,
    deletePatient,
    addDoctor,
    updateDoctor,
    deleteDoctor,
    addNurse,
    updateNurse,
    deleteNurse,
    addDelivery
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};