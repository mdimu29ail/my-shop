import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function DELETE(req, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db('myshop');

    const result = await db
      .collection('myorders')
      .deleteOne({ _id: new ObjectId(params.id) });

    if (result.deletedCount === 1) {
      return new Response(
        JSON.stringify({ message: 'Order deleted successfully' }),
        { status: 200 }
      );
    } else {
      return new Response(JSON.stringify({ message: 'Order not found' }), {
        status: 404,
      });
    }
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: 'Failed to delete order' }), {
      status: 500,
    });
  }
}
