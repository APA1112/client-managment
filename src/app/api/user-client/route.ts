import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ GET: obtener todos los clientes
export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      include: {
        projects: true,
        payments: true,
      },
    });
    return NextResponse.json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json(
      { error: "Error al obtener los clientes" },
      { status: 500 }
    );
  }
}

// ✅ POST: crear un nuevo cliente
export async function POST(request: Request) {
  try {
    const { name, email, number } = await request.json();

    if (!name || !email || !number) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }
    const newClient = await prisma.client.create({
      data: { name, email, number },
    });

    return NextResponse.json(newClient, { status: 201 });
  } catch (error) {
    console.error("Error creating client:", error);
    return NextResponse.json(
      { error: "Error al crear el cliente" },
      { status: 500 }
    );
  }
}
