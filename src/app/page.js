"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import HomePacient from "@/components/home-pacient";
import ChatBot from "@/components/chat/chat-bot";
import HomeDoctor from "@/components/home-doctor";
import useAuth from "@/hooks/useAuth";

export default function Home() {
  const { user, loading, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  //controle do tipo de usuario
  const [userPlatform, setUserPlatform] = useState("pacient");
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
  return (
    <div className="flex min-h-screen bg-gray-50">
      <ChatBot />
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        userPlatform={userPlatform}
      />
      <main className="flex-1 p-6">
        {userPlatform === "pacient" ? <HomePacient /> : <HomeDoctor />}
      </main>
    </div>
  );
}
