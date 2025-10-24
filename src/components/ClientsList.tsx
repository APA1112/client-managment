"use client";

import React, { useState } from "react";
import ClientCard from "./ClientCard";
import { motion } from "framer-motion";

interface Client {
  id: number;
  name: string;
  email: string;
  number: string;
  projects: { id: number; name: string }[];
  payments: { id: number; amount: number; createdAt: string }[];
}

function ClientsList({ clients: initialClients }: { clients: Client[] }) {
  const [clientList, setClientList] = useState<Client[]>(initialClients);

  // Se llama desde ClientCard después de una edición exitosa
  const handleClientUpdated = (updated: { id: string | number; name: string; email: string; number: string }) => {
    setClientList((prev) =>
      prev.map((c) =>
        c.id === Number(updated.id)
          ? { ...c, name: updated.name, email: updated.email, number: updated.number }
          : c
      )
    );
  };

  // Se llama desde ClientCard después de una eliminación exitosa
  const handleDeleteSuccess = (id: number) => {
    setClientList((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <motion.div
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8 p-4 mx-4 lg:mx-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {clientList.map((client) => (
        <div key={client.id}>
          <ClientCard
            id={client.id.toString()}
            name={client.name}
            email={client.email}
            phoneNumber={client.number}
            onClientUpdated={handleClientUpdated}
            onDeleteSuccess={handleDeleteSuccess}
          />
        </div>
      ))}
      {clientList.length === 0 && (
        <p className="text-center mt-5 text-gray-400">No hay clientes para mostrar.</p>
      )}
    </motion.div>
  );
}

export default ClientsList;
