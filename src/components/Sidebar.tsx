"use client";

import React, { useEffect, useState } from "react";
import {
  Bell,
  DollarSign,
  House,
  Info,
  Mail,
  Menu,
  Settings,
  ShoppingBag,
  ShoppingCart, // 👈 Añadido: Para el elemento "Orders" de tu JSON
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LucideIcon } from "lucide-react"; // Tipo para los iconos

// 1. Objeto ICONS con todos los iconos necesarios
const ICONS = {
  House,
  DollarSign,
  Settings,
  ShoppingBag,
  ShoppingCart, // 👈 Añadido
  Mail,
  Users,
  Bell,
  Info,
};

// 2. Definición de tipos para mejorar la seguridad de TypeScript
// keyof typeof ICONS crea un tipo de unión: 'House' | 'DollarSign' | 'Settings' | ...
type IconKey = keyof typeof ICONS; 

// Interface para la estructura de cada elemento de la barra lateral
interface SidebarItem {
  name: string;
  icon: IconKey; // Asegura que solo se usen claves válidas de ICONS
  href: string;
}


function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // Tipamos el estado para que sea un array de SidebarItem
  const [sidebarItems, setSidebarItems] = useState<SidebarItem[]>([]); 
  const pathname = usePathname();

  useEffect(() => {
    // 3. Corrección de la ruta de fetch: se elimina 'public'
    fetch("/data/data.json") 
      .then((res) => {
        if (!res.ok) {
          console.error("Error: Archivo data.json no encontrado o error de red.");
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      // 4. Establecer el estado con los datos tipados
      .then((data) => setSidebarItems(data.sidebarItems as SidebarItem[]))
      .catch((error) => console.error("Error fetching sidebar data:", error));
  }, []);

  return (
    <div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="h-full bg-[#1e1e1e] backdrop-blur-md p-4 flex flex-col border-r border-[#2f2f2f]">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full text-gray-300 hover:bg-[#2f2f2f] transition-colors max-w-fit cursor-pointer"
        >
          <Menu />
        </button>
        <nav className="mt-8 flex-grow">
          {/* 5. Mapeo tipado: item ahora es de tipo SidebarItem */}
          {sidebarItems.map((item) => {
            // TypeScript ahora sabe que item.icon es una clave válida de ICONS
            const IconComponent = ICONS[item.icon] as LucideIcon; 

            // Estilos para la fila, añadiendo un flex para alinear
            const itemClasses = `flex items-center text-gray-300 hover:text-white 
                                 hover:bg-[#2f2f2f] p-2 rounded-lg transition-colors 
                                 my-1 ${pathname === item.href ? "bg-[#3a3a3a] text-white" : ""}`;

            return (
              <Link key={item.name} href={item.href}>
                <div className={itemClasses}>
                  <IconComponent size={20} style={{ minWidth: "20px" }} />
                  {/* El texto se oculta si la barra lateral está cerrada */}
                  <span 
                    className={`ml-4 whitespace-nowrap overflow-hidden transition-opacity duration-300
                               ${isSidebarOpen ? "opacity-100" : "opacity-0 w-0"}`}
                  >
                    {item.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;