import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request:Request) {
    try {
        const body = await request.json();
        const { phone } = body;

        if (!phone) {
            return NextResponse.json({ error: 'Phone number required' }, { status: 400 });
        }

        // 1. Find Customer & Count Receipts
        // We look up the customer by phone number

        const customer = await prisma.customer.findUnique({
            where: { phone_number: phone },
            include: {
                _count: {
                    select: { receipts: true },
                },
            },
        });

        if (!customer) {
            // if new user, return 0 receipts (Locked state)
            return NextResponse.json({ exists: false,
                receipts: 0,
                name: null,
            });
        }

        // 2. Return Use Stats
        return NextResponse.json({
            exists: true,
            receipts: customer._count.receipts,
            name: customer.name,
        });
    }   
    
    catch (error) {
        return NextResponse.json({ error:'Identification failed' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    // 1. Get the URL search params (e.g., ?category=men)
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category"); // 'men', 'women', or 'essentials'

    try {
        let whereClause = {};

        // 2. Filter logic based on which button was clicked
        // Matches the "Item submission" fields
        if (category === 'men') {
            whereClause = { cat_men: true };
        } else if (category === 'women') {
            whereClause = { cat_women: true };
        } else if (category === 'essentials') {
            whereClause = { cat_essentials: true };
        }

        // 3. Fetch from Database
        const products = await prisma.product.findMany({
            where: whereClause,
            select: {
                id: true,
                item_code: true,
                name: true,
                image_url: true,
                sizes: true,
            },
        });

        // 4. Return JSON
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}