"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  Star,
  Bell,
  BarChartIcon as ChartBar,
  MessageSquare,
  User,
  FileText,
  LogOut,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/sidebar";
import useAuth from "@/hooks/useAuth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Dados de pacientes
const patientsData = [
  {
    id: 1,
    name: "João Silva",
    age: 45,
    lastVisit: "15/03/2025",
    nextAppointment: "22/04/2025",
    medicalRecord: "Hipertensão, Diabetes tipo 2",
    status: "Confirmado",
    time: "09:00",
    contact: "(11) 98765-4321",
    image: "https://ui-avatars.com/api/?name=João+Silva",
  },
  {
    id: 2,
    name: "Maria Oliveira",
    age: 32,
    lastVisit: "28/02/2025",
    nextAppointment: "22/04/2025",
    medicalRecord: "Enxaqueca crônica",
    status: "Confirmado",
    time: "10:30",
    contact: "(11) 91234-5678",
    image: "https://ui-avatars.com/api/?name=Maria+Oliveira",
  },
  {
    id: 3,
    name: "Antonio Pereira",
    age: 68,
    lastVisit: "05/04/2025",
    nextAppointment: "22/04/2025",
    medicalRecord: "Artrite, Pressão alta",
    status: "Aguardando confirmação",
    time: "14:00",
    contact: "(11) 97777-8888",
    image: "https://ui-avatars.com/api/?name=Antonio+Pereira",
  },
  {
    id: 4,
    name: "Camila Santos",
    age: 27,
    lastVisit: "10/02/2025",
    nextAppointment: "23/04/2025",
    medicalRecord: "Ansiedade",
    status: "Confirmado",
    time: "11:00",
    contact: "(11) 95555-4444",
    image: "https://ui-avatars.com/api/?name=Camila+Santos",
  },
  {
    id: 5,
    name: "Pedro Costa",
    age: 52,
    lastVisit: "22/03/2025",
    nextAppointment: "24/04/2025",
    medicalRecord: "Colesterol alto",
    status: "Confirmado",
    time: "09:30",
    contact: "(11) 92222-3333",
    image: "https://ui-avatars.com/api/?name=Pedro+Costa",
  },
  {
    id: 6,
    name: "Isabela Martins",
    age: 35,
    lastVisit: "18/04/2025",
    nextAppointment: "25/04/2025",
    medicalRecord: "Gravidez - 2º trimestre",
    status: "Aguardando confirmação",
    time: "15:30",
    contact: "(11) 96666-7777",
    image: "https://ui-avatars.com/api/?name=Isabela+Martins",
  },
];

// Dados de mensagens
const messagesData = [
  {
    id: 1,
    patient: "João Silva",
    subject: "Dúvida sobre medicação",
    preview: "Olá doutor, gostaria de saber se posso...",
    received: "Hoje, 10:23",
    read: false,
    image: "https://ui-avatars.com/api/?name=João+Silva",
  },
  {
    id: 2,
    patient: "Maria Oliveira",
    subject: "Resultados do exame",
    preview: "Doutor, recebi os resultados dos exames...",
    received: "Hoje, 08:45",
    read: true,
    image: "https://ui-avatars.com/api/?name=Maria+Oliveira",
  },
  {
    id: 3,
    patient: "Pedro Costa",
    subject: "Reagendamento",
    preview: "Preciso remarcar minha consulta do dia...",
    received: "Ontem, 16:30",
    read: true,
    image: "https://ui-avatars.com/api/?name=Pedro+Costa",
  },
  {
    id: 4,
    patient: "Isabela Martins",
    subject: "Sintomas persistentes",
    preview: "Estou continuando a sentir dores na...",
    received: "Ontem, 14:15",
    read: false,
    image: "https://ui-avatars.com/api/?name=Isabela+Martins",
  },
];

