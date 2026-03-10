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
  const now = new Date();
  const yy = String(now.getFullYear()).slice(2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const xxxx = String(Math.floor(Math.random() * 10000)).padStart(4, "0");
  const appointmentId = `AZT-${yy}${mm}${dd}-${xxxx}`;
  const doc = { ...body, appointmentId };
  const client = await clientPromise;
  await client.db(DB).collection(COL).insertOne(doc);
  return NextResponse.json({ ok: true, appointmentId }, { status: 201 });
}
