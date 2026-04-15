'use client';

import { useState } from 'react';
import TopBar from '@/components/TopBar';

const BellIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const FileDownloadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

const TrendUpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

interface OrderData {
  id: string;
  date: string;
  company: string;
  productType: string;
  destination: string;
  volume: string;
  revenue: string;
}

const orders: OrderData[] = [
  {
    id: 'ORD-2023-001',
    date: '2026-01-15',
    company: 'Polytron',
    productType: 'Electronics',
    destination: 'Jakarta',
    volume: '500 units',
    revenue: '$200,000'
  },
  {
    id: 'ORD-2023-002',
    date: '2026-02-20',
    company: 'Nux',
    productType: 'Bike',
    destination: 'Semarang',
    volume: '300 units',
    revenue: '$100,000'
  },
  {
    id: 'ORD-2023-003',
    date: '2026-03-25',
    company: 'Yamaha',
    productType: 'Bike',
    destination: 'Bandung',
    volume: '100 units',
    revenue: '$150,000'
  },
  {
    id: 'ORD-2023-004',
    date: '2026-04-10',
    company: 'Honda',
    productType: 'Bike',
    destination: 'Surabaya',
    volume: '200 units',
    revenue: '$180,000'
  },
];

export default function ReportsPage() {
  const [filters, setFilters] = useState({
    dateRange: 'All Time',
    company: 'All Companies',
    productType: 'All Types',
    destination: 'All Destinations'
  });

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#F9F9F9' }}>
      <TopBar />

      <main className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2" style={{ color: '#000000' }}>
              Order Reports
            </h1>
            <p className="text-sm" style={{ color: '#666666' }}>
              Analyze and export order data for informed decision-making.
            </p>
          </div>
          <button className="p-2 rounded-lg transition-all hover:bg-gray-100" style={{ color: '#9E6666' }}>
            <BellIcon />
          </button>
        </div>

        {/* Filters */}
        <div className="mb-8 flex items-center gap-4">
          {['Date Range', 'Company', 'Product Type', 'Destination'].map((filterName) => (
            <div key={filterName} className="relative">
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all hover:bg-gray-50"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#E0E0E0',
                  color: '#333333'
                }}
              >
                {filterName}
                <ChevronDownIcon />
              </button>
            </div>
          ))}
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {/* Total Orders */}
          <div className="rounded-lg p-6 shadow-sm" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0E0E0' }}>
            <p className="text-sm font-medium mb-3" style={{ color: '#666666' }}>
              Total Orders
            </p>
            <p className="text-3xl font-bold mb-3" style={{ color: '#000000' }}>
              1,250
            </p>
            <div className="flex items-center gap-1" style={{ color: '#4CAF50' }}>
              <TrendUpIcon />
              <span className="text-sm font-semibold">+10%</span>
            </div>
          </div>

          {/* Volume by Product Type */}
          <div className="rounded-lg p-6 shadow-sm" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0E0E0' }}>
            <p className="text-sm font-medium mb-3" style={{ color: '#666666' }}>
              Volume by Product Type
            </p>
            <p className="text-3xl font-bold mb-3" style={{ color: '#000000' }}>
              Bike
            </p>
            <div className="flex items-center gap-1" style={{ color: '#4CAF50' }}>
              <TrendUpIcon />
              <span className="text-sm font-semibold">+5%</span>
            </div>
          </div>

          {/* Top Destination */}
          <div className="rounded-lg p-6 shadow-sm" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0E0E0' }}>
            <p className="text-sm font-medium mb-3" style={{ color: '#666666' }}>
              Top Destination
            </p>
            <p className="text-3xl font-bold mb-3" style={{ color: '#000000' }}>
              Yogyakarta
            </p>
            <div className="flex items-center gap-1" style={{ color: '#4CAF50' }}>
              <TrendUpIcon />
              <span className="text-sm font-semibold">+12%</span>
            </div>
          </div>

          {/* Revenue Forecast */}
          <div className="rounded-lg p-6 shadow-sm" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0E0E0' }}>
            <p className="text-sm font-medium mb-3" style={{ color: '#666666' }}>
              Revenue Forecast
            </p>
            <p className="text-3xl font-bold mb-3" style={{ color: '#000000' }}>
              Rp 100,000
            </p>
            <div className="flex items-center gap-1" style={{ color: '#4CAF50' }}>
              <TrendUpIcon />
              <span className="text-sm font-semibold">+8%</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-3 gap-8 mb-8">
          {/* Order Details */}
          <div className="col-span-2">
            {/* Export Buttons */}
            <div className="mb-6 flex items-center gap-4">
              <h2 className="text-xl font-bold flex-1" style={{ color: '#000000' }}>
                Order Details
              </h2>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white transition-all hover:shadow-lg"
                style={{ backgroundColor: '#8B4949' }}
              >
                <FileDownloadIcon />
                Export PDF
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white transition-all hover:shadow-lg"
                style={{ backgroundColor: '#8B4949' }}
              >
                <FileDownloadIcon />
                Export Excel
              </button>
            </div>

            {/* Table */}
            <div
              className="rounded-lg overflow-hidden shadow-sm border"
              style={{ backgroundColor: '#FFFFFF', borderColor: '#E0E0E0' }}
            >
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: '#F5F5F5', borderBottom: '1px solid #E0E0E0' }}>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase" style={{ color: '#9E6666' }}>
                      Order ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase" style={{ color: '#9E6666' }}>
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase" style={{ color: '#9E6666' }}>
                      Company
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase" style={{ color: '#9E6666' }}>
                      Product Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase" style={{ color: '#9E6666' }}>
                      Destination
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase" style={{ color: '#9E6666' }}>
                      Volume
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase" style={{ color: '#9E6666' }}>
                      Revenue
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr
                      key={order.id}
                      style={{
                        borderBottom: index < orders.length - 1 ? '1px solid #E0E0E0' : 'none',
                        backgroundColor: '#FFFFFF'
                      }}
                    >
                      <td className="px-6 py-4 text-sm font-medium" style={{ color: '#000000' }}>
                        {order.id}
                      </td>
                      <td className="px-6 py-4 text-sm" style={{ color: '#666666' }}>
                        {order.date}
                      </td>
                      <td className="px-6 py-4 text-sm" style={{ color: '#666666' }}>
                        {order.company}
                      </td>
                      <td className="px-6 py-4 text-sm" style={{ color: '#666666' }}>
                        {order.productType}
                      </td>
                      <td className="px-6 py-4 text-sm" style={{ color: '#666666' }}>
                        {order.destination}
                      </td>
                      <td className="px-6 py-4 text-sm" style={{ color: '#666666' }}>
                        {order.volume}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium" style={{ color: '#000000' }}>
                        {order.revenue}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Volume Trend Chart */}
          <div
            className="rounded-lg p-6 shadow-sm border"
            style={{ backgroundColor: '#FFFFFF', borderColor: '#E0E0E0', minHeight: '400px' }}
          >
            <h3 className="text-lg font-bold mb-6" style={{ color: '#000000' }}>
              Order Volume Trend
            </h3>
            <div className="mb-6">
              <p className="text-sm font-medium mb-1" style={{ color: '#666666' }}>
                Monthly Orders
              </p>
              <p className="text-3xl font-bold mb-2" style={{ color: '#000000' }}>
                1,250
              </p>
              <p className="text-sm" style={{ color: '#4CAF50' }}>
                +10% vs last year
              </p>
            </div>

            {/* Simple Chart Placeholder */}
            <div className="flex items-end justify-between gap-2 h-32 mt-8">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((month, index) => (
                <div key={month} className="flex flex-col items-center flex-1">
                  <div
                    className="w-full rounded-t transition-all hover:opacity-80"
                    style={{
                      backgroundColor: '#9E6666',
                      height: `${(index + 1) * 15}%`
                    }}
                  />
                  <p className="text-xs mt-2" style={{ color: '#666666' }}>
                    {month}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
