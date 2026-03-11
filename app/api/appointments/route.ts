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

  const client = await clientPromise;
  const db = client.db(DB);

  // Find or create customer
  const phone = body.phone;
  const submittedName: string = body.name ?? "";
  let customerId: string | undefined;

  if (phone) {
    const existing = await db.collection("customers").findOne({ phone });
    if (existing) {
      customerId = existing._id.toString();
      // Check name mismatch (case-insensitive)
      if (submittedName.trim().toLowerCase() !== (existing.name as string).trim().toLowerCase()) {
        await db.collection("customers").updateOne(
          { _id: existing._id },
          {
            $push: {
              nameMismatches: {
                submittedName: submittedName.trim(),
                date: now.toISOString(),
              },
            } as never,
          }
        );
      }
    } else {
      // Create new customer
      const result = await db.collection("customers").insertOne({
        name: submittedName.trim(),
        phone,
        type: "appointment",
        nameMismatches: [],
        createdAt: now.toISOString(),
      });
      customerId = result.insertedId.toString();
    }
  }

  const doc = { ...body, appointmentId, ...(customerId ? { customerId } : {}) };
  await db.collection(COL).insertOne(doc);
  return NextResponse.json({ ok: true, appointmentId }, { status: 201 });
}
