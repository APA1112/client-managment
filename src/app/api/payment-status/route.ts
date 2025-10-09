import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET: obtener todos los estados de pagos
export async function GET() {
  try {
    const statuses = await prisma.paymentStatus.findMany()
    return NextResponse.json(statuses)
  } catch (error) {
    console.error('Error fetching payment statuses:', error)
    return NextResponse.json({ error: 'Error al obtener los estados de pago' }, { status: 500 })
  }
}