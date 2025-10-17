"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

// Definición de tipos para la estructura del JSON
interface SidebarItem {
  name: string;
  icon: string; // No necesitamos el tipo IconKey aquí, solo el string
  href: string;
}

/**
 * Función para obtener el título de la página buscando en los datos del sidebar.
 * @param pathname La ruta actual (ej. "/user-project").
 * @param items Los elementos cargados del JSON.
 * @returns El nombre de la página (ej. "Projects") o "Not Found".
 */
const getPageTitle = (pathname: string, items: SidebarItem[]): string => {
  // 1. Manejar la ruta raíz /
  // Si tu Dashboard está en "/", cámbialo a "/" aquí. Si está en "/dashboard",
  // la búsqueda en 'items' debería manejarlo.
  if (pathname === "/") {
    // Asumiendo que la ruta principal es el Dashboard
    return "Dashboard"; 
  }
  
  // 2. Buscar una coincidencia exacta de 'href'
  const matchingItem = items.find(item => item.href === pathname);
  
  if (matchingItem) {
    return matchingItem.name;
  }

  // 3. Fallback: Si no coincide con ninguna ruta, intentar formatear el primer segmento
  // Esto es útil para rutas anidadas (ej. /user-project/detail)
  const segments = pathname.substring(1).split('/');
  const primarySegment = segments[0];

  // Buscar coincidencia parcial (ej. si /user-project/new coincide con /user-project)
  const partialMatch = items.find(item => item.href.substring(1) === primarySegment);
  
  if (partialMatch) {
      return partialMatch.name;
  }


  // 4. Si no se encuentra nada
  // Opcional: podrías devolver el segmento formateado si no está en el JSON
  return primarySegment 
    ? primarySegment.charAt(0).toUpperCase() + primarySegment.slice(1).toLowerCase()
    : "Página";
};


function Header() {
  const pathname = usePathname();
  const [sidebarItems, setSidebarItems] = useState<SidebarItem[]>([]);
  const [pageTitle, setPageTitle] = useState(""); // Estado para el título

  // 1. Cargar los datos del JSON al montar el componente
  useEffect(() => {
    fetch("/data/data.json") 
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        // Asume que el JSON tiene una clave 'sidebarItems'
        setSidebarItems(data.sidebarItems as SidebarItem[]);
      })
      .catch((error) => console.error("Error fetching sidebar data in Header:", error));
  }, []); // El array vacío asegura que se ejecute solo una vez al montar

  // 2. Recalcular el título cada vez que cambie la ruta (pathname) o los datos se carguen
  useEffect(() => {
    if (sidebarItems.length > 0) {
      const newTitle = getPageTitle(pathname, sidebarItems);
      setPageTitle(newTitle);
    } else if (pathname === "/") {
        // Fallback rápido para la ruta raíz si los datos aún no cargan
        setPageTitle("Dashboard");
    }
  }, [pathname, sidebarItems]);


  return (
    <header className="bg-[#1e1e1e] shadow-lg border-b border-[#1f1f1f] mx-4 sm:mx-6 lg:mx-8 mt-4 mb-2 rounded-lg ">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 flex items-center justify-between">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-100">
          {pageTitle}
        </h1>

        <div className="flex items-center space-x-3 sm:space-x-6">
            {/* ... Elementos adicionales del Header */}
        </div>
      </div>
    </header>
  );
}

export default Header;