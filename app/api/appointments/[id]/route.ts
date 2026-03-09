import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const DB = "azerotech";
const COL = "appointments";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { status } = await req.json();
  const client = await clientPromise;
  await client.db(DB).collection(COL).updateOne({ id }, { $set: { status } });
  return NextResponse.json({ ok: true });
}
