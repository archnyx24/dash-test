'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import TopBar from '@/components/TopBar';

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const MapPinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ChevronIcon = ({ direction }: { direction: 'left' | 'right' }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    {direction === 'left' ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
  </svg>
);

const formatRupiah = (value: string) => {
  if (!value) return '';
  // Remove everything except numbers
  const numberString = value.replace(/[^0-9]/g, '');
  if (!numberString) return '';
  
  const formatted = new Intl.NumberFormat('id-ID').format(parseInt(numberString));
  return `Rp. ${formatted}`;
};

export default function CreateOrderPage() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    orderId: 'ORD-20231026-001',
    clientName: 'Polytron',
    productType: 'Electronics',
    loadingDestination: 'Yogyakarta',
    unloadingDestination: 'Semarang',
    multipleUnloading: false,
    bill: 'Rp. 4.000.000',
    ujDriver: 'Rp. 2.500.000',
    deliveryDate: '2026-10-05',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    let finalValue: any = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    // Apply Rupiah formatting for currency fields
    if (name === 'bill' || name === 'ujDriver') {
      finalValue = formatRupiah(value);
    }

    setForm(prev => ({ ...prev, [name]: finalValue }));
  };

  return (
    <div className="flex flex-col min-h-screen relative" style={{ backgroundColor: '#F9F9F9' }}>
      <TopBar />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto flex gap-8">
          
          {/* Main Form Section */}
          <div className="flex-1 bg-white rounded-3xl p-10 border shadow-sm" style={{ borderColor: '#EFDFDF' }}>
            {/* Form content remains same */}
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Information</h1>
            <p className="text-sm text-gray-400 mb-8">
              Enter shipping details for the logistics processing. All fields marked with * are mandatory.
            </p>

            <form className="space-y-6">
              {/* Order ID */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Order ID</label>
                <input 
                  type="text" 
                  name="orderId"
                  value={form.orderId}
                  readOnly
                  className="w-full px-5 py-4 bg-[#FDFBFB] border rounded-xl text-gray-500 focus:outline-none"
                  style={{ borderColor: '#EFDFDF' }}
                />
              </div>

              {/* Client Name */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Client Name *</label>
                <select 
                  name="clientName"
                  value={form.clientName}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-white border rounded-xl text-gray-700 focus:outline-none focus:ring-1 focus:ring-maroon-300"
                  style={{ borderColor: '#EFDFDF' }}
                >
                  <option value="">Select Company/Client</option>
                  <option value="Polytron">Polytron</option>
                  <option value="Honda">Honda</option>
                  <option value="Yamaha">Yamaha</option>
                </select>
              </div>

              {/* Product Type */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Product Type *</label>
                <input 
                  type="text" 
                  name="productType"
                  value={form.productType}
                  onChange={handleChange}
                  placeholder="e.g. Industrial Steel, Perishables"
                  className="w-full px-5 py-4 bg-white border rounded-xl text-gray-700 focus:outline-none"
                  style={{ borderColor: '#EFDFDF' }}
                />
              </div>

              {/* Loading Destination */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Loading Destination *</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <MapPinIcon />
                  </span>
                  <input 
                    type="text" 
                    name="loadingDestination"
                    value={form.loadingDestination}
                    onChange={handleChange}
                    placeholder="Enter full address"
                    className="w-full pl-12 pr-5 py-4 bg-white border rounded-xl text-gray-700 focus:outline-none"
                    style={{ borderColor: '#EFDFDF' }}
                  />
                </div>
              </div>

              {/* Unloading Destination */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Unloading Destination *</label>
                <div className="flex items-center gap-2 mb-3">
                  <input 
                    type="checkbox" 
                    name="multipleUnloading"
                    checked={form.multipleUnloading}
                    onChange={handleChange}
                    className="w-4 h-4 rounded text-maroon-600 focus:ring-maroon-500" 
                  />
                  <span className="text-sm font-medium text-gray-600">Multiple Unloading Destinations</span>
                </div>
                <div className="relative mb-3">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <MapPinIcon />
                  </span>
                  <input 
                    type="text" 
                    name="unloadingDestination"
                    value={form.unloadingDestination}
                    onChange={handleChange}
                    placeholder="Enter full delivery address"
                    className="w-full pl-12 pr-5 py-4 bg-white border rounded-xl text-gray-700 focus:outline-none"
                    style={{ borderColor: '#EFDFDF' }}
                  />
                </div>
                <button type="button" className="text-maroon-700 text-sm font-bold flex items-center gap-1 hover:underline">
                  <span className="text-xl leading-none">+</span> Add Destination
                </button>
              </div>

              {/* Bill */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Bill*</label>
                <input 
                  type="text" 
                  name="bill"
                  value={form.bill}
                  onChange={handleChange}
                  placeholder="e.g. Rp 4,000,000"
                  className="w-full px-5 py-4 bg-white border rounded-xl text-gray-700 focus:outline-none"
                  style={{ borderColor: '#EFDFDF' }}
                />
              </div>

              {/* UJ Driver */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">UJ DRIVER *</label>
                <input 
                  type="text" 
                  name="ujDriver"
                  value={form.ujDriver}
                  onChange={handleChange}
                  placeholder="e.g. Rp 2,500,000"
                  className="w-full px-5 py-4 bg-white border rounded-xl text-gray-700 focus:outline-none"
                  style={{ borderColor: '#EFDFDF' }}
                />
              </div>

              {/* Scheduled Delivery Date - Calendar */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-4">Scheduled Delivery Date</label>
                <div className="border rounded-2xl overflow-hidden shadow-sm" style={{ borderColor: '#EFDFDF' }}>
                  <div className="flex items-center justify-between p-4 bg-[#FDFBFB] border-b" style={{ borderColor: '#EFDFDF' }}>
                    <button type="button" className="p-1 hover:bg-gray-100 rounded text-gray-400"><ChevronIcon direction="left" /></button>
                    <span className="font-bold text-gray-700 uppercase tracking-widest text-sm">October 2026</span>
                    <button type="button" className="p-1 hover:bg-gray-100 rounded text-gray-400"><ChevronIcon direction="right" /></button>
                  </div>
                  <div className="p-4 grid grid-cols-7 gap-2 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                  </div>
                  <div className="px-4 pb-6 grid grid-cols-7 gap-2">
                    {[24, 25, 26, 27, 28, 29, 30].map((d, i) => (
                      <span key={i} className="text-center py-2 text-sm text-gray-300">{d}</span>
                    ))}
                    {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                      <button 
                        key={d} 
                        type="button"
                        className={`text-center py-2 text-sm font-bold rounded-lg transition-all ${
                          d === 5 ? 'bg-[#D44444] text-white shadow-lg scale-110' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Sidebar Summary Section */}
          <div className="w-80 space-y-6">
            <div className="bg-white rounded-3xl p-10 border shadow-sm sticky top-0" style={{ borderColor: '#EFDFDF' }}>
              <div className="flex items-center gap-3 mb-8">
                <span className="text-[#D44444]"><InfoIcon /></span>
                <h2 className="text-xl font-bold text-gray-800">Quick Summary</h2>
              </div>

              <div className="space-y-6">
                <SummaryItem label="ORDER REFERENCE" value={form.orderId} />
                <SummaryItem label="CLIENT" value={form.clientName || 'Not selected'} />
                <SummaryItem label="PRODUCT" value={form.productType || 'Pending entry...'} />
                <SummaryItem label="LOADING" value={form.loadingDestination || 'Pending entry...'} />
                <SummaryItem label="UNLOADING" value={form.unloadingDestination || 'Pending entry...'} />
                <SummaryItem label="BILL" value={form.bill || 'Pending entry...'} />
                <SummaryItem label="UJ DRIVER" value={form.ujDriver || 'Pending entry...'} />
                <SummaryItem label="ESTIMATED DATE" value="Oct 05, 2026" />
              </div>

              <div className="mt-10 pt-6 border-t" style={{ borderColor: '#EFDFDF' }}>
                <p className="text-[10px] text-gray-400 leading-relaxed uppercase font-bold tracking-wider">
                  The summary updates automatically as you complete the form fields on the left.
                </p>
              </div>

              <button 
                onClick={() => setShowModal(true)}
                className="w-full mt-8 py-4 bg-[#800000] text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition-all active:scale-95"
              >
                Confirm & Create Order
              </button>
              <Link 
                href="/dashboard/administration/orders"
                className="block text-center mt-4 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => setShowModal(false)}
              >
                Discard Changes
              </Link>
            </div>
          </div>

        </div>
      </main>

      {/* Confirmation Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-gray-900 mb-2">Confirm Order</h2>
              <p className="text-[#998888] font-medium">Please review the order details before finalizing.</p>
            </div>

            <div className="bg-[#F9F9F9] rounded-[2rem] p-8 mb-8 space-y-4">
              <ModalRow label="ORDER ID" value={form.orderId} isBold={true} />
              <ModalRow label="CLIENT NAME" value={form.clientName || '-'} />
              <ModalRow label="PRODUCT TYPE" value={form.productType || '-'} />
              <ModalRow label="ORIGIN" value={form.loadingDestination || '-'} />
              <ModalRow label="DESTINATION" value={form.unloadingDestination || '-'} />
              <ModalRow label="SCHEDULED DATE" value="Oct 05, 2023" isBold={true} isRed={true} />
            </div>

            <div className="flex flex-col gap-3">
              <button 
                className="w-full py-5 bg-[#6B1F1F] text-white font-black text-lg rounded-2xl shadow-xl hover:opacity-95 transition-all active:scale-[0.98]"
                onClick={() => {
                  alert('Order successfully created!');
                  setShowModal(false);
                }}
              >
                Confirm and Create
              </button>
              <button 
                className="w-full py-2 text-[#998888] font-bold text-sm tracking-wide hover:text-gray-700 transition-colors"
                onClick={() => setShowModal(false)}
              >
                Cancel / Edit Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ModalRow({ label, value, isBold = false, isRed = false }: { label: string; value: string; isBold?: boolean; isRed?: boolean }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-[#EFDFDF]/50 last:border-0">
      <span className="text-[10px] font-black text-[#A0A0A0] uppercase tracking-widest">{label}</span>
      <span className={`text-sm ${isBold ? 'font-black' : 'font-medium'} ${isRed ? 'text-[#D44444]' : 'text-gray-800'}`}>
        {value}
      </span>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  const isPending = value === 'Pending entry...' || value === 'Not selected';
  return (
    <div className="border-b pb-4" style={{ borderColor: '#F5EEEE' }}>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
      <p className={`text-sm font-bold ${isPending ? 'text-gray-400 italic' : 'text-gray-700'}`}>
        {value}
      </p>
    </div>
  );
}
