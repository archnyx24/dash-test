'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TopBar from '@/components/TopBar';

const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

interface Driver {
  id: string;
  initials: string;
  name: string;
  nomorPolisi: string;
  do: string;
  muat: number;
  rongkar: number;
  uangJalan: number;
  tambahan: number;
  catatan: string;
}

const drivers: Driver[] = [
  {
    id: '1',
    initials: 'AS',
    name: 'Agang Saryawan',
    nomorPolisi: 'B 9042 UYI',
    do: 'DO-2023-19-092',
    muat: 1000000,
    rongkar: 500000,
    uangJalan: 4250000,
    tambahan: 250000,
    catatan: 'Claim'
  },
  {
    id: '2',
    initials: 'RM',
    name: 'Rizky Maulana',
    nomorPolisi: 'B 9211 UYI',
    do: 'DO-2023-10-095',
    muat: 800000,
    rongkar: 400000,
    uangJalan: 3800000,
    tambahan: 0,
    catatan: '-'
  },
  {
    id: '3',
    initials: 'BP',
    name: 'Bambang Pamungkas',
    nomorPolisi: 'B 9555 KLI',
    do: 'DO-2023-10-102',
    muat: 1200000,
    rongkar: 600000,
    uangJalan: 5100000,
    tambahan: 100000,
    catatan: 'Claim'
  },
  {
    id: '4',
    initials: 'DA',
    name: 'Doni Ardiansyah',
    nomorPolisi: 'B 8821 XZY',
    do: 'DO-2023-10-105',
    muat: 700000,
    rongkar: 350000,
    uangJalan: 2950000,
    tambahan: 50000,
    catatan: 'Kasbon'
  },
  {
    id: '5',
    initials: 'HA',
    name: 'Hendro Agus',
    nomorPolisi: 'B 9042 UYI',
    do: 'DO-2023-10-110',
    muat: 1000000,
    rongkar: 500000,
    uangJalan: 4250000,
    tambahan: 0,
    catatan: '-'
  },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);
};

