import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Linkedin,  GithubIcon } from "lucide-react";
import ClientForm from "./ClientForm";

function Contact() {
  return (
    <section
      id="contact"
      className="container mx-auto px-6 md:px-12 lg:px-12 py-24"
    >
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-300 mb-4">
            Let's Connect
          </h2>
          <p className="text-gray-400 text-lg mb-6 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus quis ex ea velit. Consequuntur accusantium illo optio
            velit omnis vel incidunt laborum aliquam itaque dolores. Modi nulla
            id velit fugit!
          </p>
          <div className="flex gap-4">
            <Link href="https://www.linkedin.com/in/alejandro-paton/">
              <Linkedin className="hover:scale-110 transition-transform duration-300 cursor-pointer text-gray-300" />
            </Link>
            <Link href="https://github.com/APA1112">
              <GithubIcon className="hover:scale-110 transition-transform duration-300 cursor-pointer text-gray-300" />
            </Link>
          </div>
        </div>
        <div className="bg-[#1f1f1f] p-8 rounded-xl shadow-lg">
          <ClientForm />
        </div>
      </div>
    </section>
  );
}

export default Contact;
