"use client"

import React, { useState } from "react"; // 👈 Importar useState
import { Trash, Pencil } from "lucide-react";

interface Client {
  id: number;
  name: string;
  email: string;
  number: string;
  projects: { id: number; name: string }[];
  payments: { id: number; amount: number; date: string }[];
}

// La función de eliminación ya no es independiente, ahora es parte del componente.
function ClientCard({ clients: initialClients }: { clients: Client[] }) {
  // 1. Usar useState para mantener la lista de clientes mutable
  const [clientList, setClientList] = useState<Client[]>(initialClients);

  // 2. Definir la función de eliminación dentro del componente
  const deleteClient = async (id: number) => {
    const numberId = Number(id);

    if (isNaN(numberId)) {
      console.error("El ID proporcionado no es un número válido");
      return;
    }

    try {
      // Usar ruta relativa para mejor portabilidad en Next.js
      const res = await fetch(`/api/user-client/${numberId}`, { 
        method: "DELETE",
      });

      if (res.ok) {
        // 3. ACTUALIZACIÓN DEL ESTADO: Filtrar el cliente eliminado
        setClientList(currentClients => 
          currentClients.filter(client => client.id !== numberId)
        );
        console.log(`Cliente con ID ${id} eliminado correctamente.`);
      } else {
        const errorData = await res.json();
        console.error("Error al eliminar el cliente:", errorData.error || res.statusText);
        // Opcional: mostrar un mensaje de error al usuario
      }
    } catch (error) {
      console.error("Fallo en la comunicación con la API:", error);
    }
  };

  // 4. Renderizar usando el estado `clientList`
  return (
    <div>
      {clientList.map((client) => (
        <div
          key={client.id}
          className="border p-4 my-2 rounded-2xl w-4/5 mx-auto bg-neutral-300 shadow-2xl"
        >
          <h1>ID: {client.id}</h1>
          <h2>Nombre: {client.name}</h2>
          <p>Correo: {client.email}</p>
          <p>Teléfono: {client.number}</p>
          <hr />
          <p>Proyectos:</p>
          <ul>
            {client.projects.map((project) => (
              <li key={project.id}>{project.name}</li>
            ))}
          </ul>
          <hr />
          <p>Pagos:</p>
          <ul>
            {client.payments.map((payment) => (
              <li key={payment.id}>
                Monto: {payment.amount} - Fecha: {new Date(payment.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
          <hr />
          {/* 6. Añadir botones para acciones */}
          <div className="flex gap-4 mt-2">
            {/* 5. Llamar a la función local */}
            <button onClick={() => deleteClient(client.id)}> 
              <Trash />
            </button>
            <button>
              <Pencil />
            </button>
          </div>
        </div>
      ))}
      {clientList.length === 0 && <p className="text-center mt-5">No hay clientes para mostrar.</p>}
    </div>
  );
}

export default ClientCard;