import clientPromise from '@/lib/mongodb';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    const client = await clientPromise;
    const db = client.db('myshop');

    const query = email ? { userEmail: email } : {};
    const orders = await db.collection('orders').find(query).toArray();

    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: 'Failed to fetch orders' }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db('myshop');

    const order = await req.json();

    // Insert into "orders" collection
    const result = await db.collection('orders').insertOne(order);

    return new Response(
      JSON.stringify({ success: true, orderId: result.insertedId }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, message: 'Failed to create order' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
