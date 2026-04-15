'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import TopBar from '@/components/TopBar';

type ShipmentStatus = 'in-transit' | 'delayed' | 'on-time';
type TabFilter = 'all' | 'on-time' | 'delayed';

interface Shipment {
  id: string;
  customer: string;
  origin: string;
  destination: string;
  eta: string;
  status: ShipmentStatus;
  timeline: number;
}

const SHIPMENTS_DATA: Shipment[] = [
  {
    id: 'SHP-2023-001',
    customer: 'Polytron',
    origin: 'Yogyakarta',
    destination: 'Semarang',
    eta: 'Nov 15, 14:00',
    status: 'in-transit',
    timeline: 75,
  },
  {
    id: 'SHP-2023-002',
    customer: 'Honda',
    origin: 'Bandung',
    destination: 'Jakarta',
    eta: 'Nov 16, 10:00',
    status: 'in-transit',
    timeline: 50,
  },
  {
    id: 'SHP-2023-003',
    customer: 'Yamaha',
    origin: 'Kediri',
    destination: 'Tangerang',
    eta: 'Nov 17, 12:00',
    status: 'delayed',
    timeline: 25,
  },
];

const STATUS_STYLES = {
  'in-transit': { text: 'text-blue-600', label: 'IN TRANSIT' },
  delayed: { text: 'text-red-600', label: 'DELAYED' },
  'on-time': { text: 'text-green-600', label: 'ON TIME' },
};

const PERFORMANCE_DATA = [
  { week: 'WK 1', value: 94 },
  { week: 'WK 2', value: 96 },
  { week: 'WK 3', value: 95 },
  { week: 'CURR', value: 98 },
];

