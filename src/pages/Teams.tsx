import React from "react";
import { Link } from "react-router-dom";
import { Basketball } from "lucide-react";

const Teams = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Times</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Lista de times simulada */}
        {[1, 2, 3, 4, 5, 6].map((team) => (
          <div key={team} className="border rounded-lg p-6 hover:bg-accent transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Basketball className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Time {team}</h3>
                <p className="text-sm text-muted-foreground">Conferência Leste</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Vitórias</span>
                <span className="font-medium">32</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Derrotas</span>
                <span className="font-medium">18</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Aproveitamento</span>
                <span className="font-medium">64%</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <Link to={`/teams/${team}`} className="text-primary hover:underline">
                Ver detalhes
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams; 