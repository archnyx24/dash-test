'use client';

import React, { useState } from 'react';
import TopBar from '@/components/TopBar';

type InvoiceStatus = 'waiting' | 'paid' | 'overdue';

interface Invoice {
  id: string;
  recipient: string;
  issueDate: string;
  dueDate: string;
  totalAmount: string;
  status: InvoiceStatus;
}

const INVOICES_DATA: Invoice[] = [
  { id: 'INV-2023-00102', recipient: 'Polytron', issueDate: 'Oct 26, 2026', dueDate: 'Nov 10, 2026', totalAmount: 'Rp 450,200.00', status: 'waiting' },
  { id: 'INV-2023-00098', recipient: 'Nux', issueDate: 'Oct 20, 2026', dueDate: 'Oct 30, 2026', totalAmount: 'Rp 1,280,000.00', status: 'paid' },
  { id: 'INV-2023-00085', recipient: 'Honda', issueDate: 'Oct 05, 2026', dueDate: 'Oct 20, 2026', totalAmount: 'Rp 845,000.00', status: 'overdue' },
  { id: 'INV-2023-00105', recipient: 'Yamaha', issueDate: 'Oct 28, 2026', dueDate: 'Nov 12, 2026', totalAmount: 'Rp 125,500.00', status: 'paid' },
  { id: 'INV-2023-00104', recipient: 'WMoto', issueDate: 'Oct 27, 2026', dueDate: 'Nov 11, 2026', totalAmount: 'Rp 332,000.00', status: 'waiting' },
];

const STATUS_STYLES = {
  waiting: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'WAITING' },
  paid: { bg: 'bg-green-100', text: 'text-green-700', label: 'PAID' },
  overdue: { bg: 'bg-red-100', text: 'text-red-700', label: 'OVERDUE' },
};

export default function InvoiceManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const filteredInvoices = INVOICES_DATA.filter((invoice) => {
    const matchSearch = invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.recipient.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalInvoices = 84;
  const perPage = 5;
  const totalPages = Math.ceil(filteredInvoices.length / perPage);

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#F9F9F9' }}>
      <TopBar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Search and Filter Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 items-center flex-wrap">
                {/* Search Bar */}
                <div className="flex-1 min-w-xs">
                  <div className="relative">
                    <svg className="absolute left-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search by Invoice ID or Recipient..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Date Range */}
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 text-sm font-medium">RANGE:</span>
                  <input
                    type="text"
                    placeholder="mm/dd/yyyy"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="w-32 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-400">-</span>
                  <input
                    type="text"
                    placeholder="mm/dd/yyyy"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="w-32 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Status Filter */}
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 text-sm font-medium">STATUS:</span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  >
                    <option value="all">All Invoices</option>
                    <option value="waiting">Waiting</option>
                    <option value="paid">Paid</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Invoice ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Recipient
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Issue Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Total Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {invoice.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {invoice.recipient}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {invoice.issueDate}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {invoice.dueDate}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {invoice.totalAmount}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded text-xs font-semibold ${STATUS_STYLES[invoice.status].bg} ${STATUS_STYLES[invoice.status].text}`}>
                        {STATUS_STYLES[invoice.status].label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-3">
                        <button className="text-gray-400 hover:text-gray-600 transition">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button className="text-gray-400 hover:text-gray-600 transition">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                SHOWING {filteredInvoices.length} OF {totalInvoices} INVOICES
              </p>
              <div className="flex gap-2">
                <button className="px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded transition">
                  Previous
                </button>
                <button className="px-3 py-2 text-sm font-medium text-white bg-gray-800 rounded">
                  1
                </button>
                <button className="px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded transition">
                  2
                </button>
                <button className="px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded transition">
                  3
                </button>
                <button className="px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded transition">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