export default function ETAMonitoring() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<TabFilter>('all');

  const filteredShipments = SHIPMENTS_DATA.filter((shipment) => {
    const matchSearch =
      shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === 'all') return matchSearch;
    if (activeTab === 'on-time') return matchSearch && shipment.status === 'in-transit';
    if (activeTab === 'delayed') return matchSearch && shipment.status === 'delayed';

    return matchSearch;
  });

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#F9F9F9' }}>
      <TopBar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header with Search and Back Button */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex-1">
              <div className="relative">
                <svg className="absolute left-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by shipment ID, customer, or destination..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              onClick={() => router.back()}
              className="ml-4 px-4 py-2 text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition"
            >
              Back
            </button>
          </div>

          {/* Page Title and Subtitle */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">ETA Monitoring</h1>
            <p className="text-gray-600">Real-time timeline tracking and delivery performance insights.</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-8 mb-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('all')}
              className={`pb-3 font-semibold transition ${
                activeTab === 'all'
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              All Shipments
            </button>
            <button
              onClick={() => setActiveTab('on-time')}
              className={`pb-3 font-semibold transition ${
                activeTab === 'on-time'
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              On Time
            </button>
            <button
              onClick={() => setActiveTab('delayed')}
              className={`pb-3 font-semibold transition ${
                activeTab === 'delayed'
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Delayed
            </button>
          </div>

          {/* Shipments Table */}
          {activeTab === 'all' && (
            <>
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Shipment ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Origin & Destination
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        ETA
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Timeline
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredShipments.map((shipment) => (
                      <tr key={shipment.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                          {shipment.id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {shipment.customer}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {shipment.origin} → {shipment.destination}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {shipment.eta}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`font-semibold ${STATUS_STYLES[shipment.status].text}`}>
                            {STATUS_STYLES[shipment.status].label}
                          </span>
                          {shipment.status === 'delayed' && (
                            <p className="text-xs text-red-600">(Delayed)</p>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-red-500 h-2 rounded-full"
                                style={{ width: `${shipment.timeline}%` }}
                              ></div>
                            </div>
                            <span className="text-gray-600 font-medium">{shipment.timeline}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* On-Time Performance Section */}
              <h2 className="text-2xl font-bold text-gray-900 mb-6">On-Time Performance</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Performance Chart */}
                <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-8">
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-4">Performance</p>
                      <p className="text-6xl font-bold text-gray-900">98%</p>
                    </div>
                    <p className="text-lg font-semibold text-green-600">↑ +5.2%</p>
                  </div>

                  {/* Chart */}
                  <div className="pt-6 border-t border-gray-200">
                    <div className="flex items-end justify-between gap-4 h-24">
                      {PERFORMANCE_DATA.map((item) => (
                        <div key={item.week} className="flex-1 flex flex-col items-center gap-3">
                          <div
                            className="w-full bg-gray-300 rounded-t"
                            style={{ height: `${(item.value / 100) * 80}px` }}
                          ></div>
                          <span className={`text-xs font-semibold ${item.week === 'CURR' ? 'text-gray-900' : 'text-gray-400'}`}>
                            {item.week}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side Cards */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                  {/* Active Alerts */}
                  <div className="bg-white rounded-lg border border-gray-200 p-8">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-6">Active Alerts</p>
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v2m0 4v2m0 0H9m3 0h3m-9-9h12l-6 10z" />
                        </svg>
                      </div>
                      <p className="text-6xl font-bold text-red-600">04</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-6">
                      Shipments requiring immediate attention.
                    </p>
                  </div>

                  {/* Average Delay Time */}
                  <div className="bg-white rounded-lg border border-gray-200 p-8">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-6">Avg. Delay Time</p>
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-7 h-7 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 2m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-6xl font-bold text-gray-900">
                        2.4<span className="text-3xl ml-2">h</span>
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 mt-6">
                      Average across all delayed routes.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'on-time' && (
            <>
              {/* Stats Cards for On Time View */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total On-Time */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-4">Total On-Time</p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                    </div>
                    <p className="text-4xl font-bold text-gray-900">1,284</p>
                  </div>
                  <p className="text-xs text-green-600 font-semibold">↑ +12% vs last month</p>
                </div>

                {/* Efficiency Rate */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-4">Efficiency Rate</p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <p className="text-4xl font-bold text-gray-900">98.2%</p>
                  </div>
                  <p className="text-xs text-gray-600">Peak performance reached.</p>
                </div>

                {/* Avg Early Arrival */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-4">Avg. Early Arrival</p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 2m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-4xl font-bold text-gray-900">1.8<span className="text-2xl ml-1">h</span></p>
                  </div>
                  <p className="text-xs text-gray-600">Ahead of schedule average.</p>
                </div>

                {/* Active Corridors */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-4">Active Corridors</p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 13m0 0v4m0-4h4" />
                      </svg>
                    </div>
                    <p className="text-4xl font-bold text-gray-900">42</p>
                  </div>
                  <p className="text-xs text-gray-600">Operational routes monitored.</p>
                </div>
              </div>

              {/* On-Time Shipments Table */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
                <table className="w-full">
                  <thead>
                    <tr className="bg-white border-b border-gray-200">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Shipment ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Origin & Destination
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        ETA
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Timeline
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredShipments.filter(s => s.status === 'in-transit').map((shipment) => (
                      <tr key={shipment.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-sm font-semibold text-red-900">
                          {shipment.id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {shipment.customer}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {shipment.origin} → {shipment.destination}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {shipment.eta}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className="font-semibold text-green-600">ON TIME</span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-gray-700 font-medium">{shipment.timeline}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Bottom Metrics Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Efficiency Trend Card */}
                <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-8 relative">
                  {/* Week over Week Pill - Top Right */}
                  <div className="absolute top-6 right-6 bg-green-50 border border-green-200 rounded-full px-4 py-2">
                    <p className="text-sm font-bold text-green-600">↑ +2.8% Week over Week</p>
                  </div>

                  {/* Efficiency Trend */}
                  <p className="text-xs font-semibold text-gray-400 uppercase mb-8">Efficiency Trend</p>
                  <p className="text-7xl font-bold text-red-900">98.2%</p>
                </div>

                {/* Live Feed */}
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-xs font-semibold text-gray-400 uppercase">Live Feed</p>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                      <div>
                        <p className="text-sm text-gray-900">
                          <span className="font-semibold">SHP-2023-088</span> reached Semarang hub 2h ahead of schedule.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                      <div>
                        <p className="text-sm text-gray-900">
                          <span className="font-semibold">SHP-2023-092</span> clearance completed in Jakarta.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'delayed' && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Shipment ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Origin & Destination
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      ETA
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Timeline
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredShipments.map((shipment) => (
                    <tr key={shipment.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        {shipment.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {shipment.customer}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {shipment.origin} → {shipment.destination}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {shipment.eta}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`font-semibold ${STATUS_STYLES[shipment.status].text}`}>
                          {STATUS_STYLES[shipment.status].label}
                        </span>
                        {shipment.status === 'delayed' && (
                          <p className="text-xs text-red-600">(Delayed)</p>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-red-500 h-2 rounded-full"
                              style={{ width: `${shipment.timeline}%` }}
                            ></div>
                          </div>
                          <span className="text-gray-600 font-medium">{shipment.timeline}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
