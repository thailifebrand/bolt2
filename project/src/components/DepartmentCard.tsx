import React from 'react';
import { Users, FileText, Building2 } from 'lucide-react';

interface DepartmentCardProps {
  name: string;
  submissions: number;
  people: number;
  color: string;
  percentage: number;
}

export const DepartmentCard: React.FC<DepartmentCardProps> = ({
  name,
  submissions,
  people,
  color,
  percentage
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Building2 className="w-6 h-6 text-white" />
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Contribution</div>
          <div className="text-lg font-bold text-gray-900">{percentage}%</div>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-3">{name}</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">Submissions</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">{submissions}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">Contributors</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">{people}</span>
        </div>
        
        <div className="mt-4">
          <div className="bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${color.replace('bg-', 'bg-')}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};