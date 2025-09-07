import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Doctor } from '../../types';
import Button from '../UI/Button';
import Input from '../UI/Input';
import Select from '../UI/Select';

interface DoctorFormProps {
  doctor?: Doctor | null;
  onClose: () => void;
}

const DoctorForm: React.FC<DoctorFormProps> = ({ doctor, onClose }) => {
  const { addDoctor, updateDoctor } = useData();
  const [formData, setFormData] = useState({
    name: doctor?.name || '',
    specialty: doctor?.specialty || '',
    phone: doctor?.phone || '',
    email: doctor?.email || '',
    experience: doctor?.experience || '',
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const doctorData = {
      ...formData,
      experience: Number(formData.experience),
    };

    if (doctor) {
      updateDoctor(doctor.id, doctorData);
    } else {
      addDoctor(doctorData);
    }

    onClose();
  };

  const specialtyOptions = [
    { value: 'Obstetrics', label: 'Obstetrics' },
    { value: 'Gynecology', label: 'Gynecology' },
    { value: 'Maternal-Fetal Medicine', label: 'Maternal-Fetal Medicine' },
    { value: 'Perinatology', label: 'Perinatology' },
    { value: 'Family Medicine', label: 'Family Medicine' },
    { value: 'Internal Medicine', label: 'Internal Medicine' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder="Dr. John Smith"
          required
        />
        <Select
          label="Specialty"
          value={formData.specialty}
          onChange={(value) => handleInputChange('specialty', value)}
          options={specialtyOptions}
          placeholder="Select specialty"
          required
        />
        <Input
          label="Phone Number"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          placeholder="+1-234-567-8900"
          required
        />
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="doctor@hospital.com"
          required
        />
        <Input
          label="Years of Experience"
          type="number"
          value={formData.experience}
          onChange={(e) => handleInputChange('experience', e.target.value)}
          placeholder="10"
          required
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" onClick={onClose} variant="secondary">
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {doctor ? 'Update Doctor' : 'Add Doctor'}
        </Button>
      </div>
    </form>
  );
};

export default DoctorForm;