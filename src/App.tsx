import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Layout from './components/Layout/Layout';
import Login from './pages/Login';
import ANC from './pages/ANC';
import PatientPreview from './pages/PatientPreview';
import Delivery from './pages/Delivery';
import KPI from './pages/KPI';
import Doctors from './pages/Doctors';
import Nurses from './pages/Nurses';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/anc" replace />} />
              <Route path="anc" element={<ANC />} />
              <Route path="anc/preview/:id" element={<PatientPreview />} />
              <Route path="delivery" element={<Delivery />} />
              <Route path="kpi" element={<KPI />} />
              <Route path="doctors" element={<Doctors />} />
              <Route path="nurses" element={<Nurses />} />
            </Route>
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;