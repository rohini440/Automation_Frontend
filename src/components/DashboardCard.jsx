import React from 'react';

const DashboardCard = ({ title, value, subtitle, icon: Icon, color = 'emerald' }) => {
  const colorMap = {
    emerald: {
      border: 'hover:border-emerald-500/20',
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-500',
      glow: 'bg-emerald-500/5'
    },
    blue: {
      border: 'hover:border-blue-500/20',
      bg: 'bg-blue-500/10',
      text: 'text-blue-500',
      glow: 'bg-blue-500/5'
    },
    purple: {
      border: 'hover:border-purple-500/20',
      bg: 'bg-purple-500/10',
      text: 'text-purple-500',
      glow: 'bg-purple-500/5'
    },
    amber: {
      border: 'hover:border-amber-500/20',
      bg: 'bg-amber-500/10',
      text: 'text-amber-500',
      glow: 'bg-amber-500/5'
    },
    red: {
      border: 'hover:border-red-500/20',
      bg: 'bg-red-500/10',
      text: 'text-red-500',
      glow: 'bg-red-500/5'
    }
  };

  const selectedColor = colorMap[color] || colorMap.emerald;

  return (
    <div className={`glass p-6 rounded-2xl flex items-center justify-between shadow-xl relative overflow-hidden group ${selectedColor.border} transition-all duration-300`}>
      <div className={`absolute top-0 right-0 h-24 w-24 rounded-full ${selectedColor.glow} blur-2xl pointer-events-none group-hover:scale-125 transition-transform`} />
      <div className="space-y-2">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{title}</span>
        <h4 className="text-3xl font-extrabold tracking-tight text-gray-100">{value}</h4>
        {subtitle && <p className="text-[10px] text-gray-500 font-medium">{subtitle}</p>}
      </div>
      <div className={`h-12 w-12 rounded-xl ${selectedColor.bg} flex items-center justify-center ${selectedColor.text}`}>
        {Icon && <Icon className="h-6 w-6" />}
      </div>
    </div>
  );
};

export default DashboardCard;
