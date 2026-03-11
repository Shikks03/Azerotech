import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const DB = "azerotech";
const COL = "serviceRecords";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const client = await clientPromise;
  const docs = await client
    .db(DB)
    .collection(COL)
    .find({ customerId: id })
    .sort({ date: -1 })
    .toArray();
  return NextResponse.json(docs);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const { date, service, device, cost, notes } = body;
  if (!date || !service || !device) {
    return NextResponse.json({ error: "date, service, and device are required" }, { status: 400 });
  }
  const doc = {
    customerId: id,
    date,
    service,
    device,
    cost: Number(cost) || 0,
    notes: notes ?? "",
    createdAt: new Date().toISOString(),
  };
  const client = await clientPromise;
  const result = await client.db(DB).collection(COL).insertOne(doc);
  return NextResponse.json({ ok: true, recordId: result.insertedId.toString() }, { status: 201 });
}
