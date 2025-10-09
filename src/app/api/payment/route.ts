import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET: obtener todos los pagos con cliente, proyecto y estado
export async function GET() {
  try {
    const payments = await prisma.payment.findMany({
      include: {
        client: true,
        project: true,
        status: true,
      },
    })
    return NextResponse.json(payments)
  } catch (error) {
    console.error('Error fetching payments:', error)
    return NextResponse.json({ error: 'Error al obtener los pagos' }, { status: 500 })
  }
}

// POST: crear un nuevo pago
export async function POST(request: Request) {
  try {
    const { clientId, projectId, statusId, quantity } = await request.json()

    if (!clientId || !projectId || !statusId || quantity == null) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
    }

    const newPayment = await prisma.payment.create({
      data: {
        clientId,
        projectId,
        statusId,
        quantity,
      },
    })

    return NextResponse.json(newPayment, { status: 201 })
  } catch (error) {
    console.error('Error creating payment:', error)
    return NextResponse.json({ error: 'Error al crear el pago' }, { status: 500 })
  }
}

// PUT: actualizar un pago
export async function PUT(request: Request) {
  try {
    const { id, clientId, projectId, statusId, quantity } = await request.json()

    if (!id) return NextResponse.json({ error: 'El ID es obligatorio' }, { status: 400 })

    const updatedPayment = await prisma.payment.update({
      where: { id },
      data: { clientId, projectId, statusId, quantity },
    })

    return NextResponse.json(updatedPayment)
  } catch (error) {
    console.error('Error updating payment:', error)
    return NextResponse.json({ error: 'Error al actualizar el pago' }, { status: 500 })
  }
}

// DELETE: eliminar un pago
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    if (!id) return NextResponse.json({ error: 'El ID es obligatorio' }, { status: 400 })

    await prisma.payment.delete({ where: { id } })
    return NextResponse.json({ message: 'Pago eliminado correctamente' })
  } catch (error) {
    console.error('Error deleting payment:', error)
    return NextResponse.json({ error: 'Error al eliminar el pago' }, { status: 500 })
  }
}
