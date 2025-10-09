import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ✅ GET: obtener todos los proyectos
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        client: true,
        payments: true,
      },
    })
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json({ error: 'Error al obtener los proyectos' }, { status: 500 })
  }
}

// ✅ POST: crear un nuevo proyecto
export async function POST(request: Request) {
  try {
    const { name, clientId, statusId } = await request.json()

    if (!name) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
    }

    const newProject = await prisma.project.create({
      data: { name, clientId, statusId },
    })

    return NextResponse.json(newProject, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json({ error: 'Error al crear el proyecto' }, { status: 500 })
  }
}

// ✅ PUT: actualizar un proyecto
export async function PUT(request: Request) {
  try {
    const { id, name } = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'El ID es obligatorio' }, { status: 400 })
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: { name },
    })

    return NextResponse.json(updatedProject)
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json({ error: 'Error al actualizar el proyecto' }, { status: 500 })
  }
}

// ✅ DELETE: eliminar un proyecto
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'El ID es obligatorio' }, { status: 400 })
    }

    await prisma.project.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Proyecto eliminado correctamente' })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json({ error: 'Error al eliminar el proyecto' }, { status: 500 })
  }
}
