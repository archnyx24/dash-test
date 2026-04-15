'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom popup styles
const popupStyles = `
  .leaflet-popup {
    margin-bottom: 0 !important;
    z-index: 1005 !important;
  }
  
  .leaflet-popup-content-wrapper {
    background: transparent !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    padding: 0 !important;
  }
  
  .leaflet-popup-content {
    margin: 0 !important;
    width: 100% !important;
  }
  
  .leaflet-popup-tip {
    display: none !important;
  }
  
  .leaflet-popup-close-button {
    top: -8px !important;
    right: -8px !important;
    width: 24px !important;
    height: 24px !important;
    z-index: 1010 !important;
  }
  
  .leaflet-control-zoom {
    background: white !important;
    border: 1px solid #ddd !important;
    border-radius: 8px !important;
    padding: 0 !important;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
    z-index: 1000 !important;
  }
  
  .leaflet-control-zoom a {
    width: 40px !important;
    height: 40px !important;
    background: white !important;
    border: none !important;
    color: #333 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    font-size: 20px !important;
    font-weight: bold !important;
    line-height: 40px !important;
  }
  
  .leaflet-control-zoom a:first-child {
    border-bottom: 1px solid #ddd !important;
    border-radius: 7px 7px 0 0 !important;
  }
  
  .leaflet-control-zoom a:last-child {
    border-radius: 0 0 7px 7px !important;
  }
  
  .leaflet-control-zoom a:hover {
    background: #f5f5f5 !important;
  }
`;

// Custom marker icon
const markerIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAzMiA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTQiIGZpbGw9IiNEQzM1NDUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMyIvPgo8dGV4dCB4PSIxNiIgeT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSJib2xkIj7wn5uaPC90ZXh0Pgo8L3N2Zz4=',
  iconSize: [32, 48],
  iconAnchor: [16, 48],
  popupAnchor: [0, -70],
});

interface VehicleData {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: string;
  vehicleId: string;
  speed: string;
  eta: string;
  route: string;
}

const vehicles: VehicleData[] = [
  {
    id: '1',
    name: 'Jarwo',
    lat: -7.2575,
    lng: 112.7521,
    status: 'Moving',
    vehicleId: 'AB-3221-ZA',
    speed: '45 km/h',
    eta: '14:45 (12m)',
    route: 'Downtown Express → Port Terminal',
  },
  {
    id: '2',
    name: 'Tata',
    lat: -6.9023,
    lng: 107.6053,
    status: 'Idle',
    vehicleId: 'AB-3221-ZB',
    speed: '0 km/h',
    eta: 'N/A',
    route: 'Waiting for pickup',
  },
  {
    id: '3',
    name: 'Angel',
    lat: -7.0957,
    lng: 110.4405,
    status: 'In Route',
    vehicleId: 'AB-3221-ZC',
    speed: '55 km/h',
    eta: '15:30 (25m)',
    route: 'City Center → West Terminal',
  },
  {
    id: '4',
    name: 'Slamet',
    lat: -6.1256,
    lng: 106.6749,
    status: 'Idle',
    vehicleId: 'AB-3221-ZD',
    speed: '0 km/h',
    eta: 'N/A',
    route: 'Depot Station',
  },
];

const CustomPopup = ({ vehicle, onViewLogs }: { vehicle: VehicleData; onViewLogs: (vehicle: VehicleData) => void }) => {
  return (
    <div className="w-60 p-0 rounded-xl overflow-hidden shadow-xl">
      {/* Header - Maroon */}
      <div className="text-white px-3 py-2.5 flex items-center justify-between" style={{ backgroundColor: '#6B2C2C' }}>
        <div className="flex items-center gap-1">
          <span className="text-xs font-bold">{vehicle.name.toUpperCase()}</span>
          <span className="text-xs font-light">•</span>
          <span className="text-xs font-normal">{vehicle.vehicleId}</span>
        </div>
        <span className="px-2.5 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full">
          LIVE
        </span>
      </div>

      {/* Content */}
      <div className="bg-white px-3 py-3 space-y-2.5">
        {/* Speed */}
        <div className="flex justify-between items-baseline">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Speed</span>
          <span className="text-xl font-bold text-gray-900">{vehicle.speed}</span>
        </div>

        {/* ETA */}
        <div className="flex justify-between items-baseline">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">ETA</span>
          <span className="text-xl font-bold text-gray-900">{vehicle.eta}</span>
        </div>

        {/* Current Route */}
        <div className="pt-2 border-t border-gray-200">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Current Route</p>
          <p className="text-xs font-medium text-gray-900 leading-snug">{vehicle.route}</p>
        </div>

        {/* View Full Logs Button */}
        <button 
          onClick={() => onViewLogs(vehicle)}
          className="w-full mt-3 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg font-semibold text-xs hover:bg-gray-200 transition"
        >
          View Full Logs
        </button>
      </div>
    </div>
  );
};

export default function FleetMap() {
  const router = useRouter();

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = popupStyles;
    document.head.appendChild(style);
    return () => void document.head.removeChild(style);
  }, []);

  const handleViewLogs = (vehicle: VehicleData) => {
    router.push(`/dashboard/vehicles/logs?driver=${vehicle.name}&vehicleId=${vehicle.vehicleId}`);
  };

  return (
    <MapContainer
      center={[-7.0978, 110.3743]}
      zoom={8}
      style={{ height: '100%', width: '100%' }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {vehicles.map((vehicle) => (
        <Marker key={vehicle.id} position={[vehicle.lat, vehicle.lng]} icon={markerIcon}>
          <Popup className="custom-popup">
            <CustomPopup vehicle={vehicle} onViewLogs={handleViewLogs} />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
