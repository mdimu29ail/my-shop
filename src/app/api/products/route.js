import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  const client = await clientPromise;
  const db = client.db('myshop');
  const products = await db.collection('products').find({}).toArray();
  return new Response(JSON.stringify(products), { status: 200 });
}

// export async function POST(req) {
//   const { title, description, price, image } = await req.json();
//   const client = await clientPromise;
//   const db = client.db('myshop');
//   const result = await db
//     .collection('products')
//     .insertOne({ title, description, price, image });
//   return new Response(JSON.stringify(result), { status: 201 });
// }
export async function POST(req) {
  try {
    const data = await req.json(); // must use await req.json()

    const client = await clientPromise;
    const db = client.db('myshop');

    const result = await db.collection('products').insertOne(data);

    return new Response(
      JSON.stringify({ success: true, id: result.insertedId }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ success: false, message: err.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
