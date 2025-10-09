"use client";

import React, { useState } from "react";

function ClientForm() {
  const [client, setClient] = useState({
    name: "",
    email: "",
    number: "",
  });

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        // CONVERSIÓN A NÚMERO
        const clientToSend = {
          ...client,
          number: Number(client.number), // Convierte el string a un número
        };

        const res = await fetch("/api/user-client", {
          method: "POST",
          body: JSON.stringify(clientToSend),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
      }}
    >
      <input
        type="text"
        name="name"
        autoFocus
        placeholder="Nombre"
        className="w-full px-4 py-2 text-black bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 my-2"
        onChange={(e) =>
          setClient({ ...client, [e.target.name]: e.target.value })
        }
      />
      <input
        type="text"
        name="email"
        placeholder="Email"
        className="w-full px-4 py-2 text-black bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 my-2"
        onChange={(e) =>
          setClient({ ...client, [e.target.name]: e.target.value })
        }
      />
      <input
        type="number"
        name="number"
        placeholder="Teléfono"
        className="w-full px-4 py-2 text-black bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 my-2"
        onChange={(e) =>
          setClient({ ...client, [e.target.name]: e.target.value })
        }
      />
      <button
        type="submit"
        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 my-2"
      >
        Enviar
      </button>
    </form>
  );
}

export default ClientForm;
