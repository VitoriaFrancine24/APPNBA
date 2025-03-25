
import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface Column {
  id: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  minWidth?: number;
}

interface StatsTableProps {
  title: string;
  columns: Column[];
  data: Record<string, any>[];
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  onSort?: (column: string) => void;
}

const StatsTable = ({ 
  title, 
  columns, 
  data, 
  sortBy, 
  sortOrder, 
  onSort 
}: StatsTableProps) => {
  
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-border">
        <h2 className="font-medium">{title}</h2>
      </div>
      
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50">
              {columns.map((column) => (
                <th 
                  key={column.id} 
                  className={`px-4 py-3 font-medium text-gray-600 text-${column.align || 'left'}`}
                  style={{ minWidth: column.minWidth || 'auto' }}
                  onClick={() => onSort && onSort(column.id)}
                >
                  <div className={`flex items-center ${column.align === 'center' ? 'justify-center' : column.align === 'right' ? 'justify-end' : 'justify-start'}`}>
                    {column.label}
                    {sortBy === column.id && (
                      <span className="ml-1">
                        {sortOrder === 'asc' ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr 
                key={index} 
                className="border-t border-border hover:bg-muted/20 transition-colors"
              >
                {columns.map((column) => (
                  <td 
                    key={column.id} 
                    className={`px-4 py-3 text-${column.align || 'left'}`}
                  >
                    {row[column.id]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatsTable;
