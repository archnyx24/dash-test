'use client';

import { useState } from 'react';

const ClipboardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
  </svg>
);

const MapPinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const TruckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 19h.01M5 19h.01M2 5h19v8H2z"></path>
    <path d="M19 5v8h3V9h2v4h-2"></path>
    <circle cx="6" cy="19" r="2"></circle>
    <circle cx="18" cy="19" r="2"></circle>
  </svg>
);

const SaveIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
    <polyline points="17 21 17 13 7 13 7 21"></polyline>
    <polyline points="7 3 7 8 15 8"></polyline>
  </svg>
);

interface AllowanceFormProps {
  onClose: () => void;
}

export default function AllowanceForm({ onClose }: AllowanceFormProps) {
  const [formData, setFormData] = useState({
    driver: '',
    nomorPolisi: '',
    doNumber: '',
    loadingPoint: '',
    unloadingPoint: '',
    travelAllowance: '',
    additionalCosts: '',
    notes: ''
  });

  const drivers = [
    'Agang Saryawan',
    'Rizky Maulana',
    'Bambang Pamungkas',
    'Doni Ardiansyah',
    'Hendro Agus'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className="rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        {/* Header */}
        <div className="sticky top-0 p-8 border-b flex items-center gap-3" style={{ borderColor: '#E0E0E0' }}>
          <div style={{ color: '#DC3545' }}>
            <ClipboardIcon />
          </div>
          <h2 className="text-2xl font-bold" style={{ color: '#000000' }}>
            Allowance Details
          </h2>
        </div>

        {/* Form Content */}
        <div className="p-8">
          <div className="space-y-6">
            {/* Driver Name and Nomor Polisi */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="text-xs font-bold uppercase tracking-wide mb-3 block" style={{ color: '#9E6666' }}>
                  Driver Name
                </label>
                <select
                  value={formData.driver}
                  onChange={(e) => setFormData({ ...formData, driver: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E0E0E0',
                    color: '#333333'
                  }}
                >
                  <option value="">Select Driver</option>
                  {drivers.map((driver) => (
                    <option key={driver} value={driver}>
                      {driver}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wide mb-3 block" style={{ color: '#9E6666' }}>
                  Nomor Polisi (Plate No.)
                </label>
                <input
                  type="text"
                  placeholder="B 9012 TXA"
                  value={formData.nomorPolisi}
                  onChange={(e) => setFormData({ ...formData, nomorPolisi: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E0E0E0',
                    color: '#333333'
                  }}
                />
              </div>
            </div>

            {/* DO Number */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wide mb-3 block" style={{ color: '#9E6666' }}>
                DO Number
              </label>
              <input
                type="text"
                placeholder="DO-2023-00812"
                value={formData.doNumber}
                onChange={(e) => setFormData({ ...formData, doNumber: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#E0E0E0',
                  color: '#333333'
                }}
              />
            </div>

            {/* Loading and Unloading Points */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="text-xs font-bold uppercase tracking-wide mb-3 block" style={{ color: '#9E6666' }}>
                  Loading Point (Muat)
                </label>
                <div className="relative">
                  <MapPinIcon />
                  <input
                    type="text"
                    placeholder="Tanjung Priok Port"
                    value={formData.loadingPoint}
                    onChange={(e) => setFormData({ ...formData, loadingPoint: e.target.value })}
                    className="w-full pl-8 pr-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E0E0E0',
                      color: '#333333'
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wide mb-3 block" style={{ color: '#9E6666' }}>
                  Unloading Point (Rongkar)
                </label>
                <div className="relative">
                  <TruckIcon />
                  <input
                    type="text"
                    placeholder="Cikarang Industrial Estate"
                    value={formData.unloadingPoint}
                    onChange={(e) => setFormData({ ...formData, unloadingPoint: e.target.value })}
                    className="w-full pl-8 pr-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E0E0E0',
                      color: '#333333'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Travel Allowance and Additional Costs */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="text-xs font-bold uppercase tracking-wide mb-3 block" style={{ color: '#9E6666' }}>
                  Travel Allowance (Uang Jalan)
                </label>
                <div className="flex items-center gap-2 px-4 py-3 rounded-lg border" style={{ borderColor: '#E0E0E0' }}>
                  <span className="text-sm font-medium" style={{ color: '#666666' }}>IDR</span>
                  <input
                    type="number"
                    placeholder="0"
                    value={formData.travelAllowance}
                    onChange={(e) => setFormData({ ...formData, travelAllowance: e.target.value })}
                    className="flex-1 border-0 text-sm focus:outline-none bg-transparent"
                    style={{ color: '#333333' }}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wide mb-3 block" style={{ color: '#9E6666' }}>
                  Additional Costs (Tambahan)
                </label>
                <div className="flex items-center gap-2 px-4 py-3 rounded-lg border" style={{ borderColor: '#E0E0E0' }}>
                  <span className="text-sm font-medium" style={{ color: '#666666' }}>IDR</span>
                  <input
                    type="number"
                    placeholder="0"
                    value={formData.additionalCosts}
                    onChange={(e) => setFormData({ ...formData, additionalCosts: e.target.value })}
                    className="flex-1 border-0 text-sm focus:outline-none bg-transparent"
                    style={{ color: '#333333' }}
                  />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wide mb-3 block" style={{ color: '#9E6666' }}>
                Notes (Catatan)
              </label>
              <textarea
                placeholder="Enter any special remarks regarding the trip or expenses..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={6}
                className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 resize-none"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#E0E0E0',
                  color: '#333333'
                }}
              />
            </div>
          </div>

          {/* Footer with Button */}
          <div className="mt-8 flex justify-end gap-4 pt-8 border-t" style={{ borderColor: '#E0E0E0' }}>
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-lg border text-sm font-bold transition-all hover:bg-gray-50"
              style={{
                backgroundColor: '#FFFFFF',
                borderColor: '#E0E0E0',
                color: '#333333'
              }}
            >
              Cancel
            </button>
            <button
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white text-sm transition-all hover:shadow-lg"
              style={{ backgroundColor: '#DC3545' }}
            >
              <SaveIcon />
              Save Entry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
