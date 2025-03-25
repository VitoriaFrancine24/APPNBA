import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <AlertTriangle className="h-20 w-20 text-muted-foreground mb-6" />
      <h1 className="text-4xl font-bold mb-4">Página não encontrada</h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-md">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Button asChild size="lg">
        <Link to="/">Voltar para a página inicial</Link>
      </Button>
    </div>
  );
};

export default NotFound; 