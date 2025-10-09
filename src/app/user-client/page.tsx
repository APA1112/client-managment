import React from "react";
import ClientCard from "@/components/ClientsList";

async function loadClients() {
  const res = await fetch("http://localhost:3000/api/user-client");
  const data = await res.json();
  return data;
}
export default async function page() {
  const clients = await loadClients();
  console.log(clients);
  return (
    <div>
      <ClientCard clients={clients} />
    </div>
  );
}
