import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { DeliveryRecord } from '../../types';
import Button from '../UI/Button';
import Input from '../UI/Input';
import Select from '../UI/Select';

interface DeliveryFormProps {
  onClose: () => void;
}

const DeliveryForm: React.FC<DeliveryFormProps> = ({ onClose }) => {
  const { patients, addDelivery } = useData();
  const [step, setStep] = useState(1);
  const [fileNumber, setFileNumber] = useState('');
  const [existingPatient, setExistingPatient] = useState<any>(null);
  const [formData, setFormData] = useState({
    deliveryDate: '',
    deliveryType: 'normal',
    complications: '',
    babyWeight: '',
    babyGender: 'female',
    apgarScore: '',
  });

  const handleFileNumberCheck = () => {
    const patient = patients.find(p => p.fileNumber === fileNumber);
    if (patient) {
      setExistingPatient(patient);
      setStep(2);
    } else {
      alert('Patient not found. Please add the patient to ANC first or check the file number.');
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!existingPatient) return;

    const deliveryData: Omit<DeliveryRecord, 'id'> = {
      ...existingPatient,
      deliveryDate: formData.deliveryDate,
      deliveryType: formData.deliveryType as 'normal' | 'cesarean' | 'assisted',
      complications: formData.complications ? [formData.complications] : [],
      babyWeight: Number(formData.babyWeight),
      babyGender: formData.babyGender as 'male' | 'female',
      apgarScore: Number(formData.apgarScore),
    };

    addDelivery(deliveryData);
    onClose();
  };

  const deliveryTypeOptions = [
    { value: 'normal', label: 'Normal Delivery' },
    { value: 'cesarean', label: 'Cesarean Section' },
    { value: 'assisted', label: 'Assisted Delivery' },
  ];

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ];

  if (step === 1) {
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Step 1: Check Patient File</h3>
          <p className="text-sm text-gray-600 mb-4">
            First, let's check if the patient already exists in our ANC records.
          </p>
        </div>
        
        <Input
          label="Patient File Number"
          value={fileNumber}
          onChange={(e) => setFileNumber(e.target.value)}
          placeholder="ANC0001"
          required
        />

        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button 
            type="button" 
            onClick={handleFileNumberCheck}
            disabled={!fileNumber}
            variant="primary"
          >
            Check File Number
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Step 2: Delivery Details</h3>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-green-800">
            ✓ Patient found: <strong>{existingPatient?.name}</strong> ({existingPatient?.fileNumber})
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Delivery Date"
            type="date"
            value={formData.deliveryDate}
            onChange={(e) => handleInputChange('deliveryDate', e.target.value)}
            required
          />
          <Select
            label="Delivery Type"
            value={formData.deliveryType}
            onChange={(value) => handleInputChange('deliveryType', value)}
            options={deliveryTypeOptions}
            required
          />
          <Input
            label="Baby Weight (kg)"
            type="number"
            step="0.1"
            value={formData.babyWeight}
            onChange={(e) => handleInputChange('babyWeight', e.target.value)}
            placeholder="3.2"
            required
          />
          <Select
            label="Baby Gender"
            value={formData.babyGender}
            onChange={(value) => handleInputChange('babyGender', value)}
            options={genderOptions}
            required
          />
          <Input
            label="APGAR Score"
            type="number"
            min="0"
            max="10"
            value={formData.apgarScore}
            onChange={(e) => handleInputChange('apgarScore', e.target.value)}
            placeholder="9"
            required
          />
          <Input
            label="Complications (if any)"
            value={formData.complications}
            onChange={(e) => handleInputChange('complications', e.target.value)}
            placeholder="None"
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" onClick={() => setStep(1)} variant="secondary">
            Back
          </Button>
          <Button type="button" onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Add Delivery Record
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DeliveryForm;