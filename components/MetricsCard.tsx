'use client';

interface MetricsCardProps {
  label: string;
  value: string | number;
  change: string;
  isPositive?: boolean;
}

function MetricsCard({ label, value, change, isPositive = true }: MetricsCardProps) {
  return (
    <div className="rounded-lg p-6 shadow-sm" style={{ backgroundColor: '#F5E6E8' }}>
      <p className="text-sm font-medium mb-4" style={{ color: '#333333' }}>{label}</p>
      <div className="flex flex-col">
        <p className="text-4xl font-bold mb-3" style={{ color: '#000000' }}>{value}</p>
        <p className="text-sm font-medium" style={{ color: isPositive ? '#4CAF50' : '#DC3545' }}>
          {isPositive ? '+' : ''}{change}
        </p>
      </div>
    </div>
  );
}

export default MetricsCard;
