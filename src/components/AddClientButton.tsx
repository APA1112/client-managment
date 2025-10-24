"use client";
import React from "react";
import { PlusCircle } from "lucide-react";
import Swal from "sweetalert2";

function AddClientButton() {
  const createClient = () => {
    Swal.fire({
      title: "Create Client",
      text: "Client creation form goes here.",
      confirmButtonText: "Submit",
      confirmButtonColor: "#00adb5",
      theme: "dark",
    });
  };
  return (
    <button
      className="flex gap-2 border mr-auto m-8 p-4 bg-[#1f1f1f] text-gray-300 font-bold border-[#1f1f1f] cursor-pointer rounded-xl mt-4 mb-4 hover:bg-[#313131]"
      onClick={createClient}
    >
      <PlusCircle /> Add Client
    </button>
  );
}

export default AddClientButton;
