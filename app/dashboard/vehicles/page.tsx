'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import TopBar from '@/components/TopBar';

// Dynamic import to avoid SSR issues with Leaflet
const FleetMap = dynamic(() => import('@/components/FleetMap'), { ssr: false });

interface Driver {
  id: string;
  name: string;
  status: 'Moving' | 'Idle' | 'In Route' | 'Offline';
  details: string;
  icon: string;
}

const ACTIVE_DRIVERS: Driver[] = [
  {
    id: '1',
    name: 'Jarwo',
    status: 'Moving',
    details: 'AB-1221-ZA',
    icon: '👨‍💼',
  },
  {
    id: '2',
    name: 'Tata',
    status: 'Idle',
    details: 'AB-3221-ZA',
    icon: '👩‍💼',
  },
  {
    id: '3',
    name: 'Angel',
    status: 'In Route',
    details: 'AB-1221-ZA',
    icon: '👩‍💼',
  },
  {
    id: '4',
    name: 'Slamet',
    status: 'Idle',
    details: 'AB-1221-ZA',
    icon: '👨‍💼',
  },
];

const OFFLINE_DRIVERS: Driver[] = [
  {
    id: '5',
    name: 'Edi',
    status: 'Offline',
    details: 'AB-1221-ZA',
    icon: '👨‍💼',
  },
  {
    id: '6',
    name: 'Topan',
    status: 'Offline',
    details: 'AB-1221-ZA',
    icon: '👨‍💼',
  },
];

const STATUS_COLORS = {
  'Moving': { color: 'text-green-600', badge: 'bg-green-100' },
  'Idle': { color: 'text-orange-600', badge: 'bg-orange-100' },
  'In Route': { color: 'text-blue-600', badge: 'bg-blue-100' },
  'Offline': { color: 'text-gray-400', badge: 'bg-gray-100' },
};

export default function VehicleTracking() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);

  const filteredActiveDrives = ACTIVE_DRIVERS.filter((driver) =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#F9F9F9' }}>
      <TopBar />
      <main className="flex-1 flex" style={{ height: 'calc(100vh - 80px)' }}>
        {/* Left Sidebar - Fleet Tracking */}
        <div className="w-80 bg-white border-r border-gray-300 p-6 overflow-y-auto flex flex-col">
          {/* Header with LIVE Badge */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Fleet Tracking</h1>
            <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full">
              LIVE
            </span>
          </div>

          {/* Search Box */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search drivers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400"
            />
          </div>

          {/* Active Drivers Section */}
          <div className="mb-8 flex-1">
            <h2 className="text-xs font-bold text-gray-600 uppercase mb-4 tracking-wide">Active Drivers</h2>
            <div className="space-y-3">
              {filteredActiveDrives.map((driver) => (
                <div
                  key={driver.id}
                  onClick={() => setSelectedDriver(driver.id)}
                  className={`p-3 rounded-lg cursor-pointer transition border-2 ${
                    selectedDriver === driver.id
                      ? 'bg-red-50 border-red-400'
                      : 'bg-white border-transparent hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg flex-shrink-0">
                      {driver.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm">{driver.name}</p>
                      <p className={`text-xs font-semibold ${STATUS_COLORS[driver.status as keyof typeof STATUS_COLORS].color}`}>
                        {driver.status}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{driver.details}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Offline Drivers Section */}
          <div>
            <h2 className="text-xs font-bold text-gray-600 uppercase mb-4 tracking-wide">Offline</h2>
            <div className="space-y-3">
              {OFFLINE_DRIVERS.map((driver) => (
                <div key={driver.id} className="p-3 rounded-lg bg-gray-50 border border-transparent hover:bg-gray-100 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-lg flex-shrink-0">
                      {driver.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-700 text-sm">{driver.name}</p>
                      <p className="text-xs text-gray-500">Offline</p>
                      <p className="text-xs text-gray-500 mt-1">{driver.details}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content - Map and Metrics */}
        <div className="flex-1 flex flex-col relative">
          {/* Map Section - Full Height */}
          <div className="flex-1 relative bg-white overflow-hidden">
            <FleetMap />

            {/* Floating Metrics Bar and Button */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
              {/* Metrics Card */}
              <div className="bg-white rounded-2xl px-6 py-4 flex items-center gap-10 w-auto shadow-lg">
                {/* Active Fleet */}
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide" style={{ color: '#800000' }}>Active Fleet</p>
                  <p className="text-4xl font-bold text-gray-900 mt-1">1,234</p>
                </div>

                {/* On Schedule */}
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-green-600">On Schedule</p>
                  <p className="text-4xl font-bold text-gray-900 mt-1">98%</p>
                </div>

                {/* In Transit */}
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide" style={{ color: '#FF9800' }}>In Transit</p>
                  <p className="text-4xl font-bold text-gray-900 mt-1">3</p>
                </div>
              </div>

              {/* ETA Monitoring Button */}
              <button
                onClick={() => router.push('/dashboard/vehicles/eta-monitoring')}
                className="px-8 py-2 rounded-xl font-bold text-white text-lg transition flex-shrink-0"
                style={{ backgroundColor: '#DC3545' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#C82333')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#DC3545')}
              >
                ETA Monitoring
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
