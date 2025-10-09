import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Seed ProjectStatus
  await prisma.projectStatus.createMany({
    data: [
      { name: 'Solicitado' },
      { name: 'En proceso' },
      { name: 'Finalizado' },
    ],
    skipDuplicates: true,
  })

  // Seed PaymentStatus
  await prisma.paymentStatus.createMany({
    data: [
      { name: 'Pendiente' },
      { name: 'Pagado' },
    ],
    skipDuplicates: true,
  })

  console.log('✅ Seed completado')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
