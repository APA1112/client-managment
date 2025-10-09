import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET: obtener todos los estados de proyectos
export async function GET() {
  try {
    const statuses = await prisma.projectStatus.findMany()
    return NextResponse.json(statuses)
  } catch (error) {
    console.error('Error fetching project statuses:', error)
    return NextResponse.json({ error: 'Error al obtener los estados de proyecto' }, { status: 500 })
  }
}