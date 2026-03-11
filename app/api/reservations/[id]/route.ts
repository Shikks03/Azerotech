import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const DB = "azerotech";
const COL = "reservations";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const client = await clientPromise;
  const db = client.db(DB);

  const reservation = await db.collection(COL).findOne({ id });
  await db.collection(COL).updateOne({ id }, { $set: body });

  if (body.status && reservation && reservation.status !== body.status) {
    if (body.status === "Completed") {
      await db.collection("products").updateOne(
        { name: reservation.productName, stock: { $gt: 0 } },
        { $inc: { stock: -1 } }
      );
    } else if (reservation.status === "Completed") {
      await db.collection("products").updateOne(
        { name: reservation.productName },
        { $inc: { stock: 1 } }
      );
    }
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const client = await clientPromise;
  await client.db(DB).collection(COL).deleteOne({ id });
  return NextResponse.json({ ok: true });
}
