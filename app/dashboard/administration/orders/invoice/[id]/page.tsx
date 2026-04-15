'use client';

import React from "react";
import Link from "next/link";
import TopBar from "@/components/TopBar";

const TruckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const BillIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);

const SaveIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);

export default function InvoiceDetails({ params }: { params: { id: string } }) {
  // Mock data based on the screenshot
  const data = {
    invoiceNumber: "INV-2023-11-0045",
    creationDate: "Oct 28, 2026",
    sourceOrder: "ORD-20231026-001",
    logistics: {
      totalBill: "RP 2.000.000",
      ppn: "RP 220.000",
      vehicleNumber: "AB-3221-ZA",
      vehicleType: "Towing",
      driverName: "Jarwo",
      loadingDate: "10/28/2026",
      unloadingDate: "10/29/2026",
      deliveryDestination: "Jl. Raya Kudus - Jepara No.KM 7",
      expiryDate: "11/28/2026"
    },
    client: {
      companyName: "PT Polytron",
      phoneNumber: "+62 81234567",
      accountNumber: "GLS-LK-99827-B",
      companyAddress: "Jl. Raya Semarang - Demak No.KM.9"
    }
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#F9F9F9' }}>
      <TopBar />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header Card */}
          <div className="bg-white rounded-2xl border p-8 flex items-center justify-between shadow-sm" style={{ borderColor: '#EFDFDF' }}>
            <div>
              <p className="text-[10px] font-black text-[#A0A0A0] uppercase tracking-[0.2em] mb-1">Invoice Number</p>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">{data.invoiceNumber}</h1>
            </div>
            <div className="flex gap-12 text-right">
              <div>
                <p className="text-[10px] font-black text-[#A0A0A0] uppercase tracking-[0.2em] mb-1">Creation Date</p>
                <p className="text-sm font-bold text-gray-800">{data.creationDate}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-[#A0A0A0] uppercase tracking-[0.2em] mb-1">Source Order</p>
                <p className="text-sm font-bold text-[#D44444]">{data.sourceOrder}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Logistics Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl border p-8 shadow-sm" style={{ borderColor: '#EFDFDF' }}>
                <div className="flex items-center gap-3 mb-8">
                  <span className="p-2 bg-gray-50 rounded-lg text-gray-800"><TruckIcon /></span>
                  <h2 className="text-sm font-black text-gray-800 uppercase tracking-wider">Transport & Logistics Details</h2>
                </div>

                <div className="space-y-6">
                  {/* Total Bill & PPN */}
                  <div className="grid grid-cols-1 gap-6">
                    <InputField label="Total Bill" value={data.logistics.totalBill} />
                    <InputField label="PPN 11%" value={data.logistics.ppn} />
                  </div>

                  {/* Vehicle Details */}
                  <div className="grid grid-cols-2 gap-6">
                    <InputField label="Vehicle Number" value={data.logistics.vehicleNumber} />
                    <SelectField label="Vehicle Type" value={data.logistics.vehicleType} />
                  </div>

                  {/* Driver */}
                  <div className="grid grid-cols-1">
                    <SelectField label="Driver Name" value={data.logistics.driverName} />
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-6">
                    <InputField label="Loading Date" value={data.logistics.loadingDate} />
                    <InputField label="Unloading Date" value={data.logistics.unloadingDate} />
                  </div>

                  {/* Destination */}
                  <div className="grid grid-cols-1">
                    <InputField label="Delivery Destination" value={data.logistics.deliveryDestination} />
                  </div>

                  {/* Expiry */}
                  <div className="grid grid-cols-1 md:w-1/2">
                    <InputField label="Invoice Expiry Date" value={data.logistics.expiryDate} isError />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Client Details */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border p-8 shadow-sm" style={{ borderColor: '#EFDFDF' }}>
                <h2 className="text-sm font-black text-gray-800 uppercase tracking-wider mb-8">Client Details</h2>
                
                <div className="space-y-8">
                  <DisplayItem label="Company Name" value={data.client.companyName} isStrong />
                  <div className="space-y-6">
                    <InputField label="Phone Number" value={data.client.phoneNumber} />
                    <InputField label="Account Number" value={data.client.accountNumber} />
                    <TextAreaField label="Company Address" value={data.client.companyAddress} />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button className="w-full py-4 bg-[#6B1F1F] text-white font-black text-sm rounded-xl shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2">
                  <BillIcon />
                  Generate Invoice
                </button>
                <button className="w-full py-4 bg-white border border-[#EFDFDF] text-gray-600 font-bold text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-all">
                  <SaveIcon />
                  Save Draft
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function InputField({ label, value, isError = false }: { label: string, value: string, isError?: boolean }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-[#A0A0A0] uppercase tracking-widest">{label}</label>
      <div 
        className={`w-full px-5 py-4 border rounded-xl text-sm font-bold transition-all bg-white ${isError ? 'text-[#D44444]' : 'text-gray-800'}`}
        style={{ borderColor: '#EFDFDF' }}
      >
        {value}
      </div>
    </div>
  );
}

function SelectField({ label, value }: { label: string, value: string }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-[#A0A0A0] uppercase tracking-widest">{label}</label>
      <div 
        className="w-full px-5 py-4 border rounded-xl text-sm font-bold flex items-center justify-between text-gray-800 bg-white"
        style={{ borderColor: '#EFDFDF' }}
      >
        {value}
        <span className="text-gray-400"><ChevronDownIcon /></span>
      </div>
    </div>
  );
}

function TextAreaField({ label, value }: { label: string, value: string }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-[#A0A0A0] uppercase tracking-widest">{label}</label>
      <div 
        className="w-full px-5 py-4 border rounded-xl text-sm font-bold leading-relaxed text-gray-800 bg-white min-h-[100px]"
        style={{ borderColor: '#EFDFDF' }}
      >
        {value}
      </div>
    </div>
  );
}

function DisplayItem({ label, value, isStrong = false }: { label: string, value: string, isStrong?: boolean }) {
  return (
    <div>
      <p className="text-[10px] font-black text-[#A0A0A0] uppercase tracking-widest mb-2">{label}</p>
      <p className={`${isStrong ? 'text-xl font-black' : 'text-sm font-bold'} text-gray-900`}>{value}</p>
    </div>
  );
}