export default function DoctorHome() {
  const { user, loading, logout } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Todos");
  const [selectedDate, setSelectedDate] = useState("hoje");
  const [activeTab, setActiveTab] = useState("dashboard");

  // Filtra os pacientes com base na busca e status
  const filteredPatients = patientsData.filter((patient) => {
    return (
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedStatus === "Todos" || patient.status === selectedStatus)
    );
  });

  // Pacientes para hoje
  const todaysAppointments = patientsData.filter(
    (patient) => patient.nextAppointment === "22/04/2025"
  );

  // Obter pacientes de amanhã
  const tomorrowsAppointments = patientsData.filter(
    (patient) => patient.nextAppointment === "23/04/2025"
  );

  // Obter pacientes desta semana
  const thisWeeksAppointments = patientsData.filter(
    (patient) =>
      patient.nextAppointment === "22/04/2025" ||
      patient.nextAppointment === "23/04/2025" ||
      patient.nextAppointment === "24/04/2025" ||
      patient.nextAppointment === "25/04/2025"
  );

  // Filtra consultas com base na data selecionada
  const filteredAppointments =
    selectedDate === "hoje"
      ? todaysAppointments
      : selectedDate === "amanhã"
      ? tomorrowsAppointments
      : thisWeeksAppointments;

  // Mensagens não lidas
  const unreadMessages = messagesData.filter((message) => !message.read);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 p-4 md:p-6 transition-all duration-300">
        <div className="container mx-auto">
          <header className="sticky top-0 bg-white shadow z-30 p-4 flex justify-between items-center mb-6 rounded-lg">
            <h1 className="text-2xl font-bold text-sky-700">
              Portal Médico Achemed
            </h1>
            <div className="space-x-4 hidden md:flex items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="relative">
                      <Bell size={18} />
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        3
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Você tem 3 notificações</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="relative">
                      <MessageSquare size={18} />
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {unreadMessages.length}
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Você tem {unreadMessages.length} mensagens não lidas</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {user ? (
                <>
                  <Avatar>
                    <AvatarImage
                      src={
                        user.photoURL ||
                        `https://ui-avatars.com/api/?name=${
                          user.displayName || "/placeholder.svg"
                        }`
                      }
                      alt={user.displayName}
                    />
                    <AvatarFallback>
                      {user.displayName?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-gray-700">
                    Dr. {user.displayName}
                  </span>
                  <Button variant="outline" size="icon" onClick={logout}>
                    <LogOut size={18} />
                  </Button>
                </>
              ) : (
                <Button
                  className="bg-sky-600 text-white hover:bg-sky-700"
                  asChild>
                  <a href="/login">Entrar</a>
                </Button>
              )}
            </div>
          </header>

          <div className="mb-6">
            <Tabs
              defaultValue="dashboard"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full">
              <TabsList className="grid grid-cols-4 md:w-[600px]">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="appointments">Consultas</TabsTrigger>
                <TabsTrigger value="patients">Pacientes</TabsTrigger>
                <TabsTrigger value="messages">Mensagens</TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Consultas Hoje
                      </CardTitle>
                      <Calendar className="h-4 w-4 text-sky-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {todaysAppointments.length}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {
                          todaysAppointments.filter(
                            (p) => p.status === "Confirmado"
                          ).length
                        }{" "}
                        confirmadas
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Pacientes Ativos
                      </CardTitle>
                      <Users className="h-4 w-4 text-sky-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {patientsData.length}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        +2 novos este mês
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Mensagens
                      </CardTitle>
                      <MessageSquare className="h-4 w-4 text-sky-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {messagesData.length}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {unreadMessages.length} não lidas
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Avaliação
                      </CardTitle>
                      <Star className="h-4 w-4 text-sky-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">4.9 ★</div>
                      <p className="text-xs text-muted-foreground">
                        94 avaliações recebidas
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <Card className="col-span-1">
                    <CardHeader>
                      <CardTitle>Próximas Consultas</CardTitle>
                      <CardDescription>
                        Agenda para hoje, {todaysAppointments.length} pacientes
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {todaysAppointments.slice(0, 3).map((patient) => (
                          <div
                            key={patient.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage
                                  src={patient.image || "/placeholder.svg"}
                                  alt={patient.name}
                                />
                                <AvatarFallback>
                                  {patient.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{patient.name}</p>
                                <p className="text-sm text-gray-500">
                                  {patient.time} -{" "}
                                  {patient.medicalRecord.split(",")[0]}
                                </p>
                              </div>
                            </div>
                            <Badge
                              variant={
                                patient.status === "Confirmado"
                                  ? "default"
                                  : "secondary"
                              }
                              className={
                                patient.status === "Confirmado"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                              }>
                              {patient.status}
                            </Badge>
                          </div>
                        ))}
                        {todaysAppointments.length > 3 && (
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => setActiveTab("appointments")}>
                            Ver mais {todaysAppointments.length - 3} consultas
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="col-span-1">
                    <CardHeader>
                      <CardTitle>Mensagens Recentes</CardTitle>
                      <CardDescription>
                        {unreadMessages.length} mensagens não lidas
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {messagesData.slice(0, 3).map((message) => (
                          <div
                            key={message.id}
                            className={`flex items-start gap-3 p-3 rounded-lg ${
                              !message.read ? "bg-sky-50" : "bg-gray-50"
                            }`}>
                            <Avatar>
                              <AvatarImage
                                src={message.image || "/placeholder.svg"}
                                alt={message.patient}
                              />
                              <AvatarFallback>
                                {message.patient.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium">{message.patient}</p>
                                <p className="text-xs text-gray-500">
                                  {message.received}
                                </p>
                              </div>
                              <p className="text-sm font-medium">
                                {message.subject}
                              </p>
                              <p className="text-sm text-gray-500 truncate">
                                {message.preview}
                              </p>
                            </div>
                            {!message.read && (
                              <div className="w-2 h-2 rounded-full bg-sky-600 mt-1"></div>
                            )}
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => setActiveTab("messages")}>
                          Ver todas as mensagens
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Sua Performance</CardTitle>
                    <CardDescription>
                      Estatísticas dos últimos 30 dias
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-center">
                      <div className="bg-white border rounded-lg p-4">
                        <ChartBar className="mx-auto text-sky-600 mb-1" />
                        <p className="text-sm text-gray-500">
                          Consultas realizadas
                        </p>
                        <p className="text-xl font-bold text-sky-700">42</p>
                      </div>
                      <div className="bg-white border rounded-lg p-4">
                        <Clock className="mx-auto text-sky-600 mb-1" />
                        <p className="text-sm text-gray-500">Tempo médio</p>
                        <p className="text-xl font-bold text-sky-700">28 min</p>
                      </div>
                      <div className="bg-white border rounded-lg p-4">
                        <Star className="mx-auto text-sky-600 mb-1" />
                        <p className="text-sm text-gray-500">Satisfação</p>
                        <p className="text-xl font-bold text-sky-700">98%</p>
                      </div>
                      <div className="bg-white border rounded-lg p-4">
                        <Users className="mx-auto text-sky-600 mb-1" />
                        <p className="text-sm text-gray-500">Novos pacientes</p>
                        <p className="text-xl font-bold text-sky-700">8</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="appointments" className="mt-6">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <CardTitle>Agendamento de Consultas</CardTitle>
                      <div className="flex gap-2 mt-2 md:mt-0">
                        <Select
                          value={selectedDate}
                          onValueChange={setSelectedDate}>
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Quando" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hoje">Hoje</SelectItem>
                            <SelectItem value="amanhã">Amanhã</SelectItem>
                            <SelectItem value="semana">Esta semana</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select
                          value={selectedStatus}
                          onValueChange={setSelectedStatus}>
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Todos">Todos</SelectItem>
                            <SelectItem value="Confirmado">
                              Confirmados
                            </SelectItem>
                            <SelectItem value="Aguardando confirmação">
                              Aguardando
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredAppointments.length > 0 ? (
                        filteredAppointments.map((patient) => (
                          <div
                            key={patient.id}
                            className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                            <div className="flex items-center gap-4">
                              <Avatar className="h-10 w-10">
                                <AvatarImage
                                  src={patient.image || "/placeholder.svg"}
                                  alt={patient.name}
                                />
                                <AvatarFallback>
                                  {patient.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{patient.name}</h3>
                                <div className="text-sm text-gray-500">
                                  {patient.age} anos • {patient.contact}
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col mt-3 md:mt-0 md:items-end">
                              <div className="flex items-center gap-2 md:mb-1">
                                <Badge
                                  variant={
                                    patient.status === "Confirmado"
                                      ? "default"
                                      : "secondary"
                                  }
                                  className={
                                    patient.status === "Confirmado"
                                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                                      : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                  }>
                                  {patient.status}
                                </Badge>
                                <span className="text-sm font-medium">
                                  {patient.time}
                                </span>
                              </div>
                              <div className="flex gap-2 mt-2 md:mt-0">
                                <Button size="sm" variant="outline">
                                  <FileText className="h-4 w-4 mr-1" />
                                  Prontuário
                                </Button>
                                <Button size="sm">
                                  <User className="h-4 w-4 mr-1" />
                                  Atender
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-10">
                          <Calendar className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                          <p className="text-gray-500">
                            Nenhuma consulta encontrada para o período
                            selecionado.
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="patients" className="mt-6">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <CardTitle>Meus Pacientes</CardTitle>
                      <div className="relative mt-2 md:mt-0 md:w-64">
                        <Search
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                          size={18}
                        />
                        <Input
                          placeholder="Buscar paciente"
                          className="pl-10"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredPatients.length > 0 ? (
                        filteredPatients.map((patient) => (
                          <div
                            key={patient.id}
                            className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                            <div className="flex items-center gap-4">
                              <Avatar className="h-10 w-10">
                                <AvatarImage
                                  src={patient.image || "/placeholder.svg"}
                                  alt={patient.name}
                                />
                                <AvatarFallback>
                                  {patient.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{patient.name}</h3>
                                <div className="text-sm text-gray-500">
                                  {patient.age} anos • {patient.medicalRecord}
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col mt-3 md:mt-0">
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div>
                                  <span className="font-medium">
                                    Última consulta:
                                  </span>{" "}
                                  {patient.lastVisit}
                                </div>
                                <div>
                                  <span className="font-medium">Próxima:</span>{" "}
                                  {patient.nextAppointment}
                                </div>
                              </div>
                              <div className="flex gap-2 mt-2">
                                <Button size="sm" variant="outline">
                                  <FileText className="h-4 w-4 mr-1" />
                                  Histórico
                                </Button>
                                <Button size="sm">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  Agendar
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-10">
                          <Users className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                          <p className="text-gray-500">
                            Nenhum paciente encontrado com os critérios
                            selecionados.
                          </p>
                          <Button
                            variant="link"
                            className="text-sky-600 mt-2"
                            onClick={() => setSearchTerm("")}>
                            Limpar busca
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="messages" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Mensagens</CardTitle>
                    <CardDescription>
                      Gerencie suas comunicações com pacientes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {messagesData.map((message) => (
                        <div
                          key={message.id}
                          className={`flex items-start gap-4 p-4 rounded-lg border ${
                            !message.read ? "bg-sky-50 border-sky-100" : ""
                          }`}>
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={message.image || "/placeholder.svg"}
                              alt={message.patient}
                            />
                            <AvatarFallback>
                              {message.patient.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{message.patient}</h3>
                              <span className="text-xs text-gray-500">
                                {message.received}
                              </span>
                            </div>
                            <p className="font-medium text-sm mt-1">
                              {message.subject}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {message.preview}
                            </p>
                            <div className="flex gap-2 mt-3">
                              <Button size="sm" variant="outline">
                                {message.read
                                  ? "Marcar como não lido"
                                  : "Marcar como lido"}
                              </Button>
                              <Button size="sm">Responder</Button>
                            </div>
                          </div>
                          {!message.read && (
                            <div className="w-2 h-2 rounded-full bg-sky-600"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <footer className="mt-12 text-center text-sm text-gray-400 py-6">
            © {new Date().getFullYear()} Achemed. Todos os direitos reservados.
          </footer>
        </div>
      </main>
    </div>
  );
}
