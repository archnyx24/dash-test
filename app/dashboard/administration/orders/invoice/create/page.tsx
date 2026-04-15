'use client';

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import TopBar from "@/components/TopBar";

const ChevronLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const SaveIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

interface OrderData {
  id: string;
  client: string;
  type: string;
  destination: string;
  date: string;
  status: string;
  amount: number;
}

function CreateInvoiceContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedOrders, setSelectedOrders] = useState<OrderData[]>([]);
  const [invoiceNumber, setInvoiceNumber] = useState("INV-2023-11-0045");
  const [invoiceDate, setInvoiceDate] = useState("Oct 28, 2026");
  const [invoiceExpiryDate, setInvoiceExpiryDate] = useState("11/28/2026");
  const [clientName, setClientName] = useState("PT Polytron");
  const [phoneNumber, setPhoneNumber] = useState("+62 81234567");
  const [accountNumber, setAccountNumber] = useState("GLS-LK-99827-B");
  const [companyAddress, setCompanyAddress] = useState("Jl. Raya Semarang - Demak No.KM.9");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const ordersParam = searchParams.get("orders");
    if (ordersParam) {
      try {
        const orders = JSON.parse(decodeURIComponent(ordersParam));
        setSelectedOrders(orders);
        if (orders.length > 0) {
          setClientName(orders[0].client);
        }
      } catch (error) {
        console.error("Failed to parse orders:", error);
      }
    }
  }, [searchParams]);

  const totalAmount = selectedOrders.reduce((sum, order) => sum + order.amount, 0);
  const ppn = Math.floor(totalAmount * 0.11);
  const totalBill = totalAmount + ppn;

  const handleRemoveOrder = (orderId: string) => {
    setSelectedOrders(prev => prev.filter(order => order.id !== orderId));
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#F9F9F9' }}>
      <TopBar />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Top: Invoice Number & Creation Date */}
          <div className="bg-white rounded-2xl border p-8 shadow-sm mb-8" style={{ borderColor: '#EFDFDF' }}>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-[#A0A0A0] uppercase tracking-widest">Invoice Number</label>
                <div className="text-2xl font-black text-gray-900">{invoiceNumber}</div>
              </div>
              <div className="text-right space-y-3">
                <label className="text-[10px] font-black text-[#A0A0A0] uppercase tracking-widest">Creation Date</label>
                <div className="text-2xl font-black text-gray-900">{invoiceDate}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Invoice Details & Orders */}
            <div className="lg:col-span-2 space-y-6">

              {/* Selected Orders Card */}
              <div className="bg-white rounded-2xl border p-8 shadow-sm" style={{ borderColor: '#EFDFDF' }}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-sm font-black text-gray-800 uppercase tracking-wider">
                    Selected Orders ({selectedOrders.length})
                  </h2>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-[#D44444] hover:bg-red-50 rounded-lg transition-colors">
                    <PlusIcon />
                    Add Orders
                  </button>
                </div>

                {selectedOrders.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>No orders selected</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b" style={{ borderColor: '#EFDFDF' }}>
                      <span className="text-[10px] font-black text-[#A0A0A0] uppercase tracking-widest">Order ID</span>
                      <span className="text-[10px] font-black text-[#A0A0A0] uppercase tracking-widest">Client Name</span>
                      <span className="text-[10px] font-black text-[#A0A0A0] uppercase tracking-widest">Amount</span>
                      <span className="text-[10px] font-black text-[#A0A0A0] uppercase tracking-widest"></span>
                    </div>

                    {selectedOrders.map((order) => (
                      <div key={order.id} className="flex justify-between items-center py-3 hover:bg-gray-50 px-3 rounded-lg transition-colors">
                        <span className="text-sm font-bold text-gray-800">{order.id}</span>
                        <span className="text-sm text-gray-600">{order.client}</span>
                        <span className="text-sm font-bold text-gray-800">Rp {order.amount.toLocaleString('id-ID')}</span>
                        <button
                          onClick={() => handleRemoveOrder(order.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors p-1"
                        >
                          <XIcon />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* PPN & Invoice Expiry Date */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border p-6 shadow-sm" style={{ borderColor: '#EFDFDF' }}>
                  <label className="text-[10px] font-black text-[#A0A0A0] uppercase tracking-widest block mb-3">PPN 11%</label>
                  <div className="text-2xl font-black text-gray-900">Rp {ppn.toLocaleString('id-ID')}</div>
                </div>

                <div className="bg-white rounded-2xl border p-6 shadow-sm" style={{ borderColor: '#EFDFDF' }}>
                  <label className="text-[10px] font-black text-[#A0A0A0] uppercase tracking-widest block mb-3">Invoice Expiry Date</label>
                  <input
                    type="text"
                    value={invoiceExpiryDate}
                    onChange={(e) => setInvoiceExpiryDate(e.target.value)}
                    className="w-full text-xl font-black text-[#D44444] bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              {/* Total Bill */}
              <div className="bg-white rounded-2xl border p-6 shadow-sm" style={{ borderColor: '#EFDFDF' }}>
                <label className="text-[10px] font-black text-[#A0A0A0] uppercase tracking-widest block mb-3">Total Bill</label>
                <div className="text-3xl font-black text-gray-900">Rp {totalBill.toLocaleString('id-ID')}</div>
              </div>
            </div>

            {/* Right Column: Client Details */}
            <div className="space-y-6">
              {/* Client Details Card */}
              <div className="bg-white rounded-2xl border p-8 shadow-sm" style={{ borderColor: '#EFDFDF' }}>
                <h2 className="text-sm font-black text-gray-800 uppercase tracking-wider mb-6">Client Details</h2>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-[#A0A0A0] uppercase tracking-widest">Company Name</label>
                    <div className="px-5 py-4 border rounded-xl text-sm font-bold text-gray-800 bg-gray-50" style={{ borderColor: '#EFDFDF' }}>
                      {clientName}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-[#A0A0A0] uppercase tracking-widest">Phone Number</label>
                    <input
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-5 py-4 border rounded-xl text-sm font-bold text-gray-800 focus:outline-none focus:border-[#6B1F1F]"
                      style={{ borderColor: '#EFDFDF' }}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-[#A0A0A0] uppercase tracking-widest">Account Number</label>
                    <input
                      type="text"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      className="w-full px-5 py-4 border rounded-xl text-sm font-bold text-gray-800 focus:outline-none focus:border-[#6B1F1F]"
                      style={{ borderColor: '#EFDFDF' }}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-[#A0A0A0] uppercase tracking-widest">Company Address</label>
                    <textarea
                      value={companyAddress}
                      onChange={(e) => setCompanyAddress(e.target.value)}
                      className="w-full px-5 py-4 border rounded-xl text-sm font-bold text-gray-800 focus:outline-none focus:border-[#6B1F1F] resize-none"
                      rows={3}
                      style={{ borderColor: '#EFDFDF' }}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 mt-8">
                  <button className="flex items-center justify-center gap-2 w-full px-6 py-3 border border-[#EFDFDF] rounded-xl font-bold text-sm text-gray-700 hover:bg-gray-50 transition-all hover:border-gray-400">
                    <SaveIcon />
                    SAVE DRAFT
                  </button>
                  <button 
                    onClick={() => setShowConfirmModal(true)}
                    className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#D44444] rounded-xl font-bold text-sm text-white hover:bg-[#C23333] transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
                  >
                    GENERATE INVOICE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Confirm Invoice Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-black text-gray-900 mb-3">Confirm Invoice</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Please review the invoice details before finalizing.
              </p>
            </div>

            <div className="bg-[#F9F9F9] rounded-2xl p-6 mb-8 space-y-4 border border-[#EFDFDF]">
              <div className="flex justify-between items-center py-3">
                <span className="text-xs font-black text-[#A0A0A0] uppercase tracking-wider">Invoice Number</span>
                <span className="text-sm font-black text-gray-900">{invoiceNumber}</span>
              </div>
              <div className="border-t border-[#EFDFDF]"></div>
              <div className="flex justify-between items-center py-3">
                <span className="text-xs font-black text-[#A0A0A0] uppercase tracking-wider">Client Name</span>
                <span className="text-sm font-black text-gray-900">{clientName}</span>
              </div>
              <div className="border-t border-[#EFDFDF]"></div>
              <div className="flex justify-between items-start py-3">
                <span className="text-xs font-black text-[#A0A0A0] uppercase tracking-wider">Address</span>
                <span className="text-sm font-black text-gray-900 text-right">{companyAddress}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                onClick={() => {
                  setShowConfirmModal(false);
                  router.push('/dashboard/administration/orders/invoice/preview');
                }}
                className="w-full py-4 bg-[#6B1F1F] text-white font-black text-base rounded-2xl shadow-lg hover:bg-[#5A1818] transition-all active:scale-[0.98]"
              >
                Confirm and Create
              </button>
              <button 
                onClick={() => setShowConfirmModal(false)}
                className="w-full py-2 text-gray-600 font-semibold text-sm hover:text-gray-900 transition-colors"
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

export default function CreateInvoice() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <CreateInvoiceContent />
    </Suspense>
  );
}
