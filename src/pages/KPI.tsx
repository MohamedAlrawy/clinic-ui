import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
} from 'recharts';
import { useData } from '../contexts/DataContext';
import { 
  Users, 
  Baby, 
  TrendingUp, 
  AlertTriangle,
  Calendar,
  Heart
} from 'lucide-react';

const KPI = () => {
  const { patients, deliveries } = useData();

  // Calculate statistics
  const totalPatients = patients.length;
  const totalDeliveries = deliveries.length;
  const highRiskPatients = patients.filter(p => p.riskCategory === 'high').length;
  const screeningVisits = patients.filter(p => p.typeOfVisit === 'screening').length;

  // Data for charts
  const visitTypeData = [
    { name: 'Screening', value: screeningVisits, color: '#3B82F6' },
    { name: 'Follow-up', value: totalPatients - screeningVisits, color: '#8B5CF6' },
  ];

  const riskCategoryData = [
    { 
      name: 'Low Risk', 
      value: patients.filter(p => p.riskCategory === 'low').length, 
      color: '#10B981' 
    },
    { 
      name: 'Medium Risk', 
      value: patients.filter(p => p.riskCategory === 'medium').length, 
      color: '#F59E0B' 
    },
    { 
      name: 'High Risk', 
      value: highRiskPatients, 
      color: '#EF4444' 
    },
  ];

  const deliveryTypeData = [
    { name: 'Normal', value: deliveries.filter(d => d.deliveryType === 'normal').length },
    { name: 'Cesarean', value: deliveries.filter(d => d.deliveryType === 'cesarean').length },
    { name: 'Assisted', value: deliveries.filter(d => d.deliveryType === 'assisted').length },
  ];

  const ageGroupData = [
    { name: '20-25', value: patients.filter(p => p.age >= 20 && p.age <= 25).length },
    { name: '26-30', value: patients.filter(p => p.age >= 26 && p.age <= 30).length },
    { name: '31-35', value: patients.filter(p => p.age >= 31 && p.age <= 35).length },
    { name: '36+', value: patients.filter(p => p.age > 35).length },
  ];

  const monthlyTrendsData = [
    { month: 'Jan', patients: 12, deliveries: 8 },
    { month: 'Feb', patients: 15, deliveries: 10 },
    { month: 'Mar', patients: 18, deliveries: 12 },
    { month: 'Apr', patients: 22, deliveries: 15 },
    { month: 'May', patients: 25, deliveries: 18 },
    { month: 'Jun', patients: 28, deliveries: 20 },
  ];

  const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className="text-sm text-green-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              {trend}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">KPI Dashboard</h1>
        <p className="text-gray-600 mt-1">Key performance indicators and analytics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Patients"
          value={totalPatients}
          icon={Users}
          color="bg-blue-500"
          trend="+12% from last month"
        />
        <StatCard
          title="Total Deliveries"
          value={totalDeliveries}
          icon={Baby}
          color="bg-green-500"
          trend="+8% from last month"
        />
        <StatCard
          title="High Risk Cases"
          value={highRiskPatients}
          icon={AlertTriangle}
          color="bg-red-500"
          trend="-5% from last month"
        />
        <StatCard
          title="This Month Visits"
          value={screeningVisits + (totalPatients - screeningVisits)}
          icon={Calendar}
          color="bg-purple-500"
          trend="+15% from last month"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Visit Types Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={visitTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {visitTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Categories</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={riskCategoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Age Group Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ageGroupData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Types</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={deliveryTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                <Cell fill="#3B82F6" />
                <Cell fill="#F59E0B" />
                <Cell fill="#8B5CF6" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trends</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={monthlyTrendsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="patients"
              stroke="#3B82F6"
              strokeWidth={2}
              name="New Patients"
            />
            <Line
              type="monotone"
              dataKey="deliveries"
              stroke="#10B981"
              strokeWidth={2}
              name="Deliveries"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-900">Patient Satisfaction</h4>
            <Heart className="w-6 h-6 text-red-500" />
          </div>
          <div className="text-3xl font-bold text-green-600">94.5%</div>
          <p className="text-sm text-gray-600 mt-1">Based on 127 reviews</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-900">Average BMI</h4>
            <TrendingUp className="w-6 h-6 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-blue-600">24.2</div>
          <p className="text-sm text-gray-600 mt-1">Healthy range</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-900">Complication Rate</h4>
            <AlertTriangle className="w-6 h-6 text-orange-500" />
          </div>
          <div className="text-3xl font-bold text-orange-600">2.3%</div>
          <p className="text-sm text-gray-600 mt-1">Below national average</p>
        </div>
      </div>
    </div>
  );
};

export default KPI;