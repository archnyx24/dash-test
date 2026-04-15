'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapPreviewProps {
  location: string;
  lat?: number;
  lng?: number;
}

const locationCoords: Record<string, [number, number]> = {
  'SEMARANG, WEST JAVA': [-7.2575, 112.7521],
  'HIGHWAY, YOGYAKARTA': [-7.7956, 110.3695],
  'BANDUNG': [-6.9023, 107.6053],
  'POLYTRON': [-6.1256, 106.6749],
};

const markerIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAyNCAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiIGZpbGw9IiNEQzM1NDUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4=',
  iconSize: [24, 32],
  iconAnchor: [12, 32],
  popupAnchor: [0, -32],
});

export default function MapPreview({ location, lat, lng }: MapPreviewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const coords = lat && lng ? [lat, lng] : locationCoords[location] || [-7.0978, 110.3743];

  useEffect(() => {
    if (!mapRef.current) return;

    // Destroy existing map instance
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Create new map instance
    try {
      const map = L.map(mapRef.current, {
        center: [coords[0], coords[1]],
        zoom: 11,
        zoomControl: false,
        attributionControl: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

      L.marker([coords[0], coords[1]], { icon: markerIcon }).addTo(map);

      mapInstanceRef.current = map;

      // Ensure map resizes properly
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    } catch (error) {
      console.error('Failed to initialize map:', error);
    }

    // Cleanup on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [coords, location]);

  return <div ref={mapRef} style={{ width: '100%', height: '100%', minHeight: '96px' }} />;
}
