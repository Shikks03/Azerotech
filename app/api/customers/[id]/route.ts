import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const DB = "azerotech";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const client = await clientPromise;
  const db = client.db(DB);

  let filter: object;
  try {
    filter = { _id: new ObjectId(id) };
  } catch {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const update: Record<string, unknown> = {};
  if (body.name !== undefined) update.name = body.name;
  if (body.phone !== undefined) update.phone = body.phone;
  // Dismiss all mismatch warnings
  if (body.dismissMismatches) update.nameMismatches = [];

  await db.collection("customers").updateOne(filter, { $set: update });
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const client = await clientPromise;
  const db = client.db(DB);

  let oid: ObjectId;
  try {
    oid = new ObjectId(id);
  } catch {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  // Delete the customer and their service records
  await db.collection("customers").deleteOne({ _id: oid });
  await db.collection("serviceRecords").deleteMany({ customerId: id });

  // Unlink appointments and reservations (set customerId to null)
  await db.collection("appointments").updateMany({ customerId: id }, { $unset: { customerId: "" } });
  await db.collection("reservations").updateMany({ customerId: id }, { $unset: { customerId: "" } });

  return NextResponse.json({ ok: true });
}
