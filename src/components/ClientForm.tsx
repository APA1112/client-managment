import React from "react";

function ClientForm() {
  return (
    <form>
      <input
        type="text"
        name="name"
        autoFocus
        placeholder="Nombre"
        className="w-full px-4 py-2 text-black bg-white border rounded-md 
        focus:outline-none focus: ring-2 focus:ring-blue-400 my-2"
      />
      <input
        type="text"
        name="email"
        autoFocus
        placeholder="Email"
        className="w-full px-4 py-2 text-black bg-white border rounded-md 
        focus:outline-none focus: ring-2 focus:ring-blue-400 my-2"
      />
      <input
        type="text"
        name="number"
        autoFocus
        placeholder="Telefono"
        className="w-full px-4 py-2 text-black bg-white border rounded-md 
        focus:outline-none focus: ring-2 focus:ring-blue-400 my-2"
      />
      <button className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md 
      hover:bg-blue-700 focus:outline-none focus: ring-2 focus:ring-blue-400 my-2">
        Enviar
      </button>
    </form>
  );
}

export default ClientForm;
