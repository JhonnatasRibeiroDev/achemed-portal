import { Star, Award, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function DoctorCard({ doctor }) {
  // Função para determinar a cor do badge de pontos com base na pontuação
  const getPointsBadgeColor = (points) => {
    if (points >= 900) return "bg-purple-100 text-purple-700 border-purple-200";
    if (points >= 700) return "bg-indigo-100 text-indigo-700 border-indigo-200";
    if (points >= 500) return "bg-blue-100 text-blue-700 border-blue-200";
    if (points >= 300) return "bg-sky-100 text-sky-700 border-sky-200";
    return "bg-gray-100 text-gray-700 border-gray-200";
  };

  // Função para determinar o nível do médico com base nos pontos
  const getDoctorLevel = (points) => {
    if (points >= 900) return "Diamante";
    if (points >= 700) return "Platina";
    if (points >= 500) return "Ouro";
    if (points >= 300) return "Prata";
    return "Bronze";
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex items-center gap-4">
            <img
              src={doctor.image || "/placeholder.svg"}
              alt={doctor.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-sky-100"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-lg">{doctor.name}</h3>
                {doctor.points && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge
                          variant="outline"
                          className={getPointsBadgeColor(doctor.points)}>
                          <Award className="h-3 w-3 mr-1" />
                          {getDoctorLevel(doctor.points)}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{doctor.points} pontos acumulados</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <p className="text-gray-500">{doctor.specialty}</p>
              <div className="flex items-center mt-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 text-sm font-medium">
                  {doctor.rating}
                </span>
                <span className="ml-1 text-sm text-gray-500">
                  ({doctor.reviews} avaliações)
                </span>
              </div>
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1 text-sky-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {doctor.location}
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200">
              {doctor.availability}
            </Badge>

            {doctor.metrics && (
              <>
                {doctor.metrics.punctuality >= 90 && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700 border-blue-200">
                          <Clock className="h-3 w-3 mr-1" />
                          Pontual
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{doctor.metrics.punctuality}% de pontualidade</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}

                {doctor.metrics.responseTime <= 24 && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge
                          variant="outline"
                          className="bg-indigo-50 text-indigo-700 border-indigo-200">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          Resposta rápida
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Responde em média em {doctor.metrics.responseTime}h
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0 gap-2">
        <Button variant="outline" className="flex-1" asChild>
          <Link href={`/medico/${doctor.id}`}>Ver perfil</Link>
        </Button>
        <Button className="flex-1 bg-sky-600 hover:bg-sky-700" asChild>
          <Link href={`/medico/${doctor.id}?tab=agendar`}>Agendar</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