export default function RecapUJPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const totalDrivers = 128;
  const driversPerPage = 5;
  const totalPages = Math.ceil(totalDrivers / driversPerPage);
  const totalDisbursed = drivers.reduce((acc, driver) => acc + driver.uangJalan, 0);

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#F9F9F9' }}>
      <TopBar />

      <main className="flex-1 p-8">
        {/* Header with Metrics and Button */}
        <div className="mb-8 flex items-start gap-8 justify-between">
          {/* Metrics Cards */}
          <div className="flex items-start gap-6 flex-1">
            {/* Total UJ Disbursed */}
            <div className="rounded-lg p-6 shadow-sm flex-1" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0E0E0' }}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-8 h-8" style={{ color: '#9E6666' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 6v6l4 2"></path>
                  </svg>
                </div>
                <p className="text-sm font-semibold" style={{ color: '#4CAF50' }}>
                  +12% vs LY
                </p>
              </div>
              <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: '#9E6666' }}>
                Total UJ Disbursed
              </p>
              <p className="text-3xl font-bold" style={{ color: '#000000' }}>
                IDR 1,240,500K
              </p>
            </div>

            {/* Active Driver Count */}
            <div className="rounded-lg p-6 shadow-sm flex-1" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0E0E0' }}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-8 h-8" style={{ color: '#9E6666' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
              </div>
              <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: '#9E6666' }}>
                Active Driver Count
              </p>
              <p className="text-3xl font-bold" style={{ color: '#000000' }}>
                342 <span className="text-lg font-medium" style={{ color: '#666666' }}>Units</span>
              </p>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={() => router.push('/dashboard/drivers/recap-uj/input')}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white transition-all hover:shadow-lg flex-shrink-0 mt-0"
            style={{ backgroundColor: '#DC3545' }}
          >
            <PlusIcon />
            Input New Allowance
          </button>
        </div>

        {/* Filters Section */}
        <div className="mb-6 flex items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <select
                defaultValue="all"
                className="w-full px-4 py-3 rounded-lg border text-sm appearance-none focus:outline-none pr-8"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#E0E0E0',
                  color: '#333333'
                }}
              >
                <option value="all">Status: All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" style={{ color: '#666666' }}>
                <ChevronDownIcon />
              </div>
            </div>

            <div className="relative w-64">
              <input
                type="text"
                placeholder="Period: October 2023"
                className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#E0E0E0',
                  color: '#333333'
                }}
              />
            </div>
          </div>

          <button
            className="flex items-center gap-2 px-4 py-3 rounded-lg border text-sm transition-all hover:bg-gray-50"
            style={{
              backgroundColor: '#FFFFFF',
              borderColor: '#E0E0E0',
              color: '#333333'
            }}
          >
            <DownloadIcon />
            Export CSV
          </button>
        </div>

        {/* Table */}
        <div className="rounded-lg overflow-hidden shadow-sm border" style={{ backgroundColor: '#FFFFFF', borderColor: '#E0E0E0' }}>
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: '#F5F5F5', borderBottom: '1px solid #E0E0E0' }}>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase" style={{ color: '#9E6666' }}>
                  Driver
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase" style={{ color: '#9E6666' }}>
                  Nomor Polisi / No.
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase" style={{ color: '#9E6666' }}>
                  Do
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase" style={{ color: '#9E6666' }}>
                  Muat (Loading)
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase" style={{ color: '#9E6666' }}>
                  Rongkar (Unloading)
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase" style={{ color: '#9E6666' }}>
                  Uang Jalan (Allowance)
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase" style={{ color: '#9E6666' }}>
                  Tambahan (Additional)
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase" style={{ color: '#9E6666' }}>
                  Catatan (Notes)
                </th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver, index) => (
                <tr
                  key={driver.id}
                  style={{
                    borderBottom: index < drivers.length - 1 ? '1px solid #E0E0E0' : 'none',
                    backgroundColor: '#FFFFFF'
                  }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                        style={{ backgroundColor: '#8B4949' }}
                      >
                        {driver.initials}
                      </div>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: '#000000' }}>
                          {driver.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm" style={{ color: '#333333' }}>
                    {driver.nomorPolisi}
                  </td>
                  <td className="px-6 py-4 text-sm" style={{ color: '#333333' }}>
                    {driver.do}
                  </td>
                  <td className="px-6 py-4 text-sm" style={{ color: '#333333' }}>
                    {driver.muat.toLocaleString('id-ID')}
                  </td>
                  <td className="px-6 py-4 text-sm" style={{ color: '#333333' }}>
                    {driver.rongkar.toLocaleString('id-ID')}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold" style={{ color: '#333333' }}>
                    {driver.uangJalan.toLocaleString('id-ID')}
                  </td>
                  <td className="px-6 py-4 text-sm" style={{ color: '#333333' }}>
                    {driver.tambahan.toLocaleString('id-ID')}
                  </td>
                  <td className="px-6 py-4 text-sm" style={{ color: '#333333' }}>
                    {driver.catatan}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm" style={{ color: '#666666' }}>
            Showing 1 - 5 of 128 entries
          </p>

          <div className="flex items-center gap-2">
            <button
              className="px-3 py-2 rounded-lg border transition-all hover:bg-gray-100"
              style={{
                backgroundColor: '#FFFFFF',
                borderColor: '#E0E0E0',
                color: '#666666'
              }}
            >
              <ChevronRightIcon />
            </button>

            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className="px-3 py-2 rounded-lg border text-sm transition-all"
                style={{
                  backgroundColor: currentPage === page ? '#DC3545' : '#FFFFFF',
                  borderColor: currentPage === page ? '#DC3545' : '#E0E0E0',
                  color: currentPage === page ? '#FFFFFF' : '#666666'
                }}
              >
                {page}
              </button>
            ))}

            <span style={{ color: '#666666' }}>...</span>

            <button
              className="px-3 py-2 rounded-lg border text-sm transition-all hover:bg-gray-100"
              style={{
                backgroundColor: '#FFFFFF',
                borderColor: '#E0E0E0',
                color: '#666666'
              }}
            >
              12
            </button>

            <button
              className="px-3 py-2 rounded-lg border transition-all hover:bg-gray-100"
              style={{
                backgroundColor: '#FFFFFF',
                borderColor: '#E0E0E0',
                color: '#666666'
              }}
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
