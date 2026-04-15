'use client';

import React, { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TopBar from "@/components/TopBar";

const DownloadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const PrintIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </svg>
);

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 2L11 13M22 2l-7 20-5-9-9-5 20-7z" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

export default function InvoicePreview() {
  const router = useRouter();
  const printRef = useRef(null);

  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow && printRef.current) {
      const htmlContent = (printRef.current as HTMLElement).innerHTML;
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleDownloadPDF = () => {
    alert('PDF download functionality coming soon');
  };

  const handleSendToClient = () => {
    alert('Send to client functionality coming soon');
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#F9F9F9' }}>
      <TopBar />

      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeftIcon />
              Back
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 px-6 py-3 border border-[#EFDFDF] rounded-xl font-bold text-sm text-gray-700 hover:bg-gray-50 transition-all"
              >
                <DownloadIcon />
                DOWNLOAD PDF
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-6 py-3 border border-[#EFDFDF] rounded-xl font-bold text-sm text-gray-700 hover:bg-gray-50 transition-all"
              >
                <PrintIcon />
                PRINT
              </button>
              <button
                onClick={handleSendToClient}
                className="flex items-center gap-2 px-6 py-3 bg-[#D44444] rounded-xl font-bold text-sm text-white hover:bg-[#C23333] transition-all shadow-lg"
              >
                <SendIcon />
                SEND TO CLIENT
              </button>
            </div>
          </div>

          {/* Invoice Preview */}
          <div
            ref={printRef}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            {/* Invoice Header with Logo and Diagonal Stripes */}
            <div className="relative bg-gradient-to-r from-[#8B3E3E] via-[#A0533E] to-[#D4A835] p-0 overflow-hidden">
              {/* Diagonal stripes on right */}
              <div className="absolute right-0 top-0 bottom-0 w-48 opacity-40">
                <svg className="w-full h-full" viewBox="0 0 200 200">
                  <line x1="0" y1="0" x2="200" y2="200" stroke="currentColor" strokeWidth="20" className="text-yellow-500" />
                  <line x1="20" y1="0" x2="220" y2="200" stroke="currentColor" strokeWidth="20" className="text-green-700" />
                  <line x1="-20" y1="0" x2="180" y2="200" stroke="currentColor" strokeWidth="20" className="text-yellow-500" />
                </svg>
              </div>

              <div className="relative z-10 p-8 flex items-start justify-between text-white">
                <div>
                  {/* Logo placeholder */}
                  <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center mb-4 text-[#8B3E3E] font-black text-center text-xs leading-tight">
                    <div>
                      <div className="font-black">WAJIRA</div>
                      <div className="text-[10px]">TR</div>
                    </div>
                  </div>
                </div>

                <div className="text-center flex-1 mx-8">
                  <h1 className="text-4xl font-black mb-1">WAJIRA</h1>
                  <p className="text-xl font-bold">JAGRATARA TRANSINDO</p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-semibold">Yogyakarta, 2 Januari 2025</p>
                </div>
              </div>
            </div>

            {/* Gray Info Section */}
            <div className="bg-gray-400 bg-opacity-40 p-8 text-gray-800">
              <div className="grid grid-cols-2 gap-8">
                {/* Left Side */}
                <div className="space-y-6">
                  <div className="flex gap-8">
                    <div className="w-32">
                      <p className="text-xs font-semibold opacity-70">Nomor</p>
                      <p className="text-xs font-semibold opacity-70">Lampiran</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold opacity-70">:</p>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">INV-WJTJ2025-0001</p>
                      <p className="text-xs opacity-70">1 berkas.</p>
                    </div>
                  </div>

                  <div className="flex gap-8">
                    <div className="w-32">
                      <p className="text-xs font-semibold opacity-70">Perihal</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold opacity-70">:</p>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold italic text-gray-900">Invoice Ekspedisi</p>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-xs font-semibold opacity-70">Dengan Hormat,</p>
                      <p className="text-xs font-semibold opacity-70">Nama</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold opacity-70">Alamat</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold opacity-70">No. TLP</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold opacity-70">No. REK BCA</p>
                    </div>
                  </div>
                </div>

                {/* Right Side */}
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-20">
                      <p className="text-xs font-semibold opacity-70">Kepada</p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">PT SARANA KENCANA MULYA</p>
                      <p className="text-xs opacity-70">u.p Bpk. MARIO</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-20">
                      <p className="text-xs font-semibold opacity-70">YTH.</p>
                    </div>
                    <div className="space-y-2"></div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-20">
                      <p className="text-xs font-semibold opacity-70">Di</p>
                    </div>
                    <div>
                      <p className="text-xs opacity-70">Kistalen</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company watermark/logo area */}
              <div className="mt-12 flex justify-center opacity-20">
                <div className="text-center">
                  <div className="text-6xl font-black text-gray-600">WAJIRA</div>
                  <div className="text-4xl font-black text-gray-600">TR</div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="text-xs font-bold text-gray-700">PT. WAJIRA JAGRATARA TRANSINDO</p>
                <p className="text-xs text-gray-700">Jl. Raya Slamet, Dsan. Rt.03 Rw 09 Jembangan Maguwotiharjo Depok Sleman</p>
                <p className="text-xs text-gray-700">: 0878-8363-1313</p>
                <p className="text-xs text-gray-700">: 456-831-1313</p>
              </div>
            </div>

            {/* Orders Table */}
            <div className="p-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#1E3A8A] text-white">
                    <th className="border border-gray-400 px-3 py-2 text-xs font-bold">NO</th>
                    <th className="border border-gray-400 px-3 py-2 text-xs font-bold">TANGGAL</th>
                    <th className="border border-gray-400 px-3 py-2 text-xs font-bold">NO POLISI</th>
                    <th className="border border-gray-400 px-3 py-2 text-xs font-bold">TYPE</th>
                    <th className="border border-gray-400 px-3 py-2 text-xs font-bold">DRIVER</th>
                    <th className="border border-gray-400 px-3 py-2 text-xs font-bold">SMAT</th>
                    <th className="border border-gray-400 px-3 py-2 text-xs font-bold">TUJUAN KIRIM</th>
                    <th className="border border-gray-400 px-3 py-2 text-xs font-bold">BONGKAR</th>
                    <th className="border border-gray-400 px-3 py-2 text-xs font-bold">NO. SURAT DO</th>
                    <th className="border border-gray-400 px-3 py-2 text-xs font-bold">INVOICE EXEC</th>
                    <th className="border border-gray-400 px-3 py-2 text-xs font-bold">MATA UANG</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-100">
                    <td className="border border-gray-400 px-3 py-2 text-xs text-gray-700">1</td>
                    <td className="border border-gray-400 px-3 py-2 text-xs text-gray-700">02/01/2025</td>
                    <td className="border border-gray-400 px-3 py-2 text-xs text-gray-700">AB ER RM 01</td>
                    <td className="border border-gray-400 px-3 py-2 text-xs text-gray-700">TOSWNG</td>
                    <td className="border border-gray-400 px-3 py-2 text-xs text-gray-700">TETEP</td>
                    <td className="border border-gray-400 px-3 py-2 text-xs text-gray-700">KLATEN</td>
                    <td className="border border-gray-400 px-3 py-2 text-xs text-gray-700">SOLO RAYA</td>
                    <td className="border border-gray-400 px-3 py-2 text-xs font-semibold">SURABAYA</td>
                    <td className="border border-gray-400 px-3 py-2 text-xs text-gray-700">SDAY-000000001</td>
                    <td className="border border-gray-400 px-3 py-2 text-xs font-semibold text-gray-900">Rp 500.000</td>
                    <td className="border border-gray-400 px-3 py-2 text-xs text-gray-700">Rp IDR</td>
                  </tr>
                  <tr>
                    <td colSpan={8} className="border border-gray-400 px-3 py-1 text-xs text-gray-600"></td>
                    <td className="border border-gray-400 px-3 py-1 text-xs text-gray-600">SURAKARTA</td>
                    <td className="border border-gray-400 px-3 py-1 text-xs text-gray-600">SDAY-000000001</td>
                    <td className="border border-gray-400 px-3 py-1 text-xs text-gray-600">Rp IDR</td>
                  </tr>
                  <tr>
                    <td colSpan={8} className="border border-gray-400 px-3 py-1 text-xs text-gray-600"></td>
                    <td className="border border-gray-400 px-3 py-1 text-xs text-gray-600">SAINTE</td>
                    <td className="border border-gray-400 px-3 py-1 text-xs text-gray-600">SDAY-000000001</td>
                    <td className="border border-gray-400 px-3 py-1 text-xs text-gray-600">Rp IDR</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="border border-gray-400 px-3 py-2 text-xs text-gray-700">2</td>
                    <td className="border border-gray-400 px-3 py-2 text-xs text-gray-700">03/01/2025</td>
                    <td className="border border-gray-400 px-3 py-2 text-xs text-gray-700">AB ER RM 02</td>
                    <td className="border border-gray-400 px-3 py-2 text-xs text-gray-700">TOSWNG</td>
                    <td className="border border-gray-400 px-3 py-2 text-xs text-gray-700">TETEP</td>
                    <td className="border border-gray-400 px-3 py-2 text-xs text-gray-700">KLATEN</td>
                    <td className="border border-gray-400 px-3 py-2 text-xs text-gray-700">YOGYAKARTA</td>
                    <td className="border border-gray-400 px-3 py-2 text-xs font-semibold">SAINTE</td>
                    <td className="border border-gray-400 px-3 py-2 text-xs text-gray-700">SDAY-000000001</td>
                    <td className="border border-gray-400 px-3 py-2 text-xs font-semibold text-gray-900">Rp 500.000</td>
                    <td className="border border-gray-400 px-3 py-2 text-xs text-gray-700">Rp IDR</td>
                  </tr>
                  <tr>
                    <td colSpan={8} className="border border-gray-400 px-3 py-1 text-xs text-gray-600"></td>
                    <td className="border border-gray-400 px-3 py-1 text-xs text-gray-600">SAINTE</td>
                    <td className="border border-gray-400 px-3 py-1 text-xs text-gray-600">SDAY-000000001</td>
                    <td className="border border-gray-400 px-3 py-1 text-xs text-gray-600">Rp IDR</td>
                  </tr>
                  <tr>
                    <td colSpan={8} className="border border-gray-400 px-3 py-1 text-xs text-gray-600"></td>
                    <td className="border border-gray-400 px-3 py-1 text-xs text-gray-600">JAKARTA/BEKASI</td>
                    <td className="border border-gray-400 px-3 py-1 text-xs text-gray-600">SDAY-000000001</td>
                    <td className="border border-gray-400 px-3 py-1 text-xs text-gray-600">Rp IDR</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="bg-gray-200 font-bold border-t-2 border-gray-400">
                    <td colSpan={9} className="border border-gray-400 px-3 py-3 text-xs text-right">PAYMENT OUTSTANDING AT ACCORDANCE OF N.S.&WAJIRA TRANSINDO :</td>
                    <td className="border border-gray-400 px-3 py-3 text-xs text-gray-900 font-bold">Rp 1.500.000</td>
                    <td className="border border-gray-400 px-3 py-3"></td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Footer with Signature */}
            <div className="p-8 border-t-4 border-[#8B3E3E] flex items-end justify-between">
              <div></div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-700 mb-16">Manager</p>
                <div className="w-24 text-center">
                  <p className="text-xs font-bold text-gray-700">_________________</p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-gray-700 mb-2">NIKO PUNTA</p>
                <p className="text-xs font-bold text-gray-700">TRANSINDO</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
