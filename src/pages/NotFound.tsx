import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-4">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="text-2xl mt-4">Página não encontrada</h2>
      <p className="text-muted-foreground mt-2 max-w-md">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Link to="/" className="mt-8 inline-block px-4 py-2 rounded bg-primary text-primary-foreground">
        Voltar para o início
      </Link>
    </div>
  );
};

export default NotFound; 