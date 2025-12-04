import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database (ESM)...');

  try {
    await prisma.wishList.deleteMany();
    await prisma.shoppingList.deleteMany();
    await prisma.purchaseItem.deleteMany();
    await prisma.review.deleteMany();
    await prisma.receipt.deleteMany();
    await prisma.product.deleteMany();
    await prisma.customer.deleteMany();
    console.log('Existing data cleared (if any).');
  } catch {
    console.log('Note: cleanup may have partially failed or tables may be empty.');
  }

  await prisma.product.createMany({
    data: [
      {
        item_code: 'M-001',
        name: 'Classic Oxford Shirt',
        price: '45.00',
        cat_men: true,
        cat_women: false,
        cat_essential: false,
        sizes: ['S', 'M', 'L', 'XL'],
        image_url: '/images/men-shirt.jpg',
      },
      {
        item_code: 'W-001',
        name: 'Floral Dress',
        price: '65.50',
        cat_men: false,
        cat_women: true,
        cat_essential: false,
        sizes: ['XS', 'S', 'M'],
        image_url: '/images/women-dress.jpg',
      },
      {
        item_code: 'E-001',
        name: 'Insulated Water Bottle',
        price: '15.00',
        cat_men: false,
        cat_women: false,
        cat_essential: true,
        sizes: ['500ml', '1L'],
        image_url: '/images/water-bottle.jpg',
      },
    ],
  });

  await prisma.customer.create({
    data: {
      phone_number: '123-456-7890',
      name: 'New User',
    },
  });

  await prisma.customer.create({
    data: {
      phone_number: '987-654-3210',
      name: 'Loyal User',
      receipts: {
        create: [
          { receipt_number: 'REC-001', is_confirmed: true, delivery_location: 'Home' },
          { receipt_number: 'REC-002', is_confirmed: true, delivery_location: 'Home' },
          { receipt_number: 'REC-003', is_confirmed: true, delivery_location: 'Home' },
          { receipt_number: 'REC-004', is_confirmed: true, delivery_location: 'Home' },
          { receipt_number: 'REC-005', is_confirmed: true, delivery_location: 'Home' },
        ],
      },
    },
  });

  console.log('Products, customers, and receipts created.');
}

try {
  await main();
  console.log('Seeding finished.');
} catch (err) {
  console.error('Seed failed:', err);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}