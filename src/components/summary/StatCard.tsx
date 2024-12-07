import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({ icon: Icon, title, children }) => {
  return (
    <div className="p-8 bg-gradient-to-br from-[#E50914]/10 to-[#831010]/10 rounded-lg 
                   border border-[#E50914]/20">
      <div className="flex items-center space-x-4 mb-6">
        <Icon className="w-8 h-8 text-[#E50914]" />
        <h3 className="text-xl md:text-2xl font-semibold text-gray-800">{title}</h3>
      </div>
      {children}
    </div>
  );
};