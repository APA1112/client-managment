"use client";

import React, { useState, useEffect } from "react";
import StatCard from "@/components/StatCard";
import { FolderKanban, Users } from "lucide-react";

interface Project{
    id: string | number;
    name: string;
}

// Lógica de carga de proyectos
async function loadProjects(): Promise<Project[]> {
    const res = await fetch("http://localhost:3000/api/user-project");
    if (!res.ok) {
        throw new Error(`Error al cargar proyectos: ${res.statusText}`);
    }
    return (await res.json()) as Project[];
}

export default function ProjectCountCard() {
    const [clientCount, setClientCount] = useState<string>("Cargando...");
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        async function fetchCount() {
            try {
                const projectList = await loadProjects();
                setClientCount(projectList.length.toString());
                setError(false);
            } catch (err) {
                console.error("Fallo al obtener clientes:", err);
                setClientCount("Error");
                setError(true);
            }
        }
        fetchCount();
    }, []);

    // El SVG de carga que quieres usar (por simplicidad, usaremos un spinner de texto)
    // Para el SVG real, puedes crear un componente `LoadingSpinner` y usarlo aquí.
    const loadingValue = (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 animate-spin text-gray-600 mx-auto">
            <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z">
                <animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite"/>
            </path>
        </svg>
    );

    return (
        <StatCard 
            name="Total projects" 
            icon={FolderKanban} 
            value={clientCount === "Cargando..." ? loadingValue : clientCount} 
            // Opcional: Estilo de carga si deseas solo el nombre y el spinner
            className={clientCount === "Cargando..." ? "bg-gray-50 animate-pulse" : ""}
        />
    );
}