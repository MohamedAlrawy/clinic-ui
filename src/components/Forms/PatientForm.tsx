import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Patient } from '../../types';
import Button from '../UI/Button';
import Input from '../UI/Input';
import Select from '../UI/Select';

interface PatientFormProps {
  patient?: Patient;
  onClose: () => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ patient, onClose }) => {
  const { addPatient, updatePatient } = useData();
  const [formData, setFormData] = useState({
    fileNumber: patient?.fileNumber || '',
    name: patient?.name || '',
    nationality: patient?.nationality || '',
    age: patient?.age || '',
    weight: patient?.weight || '',
    height: patient?.height || '',
    phone: patient?.phone || '',
    typeOfVisit: patient?.typeOfVisit || 'screening',
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateBMI = (weight: number, height: number) => {
    if (weight && height) {
      return Math.round((weight / Math.pow(height / 100, 2)) * 10) / 10;
    }
    return 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const bmi = calculateBMI(Number(formData.weight), Number(formData.height));
    
    const patientData = {
      ...formData,
      age: Number(formData.age),
      weight: Number(formData.weight),
      height: Number(formData.height),
      bmi,
      createdAt: patient?.createdAt || new Date().toISOString(),
      typeOfVisit: formData.typeOfVisit as 'screening' | 'follow-up',
    };

    if (patient) {
      updatePatient(patient.id, patientData);
    } else {
      addPatient(patientData);
    }

    onClose();
  };

  const nationalityOptions = [
    { value: 'American', label: 'American' },
    { value: 'British', label: 'British' },
    { value: 'Canadian', label: 'Canadian' },
    { value: 'Australian', label: 'Australian' },
    { value: 'German', label: 'German' },
    { value: 'French', label: 'French' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'Italian', label: 'Italian' },
  ];

  const visitTypeOptions = [
    { value: 'screening', label: 'Screening' },
    { value: 'follow-up', label: 'Follow-up' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="File Number"
          value={formData.fileNumber}
          onChange={(e) => handleInputChange('fileNumber', e.target.value)}
          placeholder="ANC0001"
          required
        />
        <Input
          label="Full Name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder="Enter full name"
          required
        />
        <Select
          label="Nationality"
          value={formData.nationality}
          onChange={(value) => handleInputChange('nationality', value)}
          options={nationalityOptions}
          placeholder="Select nationality"
          required
        />
        <Input
          label="Age"
          type="number"
          value={formData.age}
          onChange={(e) => handleInputChange('age', e.target.value)}
          placeholder="25"
          required
        />
        <Input
          label="Weight (kg)"
          type="number"
          value={formData.weight}
          onChange={(e) => handleInputChange('weight', e.target.value)}
          placeholder="65"
          required
        />
        <Input
          label="Height (cm)"
          type="number"
          value={formData.height}
          onChange={(e) => handleInputChange('height', e.target.value)}
          placeholder="165"
          required
        />
        <Input
          label="Phone Number"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          placeholder="+1-234-567-8900"
          required
        />
        <Select
          label="Type of Visit"
          value={formData.typeOfVisit}
          onChange={(value) => handleInputChange('typeOfVisit', value)}
          options={visitTypeOptions}
          required
        />
      </div>

      {formData.weight && formData.height && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-700">
            Calculated BMI: <strong>{calculateBMI(Number(formData.weight), Number(formData.height))}</strong>
          </p>
        </div>
      )}

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" onClick={onClose} variant="secondary">
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {patient ? 'Update Patient' : 'Add Patient'}
        </Button>
      </div>
    </form>
  );
};

export default PatientForm;