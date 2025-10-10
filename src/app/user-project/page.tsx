import React from "react";
import ClientCard from "@/components/ClientsList";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default async function page() {

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-auto">
        <Header />
      </div>
    </div>
  );
}
