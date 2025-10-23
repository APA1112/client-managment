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
      className="flex flex-col space-y-6"
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
      <div>
        <label htmlFor="name" className="block text-gray-300 font-medium mb-2">
          Your name
        </label>
        <input
          type="text"
          name="name"
          autoFocus
          placeholder="Name"
          className="w-full p-3 rounded-lg bg-[#1f1f1f] border border-[#33353f]
          text-gray-300 placeholder-[#9ca2a9] focus:ring-2 focus:ring-[#00adb5] focus:outline-none transition-all duration-300"
          onChange={(e) =>
            setClient({ ...client, [e.target.name]: e.target.value })
          }
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-gray-300 font-medium mb-2">
          Your email
        </label>
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg bg-[#1f1f1f] border border-[#33353f]
          text-gray-300 placeholder-[#9ca2a9] focus:ring-2 focus:ring-[#00adb5] focus:outline-none transition-all duration-300"
          onChange={(e) =>
            setClient({ ...client, [e.target.name]: e.target.value })
          }
        />
      </div>
      <div>
        <label
          htmlFor="number"
          className="block text-gray-300 font-medium mb-2"
        >
          Your phone number
        </label>
        <input
          type="number"
          name="number"
          placeholder="Phone Number"
          className="w-full p-3 rounded-lg bg-[#1f1f1f] border border-[#33353f]
          text-gray-300 placeholder-[#9ca2a9] focus:ring-2 focus:ring-[#00adb5] focus:outline-none transition-all duration-300"
          onChange={(e) =>
            setClient({ ...client, [e.target.name]: e.target.value })
          }
        />
      </div>
      <button
        type="submit"
        className="w-full bg-[#00adb5] hover:bg-[#008188]
        text-gray-300 font-medium py-3 rounded-lg transition-all duration-300 cursor-pointer"
      >
        Send info
      </button>
    </form>
  );
}

export default ClientForm;
