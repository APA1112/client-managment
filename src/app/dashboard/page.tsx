// app/page.tsx
"use client";

import React from "react"; // Ya no se necesita useState/useEffect
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import StatCard from "@/components/StatCard";
import ClientCountCard from "@/components/ClientCountCard"; // 👈 Nuevo componente
import { DollarSign, FolderKanban } from "lucide-react"; // Users ya no se necesita aquí
import { motion } from "framer-motion";
import SalesChart from "@/components/SalesChart";
import ProjectCountCard from "@/components/ProjectCountCard";

// La función loadClients YA NO es necesaria aquí

function Page() {
  // El manejo de estados y efectos de clientes YA NO es necesario aquí
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-auto">
        <Header />
        
        {/* Aquí la animación de Framer Motion se aplica al contenedor principal */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8 p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard name="Total sales" icon={DollarSign} value="$182,450" />
          
          {/* Esta tarjeta se renderiza con "Cargando..." y luego con el valor final */}
          <ClientCountCard /> 
          
          <ProjectCountCard />
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SalesChart />
        </div>
      </div>
    </div>
  );
}

export default Page;