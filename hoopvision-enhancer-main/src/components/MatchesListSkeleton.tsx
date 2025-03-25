import React from "react";
import { Skeleton } from "./ui/skeleton";

interface MatchesListSkeletonProps {
  count?: number;
}

const MatchesListSkeleton: React.FC<MatchesListSkeletonProps> = ({ 
  count = 3
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="border rounded-lg p-4 bg-card">
          <div className="flex justify-between items-center mb-3">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
          
          <div className="flex justify-between items-center">
            {/* Home Team */}
            <div className="flex items-center">
              <Skeleton className="w-10 h-10 mr-2 rounded-full" />
              <Skeleton className="h-5 w-24" />
            </div>
            
            {/* Score */}
            <Skeleton className="h-6 w-12" />
            
            {/* Away Team */}
            <div className="flex items-center">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="w-10 h-10 ml-2 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchesListSkeleton; 