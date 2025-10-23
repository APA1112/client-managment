"use client";

import Image from "next/image";
import React from "react";
import profile from "../../public/profile.png";
import { TypeAnimation } from "react-type-animation";

function Hero() {
  return (
    <div className="w-11/12 max-w-3xl text-center mx-auto mt-32 flex flex-col items-center justify-center gap04">
      <div className="rounded-full bg-[#1f1f1f] w-[200px] h-[200px] relative">
        <Image
          src={profile}
          alt="profile image"
          className="rounded-full w-48 absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
        />
      </div>
      <h3 className="flex items-end gap-2 text-xl md:text-2xl mb-3 text-gray-300">
        ¡Hola! Soy Alejandro, un desarrollador web apasionado por crear
        soluciones
      </h3>
      <div className="text-3xl sm:text-6xl lg:text-[66px] font-bold text-gray-300">
        <TypeAnimation
          sequence={["FullStack Developer", 1500, "Data Analyst", 1500, "AI Enthusiast", 1500]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
        />
      </div>
      <p className="text-gray-500 max-w-2xl mx-auto">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis
        exercitationem corporis adipisci eaque nesciunt, aliquam vitae unde
        nostrum in asperiores tempora nihil veniam quae doloremque, voluptatibus
        est distinctio architecto cupiditate!
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
        <a
          href=""
          className="px-10 py-3 rounded-full border border-gray-300 bg-[#1f1f1f] text-gray-300 flex items-center gap-2"
        >
          Contact Me
        </a>
        <a
          href=""
          className="px-10 py-3 rounded-full border border-gray-300 bg-[#1f1f1f] text-gray-300 flex items-center gap-2"
        >
          My Resume
        </a>
      </div>
    </div>
  );
}

export default Hero;
