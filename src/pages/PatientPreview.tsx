import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import * as Tabs from '@radix-ui/react-tabs';
import { 
  ArrowLeft, 
  User, 
  Heart, 
  FileText, 
  Users as UsersIcon,
  AlertTriangle,
  Calendar,
  ExternalLink,
  Save,
  Edit
} from 'lucide-react';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import Select from '../components/UI/Select';

const PatientPreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { patients, doctors, nurses, updatePatient } = useData();
  const [isEditing, setIsEditing] = useState(false);
  
  const patient = patients.find(p => p.id === id);
  const [editData, setEditData] = useState(patient);

  if (!patient) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Patient not found</h3>
          <Button onClick={() => navigate('/anc')}>Back to ANC</Button>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    if (editData) {
      updatePatient(patient.id, editData);
      setIsEditing(false);
    }
  };

  const doctorOptions = doctors.map(d => ({ value: d.id, label: d.name }));
  const nurseOptions = nurses.map(n => ({ value: n.id, label: n.name }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => navigate('/anc')}
            variant="secondary"
            className="flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to ANC
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
            <p className="text-gray-600">File Number: {patient.fileNumber}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {isEditing ? (
            <>
              <Button onClick={handleSave} variant="success" className="flex items-center">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button onClick={() => setIsEditing(false)} variant="secondary">
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="flex items-center">
              <Edit className="w-4 h-4 mr-2" />
              Edit Patient
            </Button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <Tabs.Root defaultValue="main-data" className="w-full">
          <Tabs.List className="flex border-b border-gray-200">
            {[
              { value: 'main-data', label: 'Main Data', icon: User },
              { value: 'vital-signs', label: 'Vital Signs', icon: Heart },
              { value: 'history', label: 'Medical History', icon: FileText },
              { value: 'staff', label: 'Assigned Staff', icon: UsersIcon },
              { value: 'risk', label: 'Risk Assessment', icon: AlertTriangle },
              { value: 'schedule', label: 'Visit Schedule', icon: Calendar },
              { value: 'referral', label: 'Referral', icon: ExternalLink },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <Tabs.Trigger
                  key={tab.value}
                  value={tab.value}
                  className="flex items-center px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </Tabs.Trigger>
              );
            })}
          </Tabs.List>

          <Tabs.Content value="main-data" className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Input
                  label="Full Name"
                  value={editData?.name || ''}
                  onChange={(e) => setEditData(prev => prev ? {...prev, name: e.target.value} : prev)}
                  className={!isEditing ? 'bg-gray-50' : ''}
                />
                <Input
                  label="Nationality"
                  value={editData?.nationality || ''}
                  onChange={(e) => setEditData(prev => prev ? {...prev, nationality: e.target.value} : prev)}
                  className={!isEditing ? 'bg-gray-50' : ''}
                />
                <Input
                  label="Age"
                  type="number"
                  value={editData?.age || ''}
                  onChange={(e) => setEditData(prev => prev ? {...prev, age: Number(e.target.value)} : prev)}
                  className={!isEditing ? 'bg-gray-50' : ''}
                />
                <Input
                  label="Phone"
                  value={editData?.phone || ''}
                  onChange={(e) => setEditData(prev => prev ? {...prev, phone: e.target.value} : prev)}
                  className={!isEditing ? 'bg-gray-50' : ''}
                />
              </div>
              <div className="space-y-4">
                <Input
                  label="Weight (kg)"
                  type="number"
                  value={editData?.weight || ''}
                  onChange={(e) => setEditData(prev => prev ? {...prev, weight: Number(e.target.value)} : prev)}
                  className={!isEditing ? 'bg-gray-50' : ''}
                />
                <Input
                  label="Height (cm)"
                  type="number"
                  value={editData?.height || ''}
                  onChange={(e) => setEditData(prev => prev ? {...prev, height: Number(e.target.value)} : prev)}
                  className={!isEditing ? 'bg-gray-50' : ''}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">BMI</label>
                  <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md">
                    {editData?.bmi || 'N/A'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Visit Type</label>
                  <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md capitalize">
                    {editData?.typeOfVisit || 'N/A'}
                  </div>
                </div>
              </div>
            </div>
          </Tabs.Content>

          <Tabs.Content value="vital-signs" className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Blood Pressure"
                value={editData?.vitalSigns?.bloodPressure || ''}
                onChange={(e) => setEditData(prev => prev ? {
                  ...prev, 
                  vitalSigns: { ...prev.vitalSigns!, bloodPressure: e.target.value }
                } : prev)}
                placeholder="120/80"
                className={!isEditing ? 'bg-gray-50' : ''}
              />
              <Input
                label="Pulse (bpm)"
                type="number"
                value={editData?.vitalSigns?.pulse || ''}
                onChange={(e) => setEditData(prev => prev ? {
                  ...prev, 
                  vitalSigns: { ...prev.vitalSigns!, pulse: Number(e.target.value) }
                } : prev)}
                className={!isEditing ? 'bg-gray-50' : ''}
              />
              <Input
                label="Temperature (°F)"
                type="number"
                value={editData?.vitalSigns?.temperature || ''}
                onChange={(e) => setEditData(prev => prev ? {
                  ...prev, 
                  vitalSigns: { ...prev.vitalSigns!, temperature: Number(e.target.value) }
                } : prev)}
                className={!isEditing ? 'bg-gray-50' : ''}
              />
              <Input
                label="Oxygen Saturation (%)"
                type="number"
                value={editData?.vitalSigns?.oxygen || ''}
                onChange={(e) => setEditData(prev => prev ? {
                  ...prev, 
                  vitalSigns: { ...prev.vitalSigns!, oxygen: Number(e.target.value) }
                } : prev)}
                className={!isEditing ? 'bg-gray-50' : ''}
              />
            </div>
          </Tabs.Content>

          <Tabs.Content value="history" className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Medical History</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Medical Conditions</label>
                    <div className="border border-gray-300 rounded-md p-3 bg-gray-50">
                      {patient.medicalHistory?.conditions?.join(', ') || 'None recorded'}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Medications</label>
                    <div className="border border-gray-300 rounded-md p-3 bg-gray-50">
                      {patient.medicalHistory?.medications?.join(', ') || 'None recorded'}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
                    <div className="border border-gray-300 rounded-md p-3 bg-gray-50">
                      {patient.medicalHistory?.allergies?.join(', ') || 'None recorded'}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Previous Pregnancies</label>
                      <div className="border border-gray-300 rounded-md p-3 bg-gray-50">
                        {patient.medicalHistory?.previousPregnancies || 0}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Complications</label>
                      <div className="border border-gray-300 rounded-md p-3 bg-gray-50">
                        {patient.medicalHistory?.complications?.join(', ') || 'None recorded'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Tabs.Content>

          <Tabs.Content value="staff" className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Assigned Doctor"
                value={editData?.assignedDoctor || ''}
                onChange={(value) => setEditData(prev => prev ? {...prev, assignedDoctor: value} : prev)}
                options={doctorOptions}
                placeholder="Select a doctor"
                className={!isEditing ? 'bg-gray-50' : ''}
              />
              <Select
                label="Assigned Nurse"
                value={editData?.assignedNurse || ''}
                onChange={(value) => setEditData(prev => prev ? {...prev, assignedNurse: value} : prev)}
                options={nurseOptions}
                placeholder="Select a nurse"
                className={!isEditing ? 'bg-gray-50' : ''}
              />
            </div>
          </Tabs.Content>

          <Tabs.Content value="risk" className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Risk Score</label>
                  <div className="text-3xl font-bold text-gray-900">{patient.riskScore || 0}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Risk Category</label>
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                    patient.riskCategory === 'high' ? 'bg-red-100 text-red-800' :
                    patient.riskCategory === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {patient.riskCategory?.toUpperCase() || 'N/A'}
                  </span>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Risk Assessment Guidelines</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Low Risk (0-30): Routine care recommended</li>
                  <li>• Medium Risk (31-60): Enhanced monitoring required</li>
                  <li>• High Risk (61-100): Specialist consultation needed</li>
                </ul>
              </div>
            </div>
          </Tabs.Content>

          <Tabs.Content value="schedule" className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Recommended Visit Schedule</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { week: '6-8 weeks', type: 'Initial Visit', status: 'completed' },
                    { week: '16 weeks', type: 'Second Trimester', status: 'scheduled' },
                    { week: '20 weeks', type: 'Anatomy Scan', status: 'pending' },
                    { week: '28 weeks', type: 'Third Trimester', status: 'pending' },
                    { week: '32 weeks', type: 'Growth Check', status: 'pending' },
                    { week: '36 weeks', type: 'Pre-delivery', status: 'pending' },
                  ].map((visit, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">{visit.week}</span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          visit.status === 'completed' ? 'bg-green-100 text-green-800' :
                          visit.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {visit.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{visit.type}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Tabs.Content>

          <Tabs.Content value="referral" className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Referral Status</h3>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  patient.referral?.isRequired 
                    ? 'bg-orange-100 text-orange-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {patient.referral?.isRequired ? 'Referral Required' : 'No Referral Needed'}
                </div>
              </div>
              
              {patient.referral?.isRequired && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Clinic</label>
                      <p className="text-sm text-gray-900">{patient.referral.clinic}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Urgency</label>
                      <p className="text-sm text-gray-900 capitalize">{patient.referral.urgency}</p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                      <p className="text-sm text-gray-900">{patient.referral.reason}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
};

export default PatientPreview;