import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Basketball } from 'lucide-react';

const Index = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col items-center justify-center space-y-8">
        <h1 className="text-4xl font-bold text-center">Bem-vindo ao HoopVision</h1>
        <p className="text-xl text-center text-muted-foreground">
          Análise e previsão de jogos de basquete com IA
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Basketball className="h-5 w-5" />
              Jogos de Hoje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Acompanhe os jogos em andamento e as previsões para hoje
            </p>
            <Button className="mt-4">Ver Jogos</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Basketball className="h-5 w-5" />
              Estatísticas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Análise detalhada de estatísticas e tendências
            </p>
            <Button className="mt-4">Ver Estatísticas</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Basketball className="h-5 w-5" />
              Previsões
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Previsões baseadas em IA para próximos jogos
            </p>
            <Button className="mt-4">Ver Previsões</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index; 