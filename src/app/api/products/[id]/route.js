import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    const body = await req.json(); // get email from request body
    const { email } = body;

    if (!email) {
      return new Response(JSON.stringify({ message: 'Email required' }), {
        status: 400,
      });
    }

    const client = await clientPromise;
    const db = client.db('myshop');

    // Only delete if the product belongs to this email
    const result = await db.collection('products').deleteOne({
      _id: new ObjectId(id),
      email, // verification
    });

    if (result.deletedCount === 1) {
      return new Response(
        JSON.stringify({ message: 'Product deleted successfully' }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({ message: 'Product not found or not authorized' }),
        { status: 404 }
      );
    }
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: 'Failed to delete product' }),
      { status: 500 }
    );
  }
}

// UPDATE product by ID
export async function PUT(req, { params }) {
  const { id } = params;

  try {
    const body = await req.json(); // updated data
    const client = await clientPromise;
    const db = client.db('myshop');

    const result = await db
      .collection('products')
      .updateOne({ _id: new ObjectId(id) }, { $set: body });

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ message: 'Product not found' }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: 'Product updated successfully' }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: 'Failed to update product' }),
      { status: 500 }
    );
  }
}
