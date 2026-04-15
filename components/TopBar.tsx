'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v2m0 16v2M4.22 4.22l1.41 1.41m10.74 10.74l1.41 1.41M1 12h2m16 0h2M4.22 19.78l1.41-1.41M17.63 6.63l1.41-1.41" />
  </svg>
);

function TopBar() {
  const pathname = usePathname();

  const getPageTitle = () => {
    const segments = pathname.split('/').filter(Boolean);
    
    const menuMap: Record<string, string> = {
      'dashboard': 'Dashboard',
      'customers': 'Customers',
      'administration': 'Administration',
      'orders': 'Orders',
      'do-management': 'DO Management',
      'invoice': 'Invoice',
      'vehicles': 'Vehicles',
      'drivers': 'Drivers',
      'assign': 'Assign Driver',
      'recap-uu': 'Recap UJ',
      'reports': 'Reports',
      'eta-monitoring': 'ETA Monitoring',
      'create': 'Create',
      'preview': 'Preview',
    };

    // Get the last meaningful segment
    for (let i = segments.length - 1; i >= 0; i--) {
      if (menuMap[segments[i]]) {
        return menuMap[segments[i]];
      }
    }

    return 'Dashboard';
  };

  return (
    <div className="border-b" style={{ backgroundColor: '#FFFFFF', borderColor: '#E0E0E0' }}>
      <div className="flex items-center justify-between px-8 py-6">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: '#000000' }}>{getPageTitle()}</h1>
        </div>
        <div className="flex items-center gap-6">
          <button className="p-2 rounded-lg transition-all hover:bg-gray-100" style={{ color: '#666666' }}>
            <BellIcon />
          </button>
          <button className="p-2 rounded-lg transition-all hover:bg-gray-100" style={{ color: '#666666' }}>
            <SettingsIcon />
          </button>
          <div className="w-10 h-10 rounded-full shadow-sm" style={{ backgroundColor: '#FFD700' }}></div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
