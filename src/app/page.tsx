import React from "react";
import ClientForm from "@/components/ClientForm";

function HomePage() {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div>
          Bienvenidos
          <ClientForm />
        </div>
      </div>
    </>
  );
}

export default HomePage;
