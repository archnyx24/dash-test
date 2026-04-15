'use client';

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TopBar from "@/components/TopBar";

// ... (Icons remain the same) ...
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const FilterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="4" y1="21" x2="4" y2="14" />
    <line x1="4" y1="10" x2="4" y2="3" />
    <line x1="12" y1="21" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12" y2="3" />
    <line x1="20" y1="21" x2="20" y2="16" />
    <line x1="20" y1="12" x2="20" y2="3" />
    <line x1="1" y1="14" x2="7" y2="14" />
    <line x1="9" y1="8" x2="15" y2="8" />
    <line x1="17" y1="16" x2="23" y2="16" />
  </svg>
);

const MapPinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const BillIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);

const EditIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

export default function OrdersList() {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const orders = [
    { id: 'ORD-20231026-001', client: 'Polytron', type: 'Electronic', destination: 'Semarang', date: 'Oct 28, 2023', status: 'DELIVERED', amount: 4000000 },
    { id: 'ORD-20231026-002', client: 'Honda', type: 'Bike', destination: 'Jakarta', date: 'Oct 28, 2023', status: 'PROCESSING', amount: 2500000 },
    { id: 'ORD-20231026-003', client: 'Yamaha', type: 'Bike', destination: 'Yogyakarta', date: 'Oct 27, 2023', status: 'DELIVERED', amount: 3200000 },
    { id: 'ORD-20231026-004', client: 'WMOTO', type: 'Bike', destination: 'Kediri', date: 'Oct 25, 2023', status: 'PROCESSING', amount: 1800000 },
    { id: 'ORD-20231026-005', client: 'Polygon', type: 'Bike', destination: 'Bandung', date: 'Oct 28, 2023', status: 'COMPLETED', amount: 5000000 },
  ];

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(orders.map(o => o.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const selectedOrders = orders.filter(o => selectedIds.includes(o.id));
  const totalAmount = selectedOrders.reduce((sum, o) => sum + o.amount, 0);

  return (
    <div className="flex flex-col min-h-screen relative" style={{ backgroundColor: '#F9F9F9' }}>
      <TopBar />

      <main className="flex-1 p-8">
        <div className="mb-6 flex flex-col gap-6">
          {/* Consolidated Header Controls */}
          <div className="bg-white p-4 rounded-xl border flex items-center justify-between gap-6 shadow-sm overflow-x-auto" style={{ borderColor: '#EFDFDF' }}>
            <div className="flex items-center gap-4 flex-1">
              {/* Compact Search Icon/Button */}
              <button className="p-2.5 border rounded-xl hover:bg-gray-50 transition-colors flex-shrink-0" style={{ borderColor: '#EFDFDF' }}>
                <SearchIcon />
              </button>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Date:</span>
                  <input 
                    type="date" 
                    className="bg-white border rounded-lg px-3 py-2 text-sm text-gray-600 focus:outline-none"
                    style={{ borderColor: '#EFDFDF' }}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Status:</span>
                  <select 
                    className="bg-white border rounded-lg px-3 py-2 text-sm text-gray-600 focus:outline-none min-w-[140px]"
                    style={{ borderColor: '#EFDFDF' }}
                  >
                    <option>All Statuses</option>
                    <option>Delivered</option>
                    <option>Processing</option>
                    <option>Completed</option>
                  </select>
                </div>

                <button className="p-2.5 border rounded-xl hover:bg-gray-50 transition-colors" style={{ borderColor: '#EFDFDF' }}>
                  <FilterIcon />
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-4 flex-shrink-0">
              <button 
                onClick={() => selectedIds.length > 0 && setShowInvoiceModal(true)}
                disabled={selectedIds.length === 0}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white transition-all shadow-md whitespace-nowrap ${
                  selectedIds.length > 0 ? 'bg-[#6B1F1F] hover:opacity-90 active:scale-95' : 'bg-gray-300 cursor-not-allowed shadow-none'
                }`}
              >
                <span className="opacity-90"><BillIcon /></span>
                Generate Invoice {selectedIds.length > 0 && `(${selectedIds.length})`}
              </button>
              <Link 
                href="/dashboard/administration/orders/create"
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 active:scale-95 shadow-md whitespace-nowrap" 
                style={{ backgroundColor: '#D44444' }}
              >
                <span className="text-xl leading-none">+</span>
                Create New Order
              </Link>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: '#EFDFDF' }}>
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ backgroundColor: '#F9FAFB', borderColor: '#EFDFDF' }}>
                  <th className="px-6 py-4 text-left">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded text-[#6B1F1F] focus:ring-[#6B1F1F]"
                      checked={selectedIds.length === orders.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Client Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Product Type</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Destination</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Scheduled Delivery</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order, idx) => (
                  <tr 
                    key={idx} 
                    className={`transition-colors group hover:bg-gray-50/50 ${selectedIds.includes(order.id) ? 'bg-[#FDF8F8]' : ''}`}
                    onClick={() => handleSelectOne(order.id)}
                  >
                    <td className="px-6 py-5" onClick={(e) => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded text-[#6B1F1F] focus:ring-[#6B1F1F]"
                        checked={selectedIds.includes(order.id)}
                        onChange={() => handleSelectOne(order.id)}
                      />
                    </td>
                    <td className="px-6 py-5 text-sm font-bold text-gray-800">{order.id}</td>
                    <td className="px-6 py-5 text-sm font-medium text-gray-600">{order.client}</td>
                    <td className="px-6 py-5 text-sm text-gray-600">{order.type}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-[#9E6666]">
                        <MapPinIcon />
                        {order.destination}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-600">{order.date}</td>
                    <td className="px-6 py-5">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-5" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center gap-5 text-[#9E6666]">
                        <button 
                          className={`hover:text-[#6B1F1F] hover:scale-110 transition-all active:scale-95 ${order.status === 'DELIVERED' ? 'visible' : 'invisible pointer-events-none'}`} 
                          title="View Bill"
                        >
                          <Link href={`/dashboard/administration/orders/invoice/${order.id}`}>
                            <BillIcon />
                          </Link>
                        </button>
                        <button className="hover:text-[#6B1F1F] hover:scale-110 transition-all active:scale-95" title="Edit Order"><EditIcon /></button>
                        <button className="hover:text-red-600 hover:scale-110 transition-all active:scale-95" title="Delete Order"><TrashIcon /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-between" style={{ borderColor: '#EFDFDF' }}>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Showing 5 of 124 results</span>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 text-sm text-gray-400 hover:text-gray-600 disabled:opacity-50">Previous</button>
                <button className="w-8 h-8 rounded text-sm font-bold bg-[#6B1F1F] text-white">1</button>
                <button className="w-8 h-8 rounded text-sm font-bold text-gray-600 hover:bg-gray-200">2</button>
                <button className="w-8 h-8 rounded text-sm font-bold text-gray-600 hover:bg-gray-200">3</button>
                <button className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800">Next</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Generate Invoice Modal */}
      {showInvoiceModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-gray-900 mb-2">Generate Invoice</h2>
              <p className="text-[#998888] font-medium leading-relaxed">
                The following orders will be consolidated into a single invoice.
              </p>
            </div>

            <div className="bg-[#F9F9F9] rounded-[2rem] p-8 mb-8 space-y-4 max-h-[300px] overflow-y-auto border border-[#EFDFDF]/30">
              <div className="flex justify-between items-center pb-3 border-b border-[#EFDFDF]/50">
                <span className="text-[10px] font-black text-[#A0A0A0] uppercase tracking-widest">Order ID</span>
                <span className="text-[10px] font-black text-[#A0A0A0] uppercase tracking-widest text-right">Amount</span>
              </div>
              {selectedOrders.map((order) => (
                <div key={order.id} className="flex justify-between items-center py-1">
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-gray-800">{order.id}</span>
                    <span className="text-[11px] font-medium text-gray-400">{order.client}</span>
                  </div>
                  <span className="text-sm font-black text-gray-800">Rp. {order.amount.toLocaleString('id-ID')}</span>
                </div>
              ))}
            </div>

            <div className="text-center mb-10">
              <p className="text-[10px] font-black text-[#A0A0A0] uppercase tracking-widest mb-1">Total Invoice Amount</p>
              <h3 className="text-4xl font-black text-gray-900 tracking-tight">
                Rp. {totalAmount.toLocaleString('id-ID')}
              </h3>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                className="w-full py-5 bg-[#6B1F1F] text-white font-black text-lg rounded-2xl shadow-xl hover:opacity-95 transition-all active:scale-[0.98]"
                onClick={() => {
                  const orderData = JSON.stringify(selectedOrders);
                  router.push(`/dashboard/administration/orders/invoice/create?orders=${encodeURIComponent(orderData)}`);
                  setShowInvoiceModal(false);
                }}
              >
                Generate Invoice
              </button>
              <button 
                className="w-full py-2 text-[#998888] font-bold text-sm tracking-wide hover:text-gray-700 transition-colors"
                onClick={() => setShowInvoiceModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, { bg: string, text: string }> = {
    'DELIVERED': { bg: '#E1EFFF', text: '#3E82F7' },
    'PROCESSING': { bg: '#FFF7E1', text: '#F7B93E' },
    'COMPLETED': { bg: '#E1F7E6', text: '#34A853' },
  };

  const style = styles[status] || { bg: '#F3F4F6', text: '#6B7280' };

  return (
    <span 
      className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider"
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      {status}
    </span>
  );
}
