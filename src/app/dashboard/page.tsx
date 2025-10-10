"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import StatCard from "@/components/StatCard";
import { DollarSign, Users } from "lucide-react";
import { motion } from "framer-motion";

// 1. Define la interfaz para tipar los datos de tus clientes.
interface Client {
  id: string | number;
  name: string;
  // Añade cualquier otra propiedad que devuelva tu API
}

// Tipado del retorno de la función
async function loadClients(): Promise<Client[]> {
  const res = await fetch("http://localhost:3000/api/user-client", {
    cache: "no-store", //Deshabilitamos el cache para datos siempre frescos
  });

  if (!res.ok) {
    throw new Error(`Error al cargar clientes: ${res.statusText}`);
  }

  // Aseguramos que la respuesta es un array de Client
  const data = (await res.json()) as Client[]; 
  return data;
}

function Page() {
  // Tipado de los estados
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // El error puede ser un string (el mensaje) o null
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    async function getClients() {
      try {
        setIsLoading(true); 
        setError(null); // Limpiar errores anteriores
        const clientList = await loadClients();
        setClients(clientList); 
      } catch (err: any) { // Usamos 'any' para capturar cualquier tipo de error
        console.error("Fallo al obtener clientes:", err);
        setError(err.message || "Ocurrió un error desconocido."); 
      } finally {
        setIsLoading(false); 
      }
    }

    getClients();
  }, []);

  // Determinar el valor a mostrar:
  var clientCountValue: string = ""; // Valor por defecto

  if (isLoading) {
    clientCountValue = "Cargando...";
  } else if (error) {
    clientCountValue = "Error"; // O podrías usar "N/A"
  } else {
    // Si no está cargando y no hay error, muestra la cuenta (puede ser 0)
    clientCountValue = clients.length.toString();
  }
  
  // 4. Renderizado condicional de mensajes de estado
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center p-8">
          <svg 
            className="w-10 h-10 text-gray-600" // Clases de Tailwind para tamaño y color
            fill="currentColor" // Usa currentColor para que Tailwind pueda controlar el color
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z">
              <animateTransform 
                attributeName="transform" 
                type="rotate" 
                dur="0.75s" 
                values="0 12 12;360 12 12" 
                repeatCount="indefinite"
              />
            </path>
          </svg>
          <p className="ml-4 text-lg font-medium text-gray-500">Cargando datos...</p>
        </div>
      );
    }

    if (error) {
      return <p className="p-8 text-lg font-medium text-red-600 text-center">🛑 Error al cargar los datos: {error}</p>;
    }
    
    // Si no hay carga ni error, renderiza las tarjetas
    return (
      <motion.div
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8 p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <StatCard name="Total sales" icon={DollarSign} value="$182,450" />
        <StatCard 
          name="Total clients" 
          icon={Users} 
          value={clientCountValue} // Usamos el valor calculado
        />
        <StatCard name="Projects" icon={DollarSign} value="$182,450" />
        {/* Aquí podrías añadir más StatCards */}
      </motion.div>
    );
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-auto">
        <Header />
        {renderContent()} {/* Renderiza el contenido condicional */}
      </div>
    </div>
  );
}

export default Page;