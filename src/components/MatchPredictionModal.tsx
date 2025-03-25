import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { X, TrendingUp, UserRound, Info } from "lucide-react";
import { Progress } from "./ui/progress";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

interface MatchPredictionProps {
  isOpen: boolean;
  isLoading: boolean;
  prediction: any;
  onClose: () => void;
}

const MatchPredictionModal: React.FC<MatchPredictionProps> = ({
  isOpen,
  isLoading,
  prediction,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Previsão do Jogo
          </DialogTitle>
          <DialogClose asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-4 p-2">
            <Skeleton className="h-6 w-3/4 mb-6" />
            <div className="flex justify-between gap-8">
              <div className="space-y-2 w-1/2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2 w-1/2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
            <Skeleton className="h-28 w-full mt-4" />
            <Skeleton className="h-20 w-full mt-4" />
          </div>
        ) : prediction ? (
          <>
            {/* Teams and Probabilities */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Home Team */}
              <div className="text-center space-y-2">
                <h3 className="font-semibold">{prediction.homeTeam.name}</h3>
                <div className="text-3xl font-bold">
                  {prediction.homeTeam.predictedScore}
                </div>
                <div className="text-sm text-gray-500">
                  Chance de vitória
                </div>
                <div className="flex items-center gap-1 justify-center">
                  <span className="font-semibold text-sm">
                    {prediction.homeTeam.winProbability}%
                  </span>
                </div>
                <Progress
                  value={prediction.homeTeam.winProbability}
                  className="h-2"
                />
              </div>

              {/* Away Team */}
              <div className="text-center space-y-2">
                <h3 className="font-semibold">{prediction.awayTeam.name}</h3>
                <div className="text-3xl font-bold">
                  {prediction.awayTeam.predictedScore}
                </div>
                <div className="text-sm text-gray-500">
                  Chance de vitória
                </div>
                <div className="flex items-center gap-1 justify-center">
                  <span className="font-semibold text-sm">
                    {prediction.awayTeam.winProbability}%
                  </span>
                </div>
                <Progress
                  value={prediction.awayTeam.winProbability}
                  className="h-2"
                />
              </div>
            </div>

            {/* Key Players */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <UserRound className="h-4 w-4" />
                Jogadores-Chave
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Home Team Players */}
                <div>
                  <h4 className="text-sm font-medium mb-2">
                    {prediction.homeTeam.name}
                  </h4>
                  <div className="space-y-2">
                    {prediction.homeTeam.keyPlayers.map((player: any, index: number) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-800 p-2 rounded">
                        <div className="font-medium text-sm">
                          {player.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {player.prediction}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Away Team Players */}
                <div>
                  <h4 className="text-sm font-medium mb-2">
                    {prediction.awayTeam.name}
                  </h4>
                  <div className="space-y-2">
                    {prediction.awayTeam.keyPlayers.map((player: any, index: number) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-800 p-2 rounded">
                        <div className="font-medium text-sm">
                          {player.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {player.prediction}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Insights */}
            <Card>
              <CardHeader className="pb-2">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Insights
                </h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {prediction.insights.map((insight: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5 shrink-0">
                        {index + 1}
                      </Badge>
                      <span className="text-sm">{insight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </>
        ) : (
          <div className="py-8 text-center">
            <p className="text-gray-500">
              Nenhuma previsão disponível para este jogo.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MatchPredictionModal; 