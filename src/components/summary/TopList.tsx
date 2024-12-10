import React from "react";

interface TopListProps {
  items: Array<{
    name: string;
    count: number;
    label?: string;
  }>;
}

export const TopList: React.FC<TopListProps> = ({ items }) => {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={item.name} className="flex justify-between items-center">
          <span className="text-lg md:text-xl text-gray-700">
            {index + 1}. {item.name}
          </span>
          <p className="text-lg md:text-xl font-semibold text-[#E50914]">
            {item.count} {item.label || "vegades"}
          </p>
        </div>
      ))}
    </div>
  );
};
