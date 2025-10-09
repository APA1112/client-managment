import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Define el tipo para los parámetros de la ruta
interface Params {
  params: {
    id: string; // El ID siempre es un string en los parámetros de ruta
  };
}

// ✅ PUT: actualizar un cliente
export async function PUT(request: Request) {
  try {
    const { id, name, email, number } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "El ID es obligatorio" },
        { status: 400 }
      );
    }

    const updatedClient = await prisma.client.update({
      where: { id },
      data: { name, email, number },
    });

    return NextResponse.json(updatedClient);
  } catch (error) {
    console.error("Error updating client:", error);
    return NextResponse.json(
      { error: "Error al actualizar el cliente" },
      { status: 500 }
    );
  }
}

// ✅ DELETE: eliminar un cliente
export async function DELETE(request: Request, { params }: Params) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "El ID es obligatorio" },
        { status: 400 }
      );
    }
    // 2. CONVERTIR EL ID A NÚMERO (si tu esquema de Prisma es de tipo Int)
    // El ID de la URL es un string, pero Prisma probablemente espera un número.
    const numericId = Number(id);

    if (isNaN(numericId)) {
      return NextResponse.json({ error: "ID no válido" }, { status: 400 });
    }

    await prisma.client.delete({
      where: { id: numericId },
    });

    return NextResponse.json({ message: "Cliente eliminado correctamente" });
  } catch (error) {
    console.error("Error deleting client:", error);
    return NextResponse.json(
      { error: "Error al eliminar el cliente" },
      { status: 500 }
    );
  }
}
