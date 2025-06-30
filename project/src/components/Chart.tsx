import React from 'react';

interface ChartProps {
  data: { label: string; value: number; color: string }[];
  title: string;
}

export const Chart: React.FC<ChartProps> = ({ data, title }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
      
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
              <span className="text-sm font-bold text-gray-900">{item.value}</span>
            </div>
            <div className="bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-700 ${item.color}`}
                style={{ 
                  width: `${(item.value / maxValue) * 100}%`,
                  animationDelay: `${index * 0.1}s`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};