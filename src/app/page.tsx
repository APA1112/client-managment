import React from "react";
import ClientForm from "@/components/ClientForm";
import MainNavBar from "@/components/MainNavBar";

function HomePage() {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col flex-1 overflow-auto">
          <div className="flex flex-col flex-1 align-middle justify-center mb-8 px-4 text-center">
            <MainNavBar />
            <h1 className="text-4xl font-bold mb-4">¿Quieres tu propia web?</h1>
            <h2 className="text-2xl">Contactanos</h2>
          </div>
          <div className="bg-[#1f1f1f] rounded-2xl py-4 px-8">
            <ClientForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
