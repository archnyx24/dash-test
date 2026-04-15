'use client';

import React, { useState } from 'react';
import TopBar from '@/components/TopBar';

type OrderStatus = 'draft' | 'pending' | 'approved' | 'rejected';

interface Order {
  id: string;
  customer: string;
  destination: string;
  status: OrderStatus;
}

const ORDERS_DATA: Order[] = [
  { id: 'DO-2023-001', customer: 'Polytron', destination: 'Semarang', status: 'pending' },
  { id: 'DO-2023-002', customer: 'Nux', destination: 'Jakarta', status: 'approved' },
  { id: 'DO-2023-003', customer: 'Honda', destination: 'Bandung', status: 'pending' },
  { id: 'DO-2023-004', customer: 'Yamaha', destination: 'Yogyakarta', status: 'rejected' },
  { id: 'DO-2023-005', customer: 'SM Sport', destination: 'Yogyakarta', status: 'pending' },
  { id: 'DO-2023-006', customer: 'WMOTO', destination: 'Jakarta', status: 'approved' },
];

const STATUS_STYLES = {
  draft: { bg: 'bg-gray-100', text: 'text-gray-700', badge: 'bg-gray-100 text-gray-700' },
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', badge: 'bg-yellow-100 text-yellow-700' },
  approved: { bg: 'bg-green-100', text: 'text-green-700', badge: 'bg-green-100 text-green-700' },
  rejected: { bg: 'bg-red-100', text: 'text-red-700', badge: 'bg-red-100 text-red-700' },
};

export default function DOManagement() {
  const [activeTab, setActiveTab] = useState<'all' | OrderStatus>('all');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const filteredOrders = activeTab === 'all' 
    ? ORDERS_DATA 
    : ORDERS_DATA.filter(order => order.status === activeTab);

  const getStatusLabel = (status: OrderStatus) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#F9F9F9' }}>
      <TopBar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-3 font-medium ${
                activeTab === 'all'
                  ? 'text-gray-800 border-b-2 border-blue-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              All Orders
            </button>
            <button
              onClick={() => setActiveTab('draft')}
              className={`px-4 py-3 font-medium ${
                activeTab === 'draft'
                  ? 'text-gray-800 border-b-2 border-blue-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Draft
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-3 font-medium ${
                activeTab === 'pending'
                  ? 'text-gray-800 border-b-2 border-blue-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setActiveTab('approved')}
              className={`px-4 py-3 font-medium ${
                activeTab === 'approved'
                  ? 'text-gray-800 border-b-2 border-blue-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Approved
            </button>
            <button
              onClick={() => setActiveTab('rejected')}
              className={`px-4 py-3 font-medium ${
                activeTab === 'rejected'
                  ? 'text-gray-800 border-b-2 border-blue-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Rejected
            </button>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Table Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        <input type="checkbox" className="w-4 h-4" />
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        DO ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Destination
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr
                        key={order.id}
                        onClick={() => setSelectedOrder(order.id)}
                        className={`border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition ${
                          selectedOrder === order.id ? 'bg-blue-50' : ''
                        }`}
                      >
                        <td className="px-6 py-4">
                          <input type="checkbox" className="w-4 h-4" />
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {order.customer}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {order.destination}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[order.status].badge}`}>
                            {getStatusLabel(order.status)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Document Preview Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="font-semibold text-gray-900">Document Preview</h2>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>

                {selectedOrder ? (
                  <div className="p-4">
                    <div className="bg-green-100 rounded-lg p-4 mb-5 flex items-center justify-center" style={{ height: '280px' }}>
                      <div className="text-center">
                        <div className="bg-white rounded p-4 shadow-sm inline-block">
                          <p className="text-gray-400 text-sm">Document Preview</p>
                          <p className="text-gray-500 text-xs mt-2">Order: {selectedOrder}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <button className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                          Approve
                        </button>
                        <button className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-bold py-3 px-4 rounded-lg border-2 border-gray-300 flex items-center justify-center gap-2 transition">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Reject
                        </button>
                      </div>
                      <button className="w-48 mx-auto block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17 17H5V5h7V3H5a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-7h-2zM16 5v3h3V5z" />
                        </svg>
                        Print
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <p className="text-sm">Select an order to preview document</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
