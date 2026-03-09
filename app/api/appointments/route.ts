import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const DB = "azerotech";
const COL = "appointments";

export async function GET() {
  const client = await clientPromise;
  const docs = await client
    .db(DB)
    .collection(COL)
    .find({})
    .sort({ submittedAt: -1 })
    .toArray();
  return NextResponse.json(docs);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const client = await clientPromise;
  await client.db(DB).collection(COL).insertOne(body);
  return NextResponse.json({ ok: true }, { status: 201 });
}
