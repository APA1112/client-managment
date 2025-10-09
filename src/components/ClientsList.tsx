import React from "react";

interface Client {
  id: number;
  name: string;
  email: string;
  number: string;
  projects: { id: number; name: string }[];
  payments: { id: number; amount: number; date: string }[];
}

function ClientCard({ clients }: { clients: Client[] }) {
  return (
    <div>
      {clients.map((client: any) => (
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
            {client.projects.map((project: any) => (
              <li key={project.id}>{project.name}</li>
            ))}
          </ul>
          <hr />
          <p>Pagos:</p>
          <ul>
            {client.payments.map((payment: any) => (
              <li key={payment.id}>
                Monto: {payment.amount} - Fecha:{" "}
                {new Date(payment.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ClientCard;
