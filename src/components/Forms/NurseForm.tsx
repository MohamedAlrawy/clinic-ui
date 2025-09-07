import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Nurse } from '../../types';
import Button from '../UI/Button';
import Input from '../UI/Input';
import Select from '../UI/Select';

interface NurseFormProps {
  nurse?: Nurse | null;
  onClose: () => void;
}

const NurseForm: React.FC<NurseFormProps> = ({ nurse, onClose }) => {
  const { addNurse, updateNurse } = useData();
  const [formData, setFormData] = useState({
    name: nurse?.name || '',
    department: nurse?.department || '',
    phone: nurse?.phone || '',
    email: nurse?.email || '',
    experience: nurse?.experience || '',
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const nurseData = {
      ...formData,
      experience: Number(formData.experience),
    };

    if (nurse) {
      updateNurse(nurse.id, nurseData);
    } else {
      addNurse(nurseData);
    }

    onClose();
  };

  const departmentOptions = [
    { value: 'Labor & Delivery', label: 'Labor & Delivery' },
    { value: 'Antenatal Care', label: 'Antenatal Care' },
    { value: 'Postnatal Care', label: 'Postnatal Care' },
    { value: 'NICU', label: 'NICU' },
    { value: 'General Ward', label: 'General Ward' },
    { value: 'ICU', label: 'ICU' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder="Jane Smith"
          required
        />
        <Select
          label="Department"
          value={formData.department}
          onChange={(value) => handleInputChange('department', value)}
          options={departmentOptions}
          placeholder="Select department"
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
          placeholder="nurse@hospital.com"
          required
        />
        <Input
          label="Years of Experience"
          type="number"
          value={formData.experience}
          onChange={(e) => handleInputChange('experience', e.target.value)}
          placeholder="5"
          required
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" onClick={onClose} variant="secondary">
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {nurse ? 'Update Nurse' : 'Add Nurse'}
        </Button>
      </div>
    </form>
  );
};

export default NurseForm;