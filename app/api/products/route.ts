import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const DB = "azerotech";
const COL = "products";

export async function GET() {
  const client = await clientPromise;
  const docs = await client
    .db(DB)
    .collection(COL)
    .find({})
    .sort({ id: 1 })
    .toArray();
  return NextResponse.json(docs);
}
