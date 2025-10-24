"use client";

import React, { FC } from "react"; // Importa FC (Functional Component)
import { LucideIcon } from "lucide-react"; // Importa el tipo para el icono
import { motion } from "framer-motion";

// Define la estructura y el tipo de las propiedades
interface StatCardProps {
  name: string;
  icon: LucideIcon; // El icono es un componente de Lucide (o React Component)
  value: React.ReactNode; // El valor puede ser una cadena o un número
  className?: string; // Clase CSS opcional
}

// Usamos FC<StatCardProps> para tipar el componente
const StatCard: FC<StatCardProps> = ({ name, icon: Icon, value }) => {
  return (
    <div className="bg-[#1e1e1e] backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-[#1f1f1f]">
      <div className="px-4 py-5 sm:p-6">
        <span className="flex items-center text-sm font-medium text-gray-300">
          <Icon size={20} className="mr-2" />
          {name}
        </span>
        <p className="mt-1 text-3xl font-semibold text-white">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
