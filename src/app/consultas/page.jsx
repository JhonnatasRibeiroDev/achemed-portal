"use client";
import { CalendarDays, Clock, MapPin, Pencil } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";

export default function AgendaSection({ appointments = [], onEdit }) {
  const hasAppointments = appointments.length > 0;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <Card className="shadow-sm border-none">
        <CardHeader>
          <CardTitle className="text-2xl text-sky-700">Minha Agenda</CardTitle>
        </CardHeader>
        <CardContent>
          {hasAppointments ? (
            <div className="grid gap-4">
              {appointments.map((item, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.doctorName} — {item.specialty}
                    </h3>
                    <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                      <CalendarDays size={16} /> {item.date}
                    </div>
                    <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                      <Clock size={16} /> {item.time}
                    </div>
                    <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                      <MapPin size={16} /> {item.location}
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 flex gap-2">
                    <Button className="bg-sky-600 hover:bg-sky-700 text-white">
                      Ver detalhes
                    </Button>
                    <Button
                      variant="outline"
                      className="text-sky-700 border-sky-600 hover:bg-sky-50"
                      onClick={() => onEdit?.(item)}>
                      <Pencil size={16} className="mr-2" /> Editar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">Nenhum agendamento encontrado.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
