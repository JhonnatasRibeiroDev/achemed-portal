"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Home,
  Calendar,
  User,
  Heart,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  LogIn,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth"; // Importa o hook de autenticação

export function Sidebar({ isOpen, setIsOpen, userPlatform }) {
  const { user, logout } = useAuth(); // Pega o usuário autenticado
  const [isMinimized, setIsMinimized] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleMinimized = () => setIsMinimized(!isMinimized);

  //mostrar o tipo de user
  useEffect(() => {
    console.log("Tye", userPlatform);
    console.log("IsOpen", isOpen);
    console.log("IsMinimized", isMinimized);
  }, [userPlatform, isOpen, isMinimized]);

  //Gerenciar itens do Menu
  const pathname = usePathname();
  const [MenuItens, setMenuItens] = useState({});
  useEffect(() => {
    if (userPlatform === "pacient") {
      setMenuItens({
        home: {
          icon: <Home size={20} />,
          label: "Início",
          href: "/",
        },
        calendar: {
          icon: <Calendar size={20} />,
          label: "Consultas",
          href: "/consultas",
        },
        doctors: {
          icon: <User size={20} />,
          label: "Médicos",
          href: "/medicos",
        },
        favorites: {
          icon: <Heart size={20} />,
          label: "Favoritos",
          href: "/favoritos",
        },
        settings: {
          icon: <Settings size={20} />,
          label: "Configurações",
          href: "/configuracoes",
        },
        help: {
          icon: <HelpCircle size={20} />,
          label: "Ajuda",
          href: "/ajuda",
        },
      });
    }

    if (userPlatform === "doctor") {
      setMenuItens({
        home: {
          icon: <Home size={20} />,
          label: "Início",
          href: "/",
        },
        calendar: {
          icon: <Calendar size={20} />,
          label: "Consultas",
          href: "/consultas",
        },
        patients: {
          icon: <User size={20} />,
          label: "Pacientes",
          href: "/pacientes",
        },
        settings: {
          icon: <Settings size={20} />,
          label: "Configurações",
          href: "/configuracoes",
        },
        help: {
          icon: <HelpCircle size={20} />,
          label: "Ajuda",
          href: "/ajuda",
        },
      });
    }
  }, [userPlatform]);

  //para que a tela comece com menu aberto
  /*  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024 && window.innerWidth >= 768) {
        setIsMinimized(true);
      } else if (window.innerWidth >= 1024) {
        setIsMinimized(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); */

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden bg-white"
        onClick={toggleSidebar}>
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>

      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen bg-[#00468B] text-white transition-all duration-300 md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isMinimized ? "md:w-16" : "w-64"
        )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div
            className={cn(
              "p-4 border-b border-sky-500 flex items-center",
              isMinimized && "justify-center"
            )}>
            {isMinimized ? (
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-white text-sky-600">
                <User size={20} />
              </div>
            ) : (
              <h2 className="text-xl font-bold">
                <img
                  width={150}
                  src="https://achemed.com.br/wp-content/uploads/2025/01/Logo-Achemed.webp"
                />
              </h2>
            )}
          </div>

          {/* Navegação */}
          <nav className="flex-1 p-2">
            <ul className="space-y-1">
              {Object.entries(MenuItens).map(([key, item]) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <SidebarItem
                    key={key}
                    icon={item.icon}
                    label={item.label}
                    href={item.href}
                    active={isActive}
                    isMinimized={isMinimized}
                  />
                );
              })}
            </ul>
          </nav>

          {/* Rodapé */}
          <div className="p-2 border-t border-sky-500">
            {!isMinimized && (
              <>
                {user ? (
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white hover:bg-sky-700 mb-2"
                    onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-white hover:bg-sky-700 mb-2"
                      asChild>
                      <Link href="/login">
                        <LogIn className="mr-2 h-4 w-4" />
                        Entrar
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-white hover:bg-sky-700 mb-2"
                      asChild>
                      <Link href="/register">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Registrar
                      </Link>
                    </Button>
                  </>
                )}
              </>
            )}

            {isMinimized && (
              <>
                {!user ? (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-full flex justify-center text-white hover:bg-sky-700 mb-2"
                      asChild
                      title="Entrar">
                      <Link href="/login">
                        <LogIn size={20} />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-full flex justify-center text-white hover:bg-sky-700 mb-2"
                      asChild
                      title="Registrar">
                      <Link href="/registro">
                        <UserPlus size={20} />
                      </Link>
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-full flex justify-center text-white hover:bg-sky-700 mb-2"
                    title="Sair"
                    onClick={logout}>
                    <LogOut size={20} />
                  </Button>
                )}
              </>
            )}

            {/* Botão minimizar */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMinimized}
              className="hidden md:flex w-full justify-center text-white hover:bg-sky-700"
              title={isMinimized ? "Expandir" : "Minimizar"}>
              {isMinimized ? (
                <ChevronRight size={20} />
              ) : (
                <ChevronLeft size={20} />
              )}
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}

function SidebarItem({ icon, label, href, active, isMinimized }) {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          "flex items-center p-2 rounded-lg hover:bg-sky-700 transition-colors",
          active && "bg-sky-700",
          isMinimized ? "justify-center" : ""
        )}
        title={isMinimized ? label : ""}>
        <span className={isMinimized ? "" : "mr-3"}>{icon}</span>
        {!isMinimized && <span>{label}</span>}
      </Link>
    </li>
  );
}
