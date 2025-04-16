"use client";

import { useState } from "react";
import {
  Search,
  Stethoscope,
  Users,
  Star,
  Calendar,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/sidebar";
import { DoctorCard } from "@/components/doctor-card";
import useAuth from "@/hooks/useAuth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Dados de médicos
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
    points: 850,
    metrics: { punctuality: 98, responseTime: 6, positiveReviews: 97 },
  },
  {
    id: 2,
    name: "Dr. Carlos Mendes",
    specialty: "Neurologia",
    rating: 4.7,
    reviews: 98,
    availability: "Próxima vaga: Amanhã",
    image:
      "https://static.vecteezy.com/system/resources/previews/020/911/730/non_2x/profile-icon-avatar-icon-user-icon-person-icon-free-png.png",
    location: "Rio de Janeiro, RJ",
    points: 720,
    metrics: { punctuality: 95, responseTime: 12, positiveReviews: 94 },
  },
  {
    id: 3,
    name: "Dra. Mariana Costa",
    specialty: "Dermatologia",
    rating: 4.9,
    reviews: 156,
    availability: "Disponível hoje",
    image:
      "https://static.vecteezy.com/system/resources/previews/020/911/730/non_2x/profile-icon-avatar-icon-user-icon-person-icon-free-png.png",
    location: "Belo Horizonte, MG",
    points: 950,
    metrics: { punctuality: 99, responseTime: 4, positiveReviews: 98 },
  },
  {
    id: 4,
    name: "Dr. Roberto Alves",
    specialty: "Ortopedia",
    rating: 4.6,
    reviews: 87,
    availability: "Próxima vaga: Sexta-feira",
    image:
      "https://static.vecteezy.com/system/resources/previews/020/911/730/non_2x/profile-icon-avatar-icon-user-icon-person-icon-free-png.png",
    location: "São Paulo, SP",
    points: 580,
    metrics: { punctuality: 92, responseTime: 18, positiveReviews: 91 },
  },
  {
    id: 5,
    name: "Dra. Juliana Freitas",
    specialty: "Ginecologia",
    rating: 4.8,
    reviews: 132,
    availability: "Disponível hoje",
    image:
      "https://static.vecteezy.com/system/resources/previews/020/911/730/non_2x/profile-icon-avatar-icon-user-icon-person-icon-free-png.png",
    location: "Curitiba, PR",
    points: 680,
    metrics: { punctuality: 94, responseTime: 10, positiveReviews: 95 },
  },
  {
    id: 6,
    name: "Dr. Fernando Santos",
    specialty: "Oftalmologia",
    rating: 4.7,
    reviews: 104,
    availability: "Próxima vaga: Quinta-feira",
    image:
      "https://static.vecteezy.com/system/resources/previews/020/911/730/non_2x/profile-icon-avatar-icon-user-icon-person-icon-free-png.png",
    location: "Brasília, DF",
    points: 420,
    metrics: { punctuality: 88, responseTime: 24, positiveReviews: 89 },
  },
];

const specialties = [
  "Todas especialidades",
  "Cardiologia",
  "Dermatologia",
  "Ginecologia",
  "Neurologia",
  "Oftalmologia",
  "Ortopedia",
  "Pediatria",
  "Psiquiatria",
];

export default function Home() {
  const { user, loading, logout } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState(
    "Todas especialidades"
  );
  const [locationSearch, setLocationSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-sky-700">
        <img
          src="https://achemed.com.br/wp-content/uploads/2025/01/Logo-Achemed.webp"
          alt="Carregando..."
          className="w-90 animate-pulse opacity-90"
        />
      </div>
    );
  }

  const filteredDoctors = doctorsData.filter((doctor) => {
    return (
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedSpecialty === "Todas especialidades" ||
        doctor.specialty === selectedSpecialty) &&
      (locationSearch === "" ||
        doctor.location.toLowerCase().includes(locationSearch.toLowerCase()))
    );
  });

  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "availability":
        return a.availability.includes("Disponível hoje") ? -1 : 1;
      case "points":
        return b.points - a.points;
      default:
        return 0;
    }
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main className="flex-1 p-4 md:p-6 md:ml-16 lg:ml-64 transition-all duration-300">
        <div className="container mx-auto">
          <header className="sticky top-0 bg-white shadow z-30 p-4 flex justify-between items-center mb-6 rounded-lg">
            <h1 className="text-2xl font-bold text-sky-700">Portal Achemed</h1>
            <div className="space-x-2 hidden md:flex items-center">
              {user ? (
                <>
                  <img
                    src={
                      user.photoURL ||
                      `https://ui-avatars.com/api/?name=${user.displayName}`
                    }
                    className="w-9 h-9 rounded-full"
                    alt={user.displayName}
                  />
                  <span className="font-medium text-gray-700">
                    {user.displayName}
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

          <section className="mb-8 bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-sky-700 mb-4">
              Buscar Médicos
            </h2>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1 relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  placeholder="Nome do médico"
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full md:w-64">
                <Select
                  value={selectedSpecialty}
                  onValueChange={setSelectedSpecialty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Especialidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialties.map((specialty) => (
                      <SelectItem key={specialty} value={specialty}>
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  placeholder="Localização (cidade, estado)"
                  className="pl-10"
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                />
              </div>
              <Button className="bg-sky-600 hover:bg-sky-700">Buscar</Button>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-sky-700">
                {filteredDoctors.length} Médicos encontrados
              </h2>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevância</SelectItem>
                  <SelectItem value="rating">Avaliação</SelectItem>
                  <SelectItem value="availability">Disponibilidade</SelectItem>
                  <SelectItem value="points">Pontuação</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
            {filteredDoctors.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  Nenhum médico encontrado com os critérios selecionados.
                </p>
                <Button
                  variant="link"
                  className="text-sky-600"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedSpecialty("Todas especialidades");
                  }}>
                  Limpar filtros
                </Button>
              </div>
            )}
          </section>

          <section className="bg-gradient-to-r from-sky-700 to-sky-900 text-white rounded-xl p-6 text-center mb-8">
            <h2 className="text-3xl font-bold mb-1">
              Conectando você aos melhores médicos
            </h2>
            <p className="text-lg text-white/80">
              Agende sua consulta com praticidade e segurança
            </p>
          </section>

          <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-center">
            <div className="bg-white shadow-md rounded-lg p-4">
              <Stethoscope className="mx-auto text-sky-600 mb-1" />
              <p className="text-sm text-gray-500">Médicos ativos</p>
              <p className="text-xl font-bold text-sky-700">+200</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <Calendar className="mx-auto text-sky-600 mb-1" />
              <p className="text-sm text-gray-500">Consultas realizadas</p>
              <p className="text-xl font-bold text-sky-700">+3.500</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <Star className="mx-auto text-sky-600 mb-1" />
              <p className="text-sm text-gray-500">Avaliação média</p>
              <p className="text-xl font-bold text-sky-700">4.8 ★</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <Users className="mx-auto text-sky-600 mb-1" />
              <p className="text-sm text-gray-500">Usuários ativos</p>
              <p className="text-xl font-bold text-sky-700">+1.200</p>
            </div>
          </section>

          <footer className="mt-12 text-center text-sm text-gray-400 py-6">
            © {new Date().getFullYear()} Achemed. Todos os direitos reservados.
          </footer>
        </div>
      </main>
    </div>
  );
}
