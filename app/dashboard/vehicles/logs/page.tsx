'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import TopBar from '@/components/TopBar';

const MapPreview = dynamic(() => import('@/components/MapPreview'), { ssr: false });

interface ActivityLog {
  id: string;
  type: 'delivery' | 'delay' | 'checkpoint' | 'start';
  title: string;
  status: string;
  description: string;
  location: string;
  time: string;
  additionalInfo?: string;
  icon: string;
}

export default function FleetActivityLogs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const driverName = searchParams.get('driver') || 'JARWO';
  const vehicleId = searchParams.get('vehicleId') || 'AB-3221-ZA';

  const activityLogs: ActivityLog[] = [
    {
      id: '1',
      type: 'delivery',
      title: 'Delivery Completed',
      status: 'SUCCESS',
      description: 'Shipment #DO-1234 delivered successfully to Polytron signature captured from Receiver: Polytron.',
      location: 'SEMARANG, WEST JAVA',
      time: '14:20 PM',
      additionalInfo: '+50 KARMA POINTS',
      icon: '✓',
    },
    {
      id: '2',
      type: 'delay',
      title: 'Delay Alert',
      status: 'TRAFFIC',
      description: 'Heavy congestion detected on Highway Yogyakarta. System recalculated ETA from 14:05 to 14:20.',
      location: 'HIGHWAY, YOGYAKARTA',
      time: '13:45 PM',
      icon: '⚠',
    },
    {
      id: '3',
      type: 'checkpoint',
      title: 'Checkpoint Reached',
      status: 'ON ROUTE',
      description: 'Vehicle passed Checkpoint Bandung. Speed maintained at 45 km/h.',
      location: 'BANDUNG',
      time: '12:15 PM',
      icon: '◉',
    },
    {
      id: '4',
      type: 'start',
      title: 'Start',
      status: 'STARTUP',
      description: 'Pre-shift inspection complete. Vehicle AB-3221-ZA engine engaged. Driver Jarwo ready.',
      location: 'POLYTRON',
      time: '06:00 AM',
      icon: '⚙',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return 'bg-green-100 text-green-700';
      case 'TRAFFIC':
        return 'bg-red-100 text-red-700';
      case 'ON ROUTE':
        return 'bg-blue-100 text-blue-700';
      case 'STARTUP':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'delivery':
        return 'bg-green-500 text-white';
      case 'delay':
        return 'bg-red-500 text-white';
      case 'checkpoint':
        return 'bg-blue-500 text-white';
      case 'start':
        return 'bg-gray-400 text-white';
      default:
        return 'bg-gray-400 text-white';
    }
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#F9F9F9' }}>
      <TopBar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Download Button */}
          <div className="flex justify-end mb-8">
            <button className="px-6 py-2 text-white rounded-lg font-semibold hover:opacity-90 transition flex items-center gap-2" style={{ backgroundColor: '#6B2C2C' }}>
              <span>⬇</span>
              Download Full Report
            </button>
          </div>

          {/* Driver Info Card */}
          <div className="bg-white rounded-lg p-6 mb-8 border border-gray-200">
            <div className="flex items-center gap-6">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-3xl flex-shrink-0">
                👨‍💼
              </div>

              {/* Driver Info */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">{driverName}</h2>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">📍 Driver</span>
                  <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">ACTIVE</span>
                </div>
              </div>

              {/* Metrics */}
              <div className="flex gap-12">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">VEHICLE ID</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">🔸 {vehicleId}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">TOTAL DISTANCE</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">14,284.5 km</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">SHIFT HOURS</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">07:12:45</p>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Log Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-xl">📊</span>
              <h3 className="text-xl font-bold text-gray-900">Chronological Activity Log</h3>
            </div>
            <span className="text-sm text-gray-500">TODAY: OCT 24, 2023</span>
          </div>

          {/* Activity Timeline */}
          <div>
            {activityLogs.map((log, index) => (
              <div key={log.id} className="flex gap-6">
                {/* Icon Container with connector line */}
                <div className="flex flex-col items-center flex-shrink-0 relative">
                  {/* Connector Line Above (for all except first) */}
                  {index > 0 && (
                    <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-0.5 h-12 bg-gray-300"></div>
                  )}

                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-xl z-10 ${getIconColor(log.type)}`}>
                    {log.icon}
                  </div>

                  {/* Connector Line Below (for all except last) */}
                  {index !== activityLogs.length - 1 && (
                    <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-0.5 h-20 bg-gray-300"></div>
                  )}
                </div>

                {/* Activity Card */}
                <div className="flex-1 bg-white rounded-lg p-6 mb-6">
                  <div className="grid grid-cols-3 gap-4">
                    {/* Left Content - 2 columns */}
                    <div className="col-span-2 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <h4 className="text-lg font-bold text-gray-900">{log.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(log.status)}`}>
                            {log.status}
                          </span>
                        </div>

                        <p className="text-gray-700 text-sm mb-4">{log.description}</p>
                      </div>

                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <span>📍</span>
                          <span className="uppercase font-semibold">{log.location}</span>
                        </div>
                        {log.additionalInfo && (
                          <div className="flex items-center gap-2 text-yellow-600 font-semibold">
                            <span>⭐</span>
                            <span>{log.additionalInfo}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right Map - 1 column */}
                    <div>
                      <span className="text-sm text-gray-500 block mb-2 text-right">{log.time}</span>
                      <div className="w-full h-24 bg-gray-100 rounded border border-gray-200 overflow-hidden">
                        <MapPreview location={log.location} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
