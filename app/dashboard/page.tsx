"use client";

import TopBar from "@/components/TopBar";
import MetricsCard from "@/components/MetricsCard";
import dynamic from "next/dynamic";

const FleetMap = dynamic(() => import("@/components/FleetMap"), { ssr: false });

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#F9F9F9' }}>
      {/* Top Bar */}
      <TopBar />

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Metrics Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <MetricsCard label="Active Shipments" value="1,234" change="12%" isPositive={true} />
          <MetricsCard label="On-time Delivery" value="98%" change="2%" isPositive={false} />
          <MetricsCard label="Delayed" value="23" change="5%" isPositive={true} />
          <MetricsCard label="Total Invoices" value="5,678" change="8%" isPositive={true} />
        </div>

        {/* Live Fleet Preview & Shipment Overview */}
        <div className="space-y-8">
          {/* Live Fleet Preview Section */}
          <section>
            <h2 className="text-lg font-bold mb-4" style={{ color: '#333333' }}>Live Fleet Preview</h2>
            <div className="rounded-xl shadow-lg border overflow-hidden relative" style={{ backgroundColor: '#FFFFFF', borderColor: '#EFDFDF', height: '500px' }}>
              <FleetMap />
            </div>
          </section>

          {/* Shipment Overview Section */}
          <section>
            <h2 className="text-lg font-bold mb-4" style={{ color: '#000000' }}>Shipment Overview</h2>
            <div className="rounded-lg shadow-sm border overflow-hidden" style={{ backgroundColor: '#FEF9F9', borderColor: '#EFDFDF' }}>
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: '#FEF9F9', borderBottom: '1px solid #EFDFDF' }}>
                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#333333' }}>Shipment ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#333333' }}>Origin</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#333333' }}>Destination</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#333333' }}>Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#333333' }}>Expected Delivery</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#9E6666' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ backgroundColor: '#FEF9F9', borderBottom: '1px solid #F8F0F0' }}>
                    <td className="px-6 py-4 text-sm font-medium" style={{ color: '#333333' }}>SHP-2023-001</td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#9E6666' }}>Semarang</td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#9E6666' }}>Tanggerang</td>
                    <td className="px-6 py-4 text-sm"><span className="px-4 py-1.5 rounded-lg text-xs font-semibold" style={{ backgroundColor: '#F5EEEE', color: '#333333' }}>In Transit</span></td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#9E6666' }}>2026-11-15</td>
                    <td className="px-6 py-4 text-sm"><a href="#" className="font-bold border-b border-transparent hover:border-current" style={{ color: '#9E6666' }}>View</a></td>
                  </tr>
                  <tr style={{ backgroundColor: '#FEF9F9', borderBottom: '1px solid #F8F0F0' }}>
                    <td className="px-6 py-4 text-sm font-medium" style={{ color: '#333333' }}>SHP-2023-002</td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#9E6666' }}>Yogyakarta</td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#9E6666' }}>Bandung</td>
                    <td className="px-6 py-4 text-sm"><span className="px-4 py-1.5 rounded-lg text-xs font-semibold" style={{ backgroundColor: '#F5EEEE', color: '#333333' }}>Pending</span></td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#9E6666' }}>2026-11-18</td>
                    <td className="px-6 py-4 text-sm"><a href="#" className="font-bold border-b border-transparent hover:border-current" style={{ color: '#9E6666' }}>View</a></td>
                  </tr>
                  <tr style={{ backgroundColor: '#FEF9F9', borderBottom: '1px solid #F8F0F0' }}>
                    <td className="px-6 py-4 text-sm font-medium" style={{ color: '#333333' }}>SHP-2023-003</td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#9E6666' }}>Bandung</td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#9E6666' }}>Kediri</td>
                    <td className="px-6 py-4 text-sm"><span className="px-4 py-1.5 rounded-lg text-xs font-semibold" style={{ backgroundColor: '#F5EEEE', color: '#333333' }}>Delayed</span></td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#9E6666' }}>2026-11-20</td>
                    <td className="px-6 py-4 text-sm"><a href="#" className="font-bold border-b border-transparent hover:border-current" style={{ color: '#9E6666' }}>View</a></td>
                  </tr>
                  <tr style={{ backgroundColor: '#FEF9F9', borderBottom: '1px solid #F8F0F0' }}>
                    <td className="px-6 py-4 text-sm font-medium" style={{ color: '#333333' }}>SHP-2023-004</td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#9E6666' }}>Jakarta</td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#9E6666' }}>Yogyakarta</td>
                    <td className="px-6 py-4 text-sm"><span className="px-4 py-1.5 rounded-lg text-xs font-semibold" style={{ backgroundColor: '#F5EEEE', color: '#333333' }}>In Transit</span></td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#9E6666' }}>2026-11-22</td>
                    <td className="px-6 py-4 text-sm"><a href="#" className="font-bold border-b border-transparent hover:border-current" style={{ color: '#9E6666' }}>View</a></td>
                  </tr>
                  <tr style={{ backgroundColor: '#FEF9F9' }}>
                    <td className="px-6 py-4 text-sm font-medium" style={{ color: '#333333' }}>SHP-2023-005</td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#9E6666' }}>Cakung</td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#9E6666' }}>Balaraja</td>
                    <td className="px-6 py-4 text-sm"><span className="px-4 py-1.5 rounded-lg text-xs font-semibold" style={{ backgroundColor: '#F5EEEE', color: '#333333' }}>Pending</span></td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#9E6666' }}>2026-11-25</td>
                    <td className="px-6 py-4 text-sm"><a href="#" className="font-bold border-b border-transparent hover:border-current" style={{ color: '#9E6666' }}>View</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function DriverMarker({ x, y, name, vehicle, status }: { x: string, y: string, name: string, vehicle: string, status: string }) {
  const isActive = status.includes('Moving');
  return (
    <div className="marker-container absolute cursor-pointer" style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}>
      {/* Pulse Effect */}
      {isActive && (
        <div className="signal absolute inset-0 w-8 h-8 -left-2 -top-2 rounded-full" style={{ backgroundColor: '#9E6666' }}></div>
      )}
      
      {/* Icon Wrapper */}
      <div className="w-8 h-8 bg-white rounded-full shadow-md border flex items-center justify-center relative z-10 hover:scale-110 transition-transform" style={{ borderColor: '#EFDFDF' }}>
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#9E6666">
          <path d="M18,11 L18,8 L21,11 L21,14 L18,14 L18,17 L6,17 L6,14 L3,14 L3,11 L6,8 L18,8 Z M6,11 L6,14 L18,14 L18,11 L6,11 Z M7,18 C6.44771525,18 6,18.4477153 6,19 C6,19.5522847 6.44771525,20 7,20 C7.55228475,20 8,19.5522847 8,19 C8,18.4477153 7.55228475,18 7,18 Z M17,18 C16.4477153,18 16,18.4477153 16,19 C16,19.5522847 16.4477153,20 17,20 C17.5522847,20 18,19.5522847 18,19 C18,18.4477153 17.5522847,18 17,18 Z" />
        </svg>
      </div>

      {/* Driver Tooltip */}
      <div className="driver-tooltip">
        <p className="font-bold text-sm" style={{ color: '#333333' }}>{name}</p>
        <p className="text-[10px] text-gray-500 uppercase tracking-wider">{vehicle}</p>
        <div className="flex items-center gap-1.5 mt-1 border-t pt-1">
          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
          <span className="text-[10px] font-medium" style={{ color: '#9E6666' }}>{status}</span>
        </div>
      </div>
    </div>
  );
}
