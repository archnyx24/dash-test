'use client';

import { useState } from 'react';
import TopBar from '@/components/TopBar';

// Icons
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
  </svg>
);

const BellIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

// Driver Card Component
interface Driver {
  id: string;
  name: string;
  status: 'Available' | 'On-trip';
  image: string;
}

const drivers: Driver[] = [
  { id: '1', name: 'JARWO', status: 'Available', image: '👤' },
  { id: '2', name: 'SLAMET', status: 'On-trip', image: '👤' },
  { id: '3', name: 'AGUS SET', status: 'Available', image: '👤' },
  { id: '4', name: 'TOPAN', status: 'Available', image: '👤' },
  { id: '5', name: 'EDI', status: 'On-trip', image: '👤' },
];

export default function DriverAssignPage() {
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const filteredDrivers = drivers.filter(driver =>
    driver.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    return status === 'Available' ? '#4CAF50' : '#FF9800';
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#F9F9F9' }}>
      <TopBar />

      <main className="flex-1 p-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Sidebar - Available Drivers */}
          <div className="col-span-3">
            <div>
              <h2 className="text-xl font-bold mb-4" style={{ color: '#000000' }}>Available Drivers</h2>
              
              {/* Search Box */}
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search drivers"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-10 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: '#F5E6E8',
                    borderColor: '#E0E0E0',
                    color: '#333333'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#D0B8BD';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(149, 102, 102, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#E0E0E0';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
                <div className="absolute left-3 top-3.5 text-gray-400">
                  <SearchIcon />
                </div>
              </div>

              {/* Driver List */}
              {filteredDrivers.map((driver, index) => (
                <div key={driver.id}>
                  <div
                    onClick={() => setSelectedDriver(driver.id)}
                    className="p-4 cursor-pointer transition-all hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-sm"
                        style={{ backgroundColor: '#E8D4D4' }}
                      >
                        {driver.image}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm" style={{ color: '#000000' }}>
                          {driver.name}
                        </h3>
                        <p
                          className="text-xs font-medium"
                          style={{ color: getStatusColor(driver.status) }}
                        >
                          {driver.status}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Shipment Details & Assignment */}
          <div className="col-span-9">
            {/* Header with Bell Icon */}
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold" style={{ color: '#000000' }}>Shipment Details</h2>
              <button
                className="p-2 rounded-lg transition-all hover:bg-gray-100"
                style={{ color: '#9E6666' }}
              >
                <BellIcon />
              </button>
            </div>

            {/* Shipment Info Grid */}
            <div>
              <div className="grid grid-cols-2 gap-8 mb-8">
                {/* Shipment ID and Status */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wide mb-2 block" style={{ color: '#9E6666' }}>
                    Shipment ID
                  </label>
                  <p className="text-2xl font-bold" style={{ color: '#000000' }}>
                    #SHP-123456
                  </p>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wide mb-2 block" style={{ color: '#9E6666' }}>
                    STATUS
                  </label>
                  <div
                    className="inline-block px-4 py-2 rounded-lg text-sm font-semibold"
                    style={{ backgroundColor: '#F5E6E8', color: '#9E6666' }}
                  >
                    Pending Assignment
                  </div>
                </div>

                {/* Pickup Location */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wide mb-2 block" style={{ color: '#9E6666' }}>
                    Pickup Location
                  </label>
                  <p className="text-sm" style={{ color: '#333333' }}>
                    Jl. Raya Semarang - Demak No.KM.9
                  </p>
                </div>

                {/* Delivery Location */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wide mb-2 block" style={{ color: '#9E6666' }}>
                    Delivery Location
                  </label>
                  <p className="text-sm" style={{ color: '#333333' }}>
                    Jl. Raya Kudus - Jepara No.KM 7
                  </p>
                </div>

                {/* Scheduled Pickup */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wide mb-2 block" style={{ color: '#9E6666' }}>
                    Scheduled Pickup
                  </label>
                  <p className="text-sm" style={{ color: '#333333' }}>
                    March 15, 2024 - 10:00 AM
                  </p>
                </div>

                {/* Scheduled Delivery */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wide mb-2 block" style={{ color: '#9E6666' }}>
                    Scheduled Delivery
                  </label>
                  <p className="text-sm" style={{ color: '#333333' }}>
                    March 15, 2024 - 02:00 PM
                  </p>
                </div>
              </div>

              <div className="border-t my-8" style={{ borderColor: '#E0E0E0' }}></div>

              {/* Finalize Assignment - Card Section */}
              <div className="rounded-lg p-6" style={{ backgroundColor: '#FEF9F9' }}>
                <h3 className="text-lg font-bold mb-6" style={{ color: '#000000' }}>
                  Finalize Assignment
                </h3>
                <p className="text-sm font-medium mb-4" style={{ color: '#333333' }}>
                  Select Driver for Assignment
                </p>

                {/* Dropdown */}
                <div className="mb-6">
                  <select
                    value={selectedDriver || ""}
                    onChange={(e) => setSelectedDriver(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E0E0E0',
                      color: selectedDriver ? '#333333' : '#666666'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#D0B8BD';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(149, 102, 102, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#E0E0E0';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <option value="">Choose an available driver...</option>
                    {drivers
                      .filter((d) => d.status === 'Available')
                      .map((driver) => (
                        <option key={driver.id} value={driver.id}>
                          {driver.name}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Assign Driver Button */}
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowModal(true)}
                    disabled={!selectedDriver}
                    className="px-8 py-3 rounded-lg font-bold text-white text-base transition-all hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: selectedDriver ? '#DC3545' : '#A0A0A0',
                      color: '#FFFFFF'
                    }}
                  >
                    Assign Driver
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Modal */}
        {showModal && (
          <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl">
              <h2 className="text-lg font-semibold mb-2" style={{ color: '#333333' }}>Driver</h2>
              <p className="text-sm mb-6" style={{ color: '#666666' }}>{drivers.find(d => d.id === selectedDriver)?.name || ''}</p>
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-3 rounded-lg font-bold text-white text-base transition-all hover:shadow-lg active:scale-95"
                style={{
                  backgroundColor: '#DC3545',
                  color: '#FFFFFF'
                }}
              >
                SUCCESSFULLY!
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
