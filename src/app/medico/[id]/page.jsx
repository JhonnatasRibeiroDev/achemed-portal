"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Star,
  ThumbsUp,
  Award,
  MessageCircle,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

// Sample doctor data with points and metrics
const doctorsData = [
  {
    id: 1,
    name: "Dra. Ana Silva",
    specialty: "Cardiologia",
    rating: 4.8,
    reviews: 124,
    availability: "Disponível hoje",
    image:
      "https://static.vecteezy.com/system/resources/previews/020/911/730/non_2x/profile-icon-avatar-icon-user-icon-person-icon-free-png.png",
    location: "São Paulo, SP",
    bio: "Cardiologista com mais de 15 anos de experiência. Especialista em cardiologia intervencionista e doenças coronarianas.",
    points: 850,
    metrics: {
      punctuality: 98,
      responseTime: 6,
      positiveReviews: 97,
    },
    clinics: [
      {
        id: 1,
        name: "Clínica Cardio Saúde",
        address: "Av. Paulista, 1000, São Paulo, SP",
        phone: "(11) 3456-7890",
      },
      {
        id: 2,
        name: "Hospital São Luiz",
        address: "Rua Voluntários da Pátria, 2345, São Paulo, SP",
        phone: "(11) 2345-6789",
      },
    ],
    schedule: {
      "Segunda-feira": ["08:00", "09:00", "10:00", "14:00", "15:00", "16:00"],
      "Terça-feira": ["08:00", "09:00", "10:00", "14:00", "15:00", "16:00"],
      "Quarta-feira": ["14:00", "15:00", "16:00", "17:00"],
      "Quinta-feira": ["08:00", "09:00", "10:00", "11:00"],
      "Sexta-feira": ["14:00", "15:00", "16:00", "17:00"],
    },
    comments: [
      {
        id: 1,
        author: "Ricardo Oliveira",
        rating: 5,
        date: "15/03/2023",
        content:
          "Excelente profissional! Muito atenciosa e explicou tudo detalhadamente.",
        likes: 12,
      },
      {
        id: 2,
        author: "Mariana Santos",
        rating: 4,
        date: "02/02/2023",
        content:
          "Ótimo atendimento, mas tive que esperar um pouco além do horário marcado.",
        likes: 5,
      },
      {
        id: 3,
        author: "Carlos Eduardo",
        rating: 5,
        date: "10/01/2023",
        content: "Médica muito competente e cuidadosa. Recomendo fortemente!",
        likes: 8,
      },
    ],
  },
  // Outros médicos...
];

