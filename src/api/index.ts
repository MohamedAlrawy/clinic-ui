import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const user = localStorage.getItem('user');
  if (user) {
    const parsedUser = JSON.parse(user);
    config.headers.Authorization = `Bearer ${parsedUser.token}`;
  }
  return config;
});

// Mock API responses for development
export const apiService = {
  // Authentication
  login: async (credentials: { username: string; password: string }) => {
    // Mock login
    return { data: { token: 'mock-token', user: { id: 1, username: credentials.username } } };
  },

  // Patients
  getPatients: async () => {
    // Mock response
    return { data: [] };
  },

  createPatient: async (patient: any) => {
    // Mock response
    return { data: { ...patient, id: Date.now() } };
  },

  updatePatient: async (id: string, patient: any) => {
    // Mock response
    return { data: { ...patient, id } };
  },

  deletePatient: async (id: string) => {
    // Mock response
    return { data: { success: true } };
  },

  // Doctors
  getDoctors: async () => {
    return { data: [] };
  },

  createDoctor: async (doctor: any) => {
    return { data: { ...doctor, id: Date.now() } };
  },

  updateDoctor: async (id: string, doctor: any) => {
    return { data: { ...doctor, id } };
  },

  deleteDoctor: async (id: string) => {
    return { data: { success: true } };
  },

  // Nurses
  getNurses: async () => {
    return { data: [] };
  },

  createNurse: async (nurse: any) => {
    return { data: { ...nurse, id: Date.now() } };
  },

  updateNurse: async (id: string, nurse: any) => {
    return { data: { ...nurse, id } };
  },

  deleteNurse: async (id: string) => {
    return { data: { success: true } };
  },
};

export default api;