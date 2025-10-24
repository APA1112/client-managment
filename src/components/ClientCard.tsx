"use client";

import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Trash, Pencil } from "lucide-react";

interface ClientCardProps {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  onClientUpdated?: (updated: {
    id: string;
    name: string;
    email: string;
    number: string;
  }) => void;
  onDeleteSuccess?: (id: number) => void; // llamada al padre para actualizar estado local
}

const MySwal = withReactContent(Swal);

function ClientCard({
  id,
  name,
  email,
  phoneNumber,
  onClientUpdated,
  onDeleteSuccess,
}: ClientCardProps) {
  // Editar cliente
  const editClient = async () => {
    const result = await MySwal.fire({
      title: "Editar Cliente",
      html: `
        <input id="swal-input-name" class="swal2-input" placeholder="Nombre">
        <input id="swal-input-email" class="swal2-input" placeholder="Email">
        <input id="swal-input-phone" class="swal2-input" placeholder="Teléfono">
      `,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "Guardar cambios",
      cancelButtonText: "Cancelar",
      background: "#1e1e1e",
      color: "#e0e0e0",
      didOpen: () => {
        // Rellenar los inputs de forma segura una vez abierto el popup
        const popup = Swal.getPopup();
        if (!popup) return;
        const nameInput =
          popup.querySelector<HTMLInputElement>("#swal-input-name");
        const emailInput =
          popup.querySelector<HTMLInputElement>("#swal-input-email");
        const phoneInput =
          popup.querySelector<HTMLInputElement>("#swal-input-phone");
        if (nameInput) nameInput.value = name ?? "";
        if (emailInput) emailInput.value = email ?? "";
        if (phoneInput) phoneInput.value = phoneNumber ?? "";
      },
      preConfirm: () => {
        const popup = Swal.getPopup();
        if (!popup) return;

        const nameInput =
          popup.querySelector<HTMLInputElement>("#swal-input-name");
        const emailInput =
          popup.querySelector<HTMLInputElement>("#swal-input-email");
        const phoneInput =
          popup.querySelector<HTMLInputElement>("#swal-input-phone");

        const newName = nameInput?.value.trim() ?? "";
        const newEmail = emailInput?.value.trim() ?? "";
        const newPhone = phoneInput?.value.trim() ?? "";

        if (!newName || !newEmail || !newPhone) {
          Swal.showValidationMessage("Por favor, completa todos los campos");
          return;
        }

        return { newName, newEmail, newPhone };
      },
    });

    if (result.isConfirmed && result.value) {
      const { newName, newEmail, newPhone } = result.value as {
        newName: string;
        newEmail: string;
        newPhone: string;
      };

      try {
        const res = await fetch(`/api/user-client/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: Number(id),
            name: newName,
            email: newEmail,
            number: Number(newPhone),
          }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err?.error || "Error al actualizar el cliente");
        }

        const updatedClient = await res.json();

        await MySwal.fire({
          icon: "success",
          title: "Cliente actualizado",
          text: "La información del cliente se ha guardado correctamente.",
          background: "#1e1e1e",
          color: "#e0e0e0",
        });

        if (onClientUpdated) {
          onClientUpdated({
            id,
            name: updatedClient.name ?? newName,
            email: updatedClient.email ?? newEmail,
            number: updatedClient.number ?? newPhone,
          });
        }
      } catch (error) {
        console.error("Error updating client:", error);
        await MySwal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo actualizar el cliente.",
          background: "#1e1e1e",
          color: "#e0e0e0",
        });
      }
    }
  };

  // Eliminar cliente
  const deleteClient = async () => {
    const confirm = await MySwal.fire({
      title: "¿Eliminar cliente?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      background: "#1e1e1e",
      color: "#e0e0e0",
    });

    if (!confirm.isConfirmed) return;

    try {
      // El endpoint de eliminación usa /api/user-client/:id
      const res = await fetch(`/api/user-client/${id}`, { method: "DELETE" });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || "Error al eliminar");
      }

      await MySwal.fire({
        icon: "success",
        title: "Cliente eliminado",
        text: "El cliente se ha eliminado correctamente.",
        background: "#1e1e1e",
        color: "#e0e0e0",
      });

      if (onDeleteSuccess) onDeleteSuccess(Number(id));
    } catch (error) {
      console.error("Error deleting client:", error);
      await MySwal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo eliminar el cliente.",
        background: "#1e1e1e",
        color: "#e0e0e0",
      });
    }
  };

  return (
    <div className="bg-[#1e1e1e] backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-[#1f1f1f] text-gray-200 p-4 mx-auto flex flex-col gap-2 justify-between items-center w-full hover:border-gray-600 transition sm:flex-col lg:flex-row">
      <div>
        <p className="ml-2 pl-2 text-gray-300 font-bold">{name}</p>
        <p className="ml-2 pl-2 text-gray-300">{email}</p>
        <p className="ml-2 pl-2 text-gray-300">{phoneNumber}</p>
      </div>
      <div className="flex gap-4 items-center">
        <button
          className="cursor-pointer hover:text-red-300"
          onClick={deleteClient}
          aria-label="Eliminar cliente"
        >
          <Trash />
        </button>
        <button
          className="cursor-pointer hover:text-blue-300"
          onClick={editClient}
          aria-label="Editar cliente"
        >
          <Pencil />
        </button>
      </div>
    </div>
  );
}

export default ClientCard;
