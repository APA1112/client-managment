import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // -------------------------------------------------
  // 1. ProjectStatus
  // -------------------------------------------------
  await prisma.projectStatus.createMany({
    data: [
      { name: 'Solicitado' },
      { name: 'En proceso' },
      { name: 'Finalizado' },
    ],
    skipDuplicates: true,
  })

  // -------------------------------------------------
  // 2. PaymentStatus
  // -------------------------------------------------
  await prisma.paymentStatus.createMany({
    data: [
      { name: 'Pendiente' },
      { name: 'Pagado' },
    ],
    skipDuplicates: true,
  })

  // -------------------------------------------------
  // 3. Clients
  // -------------------------------------------------
  const clients = await prisma.client.createMany({
    data: [
      { name: 'Juan Pérez', email: 'juan.perez@example.com', number: 123456789 },
      { name: 'María López', email: 'maria.lopez@example.com', number: 987654321 },
      { name: 'Carlos Díaz', email: 'carlos.diaz@example.com', number: 555555555 },
    ],
    skipDuplicates: true,
  })

  // Obtener los status creados
  const [statusSolicitado, statusProceso, statusFinalizado] = await prisma.projectStatus.findMany()
  const [statusPendiente, statusPagado] = await prisma.paymentStatus.findMany()

  const allClients = await prisma.client.findMany()

  // -------------------------------------------------
  // 4. Projects
  // -------------------------------------------------
  const projects = await prisma.project.createMany({
    data: [
      {
        name: 'Página web corporativa',
        clientId: allClients[0].id,
        statusId: statusSolicitado.id,
      },
      {
        name: 'App móvil de gestión',
        clientId: allClients[1].id,
        statusId: statusProceso.id,
      },
      {
        name: 'Rediseño de branding',
        clientId: allClients[2].id,
        statusId: statusFinalizado.id,
      },
    ],
    skipDuplicates: true,
  })

  const allProjects = await prisma.project.findMany()

  // -------------------------------------------------
  // 5. Payments
  // -------------------------------------------------
  await prisma.payment.createMany({
    data: [
      {
        quantity: 500.00,
        clientId: allClients[0].id,
        projectId: allProjects[0].id,
        statusId: statusPendiente.id,
      },
      {
        quantity: 1200.00,
        clientId: allClients[1].id,
        projectId: allProjects[1].id,
        statusId: statusPagado.id,
      },
      {
        quantity: 800.00,
        clientId: allClients[2].id,
        projectId: allProjects[2].id,
        statusId: statusPagado.id,
      },
    ],
    skipDuplicates: true,
  })

  console.log('✅ Seed completado con todos los datos.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
