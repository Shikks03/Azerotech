import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const DB = "azerotech";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string; recordId: string }> }
) {
  const { recordId } = await params;
  const client = await clientPromise;

  let oid: ObjectId;
  try {
    oid = new ObjectId(recordId);
  } catch {
    return NextResponse.json({ error: "Invalid recordId" }, { status: 400 });
  }

  await client.db(DB).collection("serviceRecords").deleteOne({ _id: oid });
  return NextResponse.json({ ok: true });
}
