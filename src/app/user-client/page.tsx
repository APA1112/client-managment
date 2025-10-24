import React from "react";
import ClientCard from "@/components/ClientsList";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import AddClientButton from "@/components/AddClientButton";

async function loadClients() {
  const res = await fetch("http://localhost:3000/api/user-client");
  const data = await res.json();
  return data;
}
export default async function page() {
  const clients = await loadClients();
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-auto">
        <Header />
        <AddClientButton />
        <ClientCard clients={clients} />
      </div>
    </div>
  );
}
