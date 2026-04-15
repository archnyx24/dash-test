'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const DashboardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const CustomersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const AdministrationIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="12" y1="19" x2="12" y2="19" />
  </svg>
);

const VehiclesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="9" width="20" height="8" rx="2" ry="2" />
    <path d="M6 9a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2" />
    <path d="M22 9a2 2 0 0 0-2-2h-0a2 2 0 0 0-2 2" />
    <circle cx="6" cy="20" r="2" />
    <circle cx="18" cy="20" r="2" />
    <path d="M9 9v3" />
    <path d="M15 9v3" />
  </svg>
);

const DriversIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const ReportsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="2" x2="12" y2="22" />
    <path d="M17 5H9.5a1.5 1.5 0 0 0-1.5 1.5v12a1.5 1.5 0 0 0 1.5 1.5H17" />
    <path d="M6 12h2" />
    <path d="M6 16h2" />
    <path d="M6 8h2" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [expandedItems, setExpandedItems] = React.useState<string[]>(['admin']);

  const navigationItems = [
    { id: 'dashboard', icon: DashboardIcon, label: 'Dashboard', href: '/dashboard', submenus: [] },
    { id: 'customers', icon: CustomersIcon, label: 'Customers', href: '/dashboard/customers', submenus: [] },
    { 
      id: 'admin', 
      icon: AdministrationIcon, 
      label: 'Administration', 
      href: '/dashboard/administration',
      submenus: [
        { label: 'Orders List', href: '/dashboard/administration/orders' },
        { label: 'DO Management', href: '/dashboard/administration/do-management' },
        { label: 'Invoice', href: '/dashboard/administration/invoice' },
      ]
    },
    { id: 'vehicles', icon: VehiclesIcon, label: 'Vehicles', href: '/dashboard/vehicles', submenus: [] },
    { 
      id: 'drivers', 
      icon: DriversIcon, 
      label: 'Drivers', 
      href: '/dashboard/drivers',
      submenus: [
        { label: 'Assign Driver', href: '/dashboard/drivers/assign' },
        { label: 'Recap UJ', href: '/dashboard/drivers/recap-uj' },
      ]
    },
    { id: 'reports', icon: ReportsIcon, label: 'Reports', href: '/dashboard/reports', submenus: [] },
  ];

  // Auto-expand parent if submenu is active
  React.useEffect(() => {
    navigationItems.forEach(item => {
      const isSubActive = item.submenus.some(sub => pathname.startsWith(sub.href));
      if (isSubActive && !expandedItems.includes(item.id)) {
        setExpandedItems(prev => [...prev, item.id]);
      }
    });
  }, [pathname]);

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <aside className="w-56 flex flex-col min-h-screen fixed left-0 top-0" style={{ backgroundColor: '#800000' }}>
      {/* Header/Logo */}
      <div className="p-4">
        <div className="flex items-center gap-3">
          <Image 
            src="/wajira-logo.png" 
            alt="Wajira Logo"
            width={48}
            height={48}
            className="flex-shrink-0"
          />
          <h1 className="text-sm font-bold text-white whitespace-nowrap">WAJIRA CORPS</h1>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-0 py-2 space-y-1 overflow-y-auto">
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          const isExpanded = expandedItems.includes(item.id);
          const hasSubmenu = item.submenus.length > 0;

          return (
            <div key={item.id}>
              {(() => {
                const isItemActive = item.href === '/dashboard' ? pathname === item.href : pathname.startsWith(item.href);
                const isSubItemActive = item.submenus.some(sub => pathname.startsWith(sub.href));
                const isActive = isItemActive || isSubItemActive;

                return (
                  <Link
                    href={hasSubmenu ? '#' : item.href}
                    onClick={(e) => {
                      if (hasSubmenu) {
                        e.preventDefault();
                        // Expand the menu
                        if (!isExpanded) {
                          setExpandedItems(prev => [...prev, item.id]);
                        }
                        // Navigate to first submenu
                        router.push(item.submenus[0].href);
                      }
                    }}
                    className={`flex items-center gap-3 px-4 py-3 transition-all ${
                      isActive ? 'border-l-4' : 'border-l-4 border-l-transparent'
                    }`}
                    style={{
                      borderLeftColor: isActive ? '#FFD700' : 'transparent',
                      backgroundColor: isActive ? '#6B1F1F' : 'transparent',
                      color: isActive ? '#FFD700' : '#FFFFFF',
                    }}
                  >
                    <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                      <IconComponent />
                    </span>
                    <span className="font-medium flex-1">{item.label}</span>
                    {hasSubmenu && (
                      <span className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                        <ChevronDownIcon />
                      </span>
                    )}
                  </Link>
                );
              })()}

              {/* Submenus */}
              {hasSubmenu && isExpanded && (
                <div className="bg-[#6B1F1F]/50 py-1 transition-all">
                  {item.submenus.map((sub, idx) => {
                    const isSubActive = pathname.startsWith(sub.href);
                    return (
                      <Link
                        key={idx}
                        href={sub.href}
                        className={`block pl-12 pr-4 py-2 text-sm transition-colors ${
                          isSubActive ? 'text-[#FFD700] font-bold' : 'text-[#E0E0E0] hover:text-white'
                        }`}
                      >
                        {sub.label}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Admin User */}
      <div className="p-4">
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all hover:opacity-80">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-black flex-shrink-0" style={{ backgroundColor: '#FFD700' }}>
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white">Admin User</p>
            <p className="text-xs truncate" style={{ color: '#E0E0E0' }}>admin@wajira.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
