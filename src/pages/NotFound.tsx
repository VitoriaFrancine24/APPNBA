import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container mx-auto h-full py-16 flex flex-col items-center justify-center">
      <h1 className="text-8xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Página não encontrada</h2>
      <p className="text-muted-foreground text-center max-w-md mb-8">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Link to="/" className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
        Voltar para a página inicial
      </Link>
    </div>
  );
};

export default NotFound; 