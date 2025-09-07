import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { DeliveryRecord } from '../types';
import { Search, Plus, Eye, Baby, Calendar } from 'lucide-react';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';
import DeliveryForm from '../components/Forms/DeliveryForm';

const Delivery = () => {
  const { deliveries } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredDeliveries = deliveries.filter(delivery =>
    delivery.fileNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    delivery.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDeliveryBadge = (type: string) => {
    const classes = {
      normal: 'bg-green-100 text-green-800',
      cesarean: 'bg-orange-100 text-orange-800',
      assisted: 'bg-blue-100 text-blue-800',
    };
    return classes[type as keyof typeof classes] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Delivery Management</h1>
          <p className="text-gray-600 mt-1">Track delivery records and outcomes</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border">
            <div className="flex items-center space-x-2">
              <Baby className="w-5 h-5 text-pink-600" />
              <span className="font-medium text-gray-900">{deliveries.length}</span>
              <span className="text-gray-600 text-sm">Total Deliveries</span>
            </div>
          </div>
          <Button onClick={() => setIsAddModalOpen(true)} className="flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add Delivery
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by file number or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delivery Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delivery Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Baby Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  APGAR Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDeliveries.map((delivery) => (
                <tr key={delivery.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                        <Baby className="w-5 h-5 text-pink-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{delivery.name}</div>
                        <div className="text-sm text-gray-500">{delivery.fileNumber}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      {delivery.deliveryDate ? formatDate(delivery.deliveryDate) : 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDeliveryBadge(delivery.deliveryType || 'normal')}`}>
                      {delivery.deliveryType || 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="space-y-1">
                      <div>Gender: <span className="font-medium capitalize">{delivery.babyGender || 'N/A'}</span></div>
                      <div>Weight: <span className="font-medium">{delivery.babyWeight ? `${delivery.babyWeight} kg` : 'N/A'}</span></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      (delivery.apgarScore || 0) >= 7 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {delivery.apgarScore || 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="inline-flex items-center"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDeliveries.length === 0 && (
          <div className="p-12 text-center">
            <Baby className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No delivery records found</h3>
            <p className="text-gray-500">
              {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first delivery record.'}
            </p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Delivery Record"
        size="xl"
      >
        <DeliveryForm onClose={() => setIsAddModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default Delivery;