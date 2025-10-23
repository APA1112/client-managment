import React from "react";
import MainNavBar from "@/components/MainNavBar";
import Hero from "@/components/Hero";
import Contact from "@/components/Contact";

function HomePage() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen flex-col">
        <MainNavBar />
        <Hero />
        <Contact />
      </div>
    </>
  );
}

export default HomePage;