export default function DoctorPage() {
  const params = useParams();
  const doctorId = Number(params?.id);
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState("Segunda-feira");
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [activeTab, setActiveTab] = useState("agendar");

  // Find doctor by ID
  const doctor =
    doctorsData.find((doc) => doc.id === doctorId) || doctorsData[0];

  // Get available days
  const availableDays = Object.keys(doctor.schedule);

  // Função para determinar o nível do médico com base nos pontos
  const getDoctorLevel = (points) => {
    if (points >= 900) return "Diamante";
    if (points >= 700) return "Platina";
    if (points >= 500) return "Ouro";
    if (points >= 300) return "Prata";
    return "Bronze";
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main content - ajustado para se adaptar ao sidebar minimizado */}
      <main className="flex-1 p-4 md:p-6 md:ml-16 lg:ml-16 transition-all duration-300">
        <div className="container mx-auto max-w-5xl">
          {/* Back button */}
          <Button
            variant="ghost"
            className="mb-4 text-sky-600 hover:text-sky-700 hover:bg-sky-50 -ml-2"
            onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para resultados
          </Button>

          {/* Doctor profile header */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="flex-shrink-0">
              <img
                src={doctor.image || "/placeholder.svg"}
                alt={doctor.name}
                className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-sky-100"
              />
            </div>
            <div className="flex-grow">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold text-sky-700">
                  {doctor.name}
                </h1>
                {doctor.points && (
                  <Badge
                    variant="outline"
                    className="bg-sky-100 text-sky-700 border-sky-200">
                    <Award className="h-4 w-4 mr-1" />
                    {getDoctorLevel(doctor.points)} • {doctor.points} pontos
                  </Badge>
                )}
              </div>
              <p className="text-xl text-gray-600 mb-2">{doctor.specialty}</p>

              <div className="flex items-center mb-2">
                <div className="flex items-center mr-4">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-medium">{doctor.rating}</span>
                  <span className="text-gray-500 ml-1">
                    ({doctor.reviews} avaliações)
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 text-sky-500 mr-1" />
                  {doctor.location}
                </div>
              </div>

              <p className="text-gray-700 mb-4">{doctor.bio}</p>

              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200">
                  {doctor.availability}
                </Badge>

                {doctor.metrics && doctor.metrics.punctuality >= 90 && (
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200">
                    <Clock className="h-3 w-3 mr-1" />
                    {doctor.metrics.punctuality}% de pontualidade
                  </Badge>
                )}

                {doctor.metrics && doctor.metrics.responseTime <= 24 && (
                  <Badge
                    variant="outline"
                    className="bg-indigo-50 text-indigo-700 border-indigo-200">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    Responde em {doctor.metrics.responseTime}h
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Tabs for scheduling, reviews and points */}
          <Tabs
            defaultValue="agendar"
            value={activeTab}
            onValueChange={setActiveTab}
            className="mb-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="agendar">Agendar Consulta</TabsTrigger>
              <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
              <TabsTrigger value="pontos">Sistema de Pontos</TabsTrigger>
            </TabsList>

            {/* Scheduling tab */}
            <TabsContent value="agendar" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left column - Calendar */}
                <div className="md:col-span-2">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-sky-700 mb-4 flex items-center">
                        <Calendar className="mr-2 h-5 w-5" />
                        Horários Disponíveis
                      </h3>

                      {/* Day selection */}
                      <div className="flex overflow-x-auto pb-2 mb-4 gap-2">
                        {availableDays.map((day) => (
                          <Button
                            key={day}
                            variant={
                              selectedDay === day ? "default" : "outline"
                            }
                            className={
                              selectedDay === day
                                ? "bg-sky-600 hover:bg-sky-700"
                                : ""
                            }
                            onClick={() => {
                              setSelectedDay(day);
                              setSelectedTime(null);
                            }}>
                            {day}
                          </Button>
                        ))}
                      </div>

                      {/* Time slots */}
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-6">
                        {doctor.schedule[selectedDay].map((time) => (
                          <Button
                            key={time}
                            variant={
                              selectedTime === time ? "default" : "outline"
                            }
                            className={`flex items-center justify-center ${
                              selectedTime === time
                                ? "bg-sky-600 hover:bg-sky-700"
                                : ""
                            }`}
                            onClick={() => setSelectedTime(time)}>
                            <Clock className="mr-1 h-4 w-4" />
                            {time}
                          </Button>
                        ))}
                      </div>

                      {/* Clinic selection */}
                      <h3 className="text-lg font-semibold text-sky-700 mb-4 flex items-center">
                        <MapPin className="mr-2 h-5 w-5" />
                        Selecione a Clínica
                      </h3>

                      <div className="space-y-3 mb-6">
                        {doctor.clinics.map((clinic) => (
                          <div
                            key={clinic.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                              selectedClinic === clinic.id
                                ? "border-sky-500 bg-sky-50"
                                : "border-gray-200 hover:border-sky-300 hover:bg-sky-50/50"
                            }`}
                            onClick={() => setSelectedClinic(clinic.id)}>
                            <div className="font-medium">{clinic.name}</div>
                            <div className="text-sm text-gray-600">
                              {clinic.address}
                            </div>
                            <div className="text-sm text-gray-600">
                              {clinic.phone}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Confirm button */}
                      <Button
                        className="w-full bg-sky-600 hover:bg-sky-700"
                        disabled={!selectedTime || selectedClinic === null}>
                        Confirmar Agendamento
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Right column - Summary */}
                <div>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-sky-700 mb-4">
                        Resumo
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-gray-500">Médico</div>
                          <div className="font-medium">{doctor.name}</div>
                        </div>

                        <div>
                          <div className="text-sm text-gray-500">
                            Especialidade
                          </div>
                          <div>{doctor.specialty}</div>
                        </div>

                        {selectedDay && (
                          <div>
                            <div className="text-sm text-gray-500">Data</div>
                            <div>{selectedDay}</div>
                          </div>
                        )}

                        {selectedTime && (
                          <div>
                            <div className="text-sm text-gray-500">Horário</div>
                            <div>{selectedTime}</div>
                          </div>
                        )}

                        {selectedClinic !== null && (
                          <div>
                            <div className="text-sm text-gray-500">Local</div>
                            <div>
                              {
                                doctor.clinics.find(
                                  (c) => c.id === selectedClinic
                                )?.name
                              }
                            </div>
                            <div className="text-sm text-gray-600">
                              {
                                doctor.clinics.find(
                                  (c) => c.id === selectedClinic
                                )?.address
                              }
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Reviews tab */}
            <TabsContent value="avaliacoes" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-sky-700">
                      Avaliações dos Pacientes
                    </h3>
                    <div className="flex items-center">
                      <Star className="h-6 w-6 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-xl font-bold">{doctor.rating}</span>
                      <span className="text-gray-500 ml-1">
                        ({doctor.reviews})
                      </span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {doctor.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="border-b border-gray-100 pb-6 last:border-0">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarFallback>
                                {comment.author.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">
                                {comment.author}
                              </div>
                              <div className="text-sm text-gray-500">
                                {comment.date}
                              </div>
                            </div>
                          </div>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < comment.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 mb-2">{comment.content}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500 hover:text-sky-600">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          Útil ({comment.likes})
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Points system tab */}
            <TabsContent value="pontos" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-sky-700">
                      Sistema de Pontuação
                    </h3>
                    <Badge
                      variant="outline"
                      className="bg-sky-100 text-sky-700 border-sky-200">
                      <Award className="h-4 w-4 mr-1" />
                      {getDoctorLevel(doctor.points)} • {doctor.points} pontos
                    </Badge>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-2">
                        Como os pontos são acumulados
                      </h4>
                      <p className="text-gray-600 mb-4">
                        Os médicos acumulam pontos com base em três critérios
                        principais: avaliações positivas dos pacientes,
                        pontualidade nas consultas e tempo de resposta para
                        mensagens e solicitações.
                      </p>

                      <div className="space-y-4 mt-6">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center">
                              <Star className="h-5 w-5 text-yellow-500 mr-2" />
                              <span className="font-medium">
                                Avaliações Positivas
                              </span>
                            </div>
                            <span className="text-sm font-medium">
                              {doctor.metrics.positiveReviews}%
                            </span>
                          </div>
                          <Progress
                            value={doctor.metrics.positiveReviews}
                            className="h-2"
                          />
                          <p className="text-sm text-gray-500 mt-1">
                            Porcentagem de avaliações com 4 ou 5 estrelas
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center">
                              <Clock className="h-5 w-5 text-blue-500 mr-2" />
                              <span className="font-medium">Pontualidade</span>
                            </div>
                            <span className="text-sm font-medium">
                              {doctor.metrics.punctuality}%
                            </span>
                          </div>
                          <Progress
                            value={doctor.metrics.punctuality}
                            className="h-2"
                          />
                          <p className="text-sm text-gray-500 mt-1">
                            Porcentagem de consultas iniciadas no horário
                            marcado
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center">
                              <MessageCircle className="h-5 w-5 text-indigo-500 mr-2" />
                              <span className="font-medium">
                                Tempo de Resposta
                              </span>
                            </div>
                            <span className="text-sm font-medium">
                              {doctor.metrics.responseTime}h
                            </span>
                          </div>
                          <Progress
                            value={100 - doctor.metrics.responseTime * 4}
                            className="h-2"
                          />
                          <p className="text-sm text-gray-500 mt-1">
                            Tempo médio para responder mensagens e solicitações
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">
                        Níveis de Classificação
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center p-3 rounded-lg border border-purple-200 bg-purple-50">
                          <Award className="h-6 w-6 text-purple-600 mr-3" />
                          <div>
                            <div className="font-medium">Diamante</div>
                            <div className="text-sm text-gray-600">
                              900+ pontos
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center p-3 rounded-lg border border-indigo-200 bg-indigo-50">
                          <Award className="h-6 w-6 text-indigo-600 mr-3" />
                          <div>
                            <div className="font-medium">Platina</div>
                            <div className="text-sm text-gray-600">
                              700-899 pontos
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center p-3 rounded-lg border border-yellow-200 bg-yellow-50">
                          <Award className="h-6 w-6 text-yellow-600 mr-3" />
                          <div>
                            <div className="font-medium">Ouro</div>
                            <div className="text-sm text-gray-600">
                              500-699 pontos
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center p-3 rounded-lg border border-gray-200 bg-gray-50">
                          <Award className="h-6 w-6 text-gray-500 mr-3" />
                          <div>
                            <div className="font-medium">Prata</div>
                            <div className="text-sm text-gray-600">
                              300-499 pontos
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center p-3 rounded-lg border border-gray-200 bg-gray-50">
                          <Award className="h-6 w-6 text-gray-400 mr-3" />
                          <div>
                            <div className="font-medium">Bronze</div>
                            <div className="text-sm text-gray-600">
                              0-299 pontos
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">
                        Benefícios para Pacientes
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            Médicos com pontuação mais alta tendem a oferecer
                            melhor atendimento
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            Maior pontualidade e respeito ao seu tempo
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            Respostas mais rápidas para suas dúvidas e
                            necessidades
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
