import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const DB = "azerotech";
const COL = "products";

const PRODUCTS = [
  {
    id: 1,
    name: "Samsung Fast Charger",
    price: "₱450",
    category: "Chargers",
    stock: 10,
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&h=400&fit=crop&auto=format&q=80",
  },
  {
    id: 2,
    name: "Type-C Data Cable",
    price: "₱250",
    category: "Cables",
    stock: 10,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&auto=format&q=80",
  },
  {
    id: 3,
    name: "32GB Memory Card",
    price: "₱350",
    category: "Memory",
    stock: 10,
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&h=400&fit=crop&auto=format&q=80",
  },
  {
    id: 4,
    name: "Wireless Earphones",
    price: "₱1,200",
    category: "Audio",
    stock: 10,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=400&fit=crop&auto=format&q=80",
  },
  {
    id: 5,
    name: "Mechanical Keyboard",
    price: "₱2,500",
    category: "Peripherals",
    stock: 10,
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&h=400&fit=crop&auto=format&q=80",
  },
  {
    id: 6,
    name: "USB Mouse",
    price: "₱450",
    category: "Peripherals",
    stock: 10,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=400&fit=crop&auto=format&q=80",
  },
  {
    id: 7,
    name: "Tempered Glass",
    price: "₱300",
    category: "Protection",
    stock: 10,
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&h=400&fit=crop&auto=format&q=80",
  },
  {
    id: 8,
    name: "iPhone Charger",
    price: "₱550",
    category: "Chargers",
    stock: 10,
    image: "https://images.unsplash.com/photo-1603189343302-e603f7add05a?w=600&h=400&fit=crop&auto=format&q=80",
  },
];

export async function GET() {
  const client = await clientPromise;
  const col = client.db(DB).collection(COL);
  const count = await col.countDocuments();
  if (count > 0) {
    return NextResponse.json({ message: `Already seeded (${count} products exist).` });
  }
  await col.insertMany(PRODUCTS);
  return NextResponse.json({ message: `Seeded ${PRODUCTS.length} products.` });
}
