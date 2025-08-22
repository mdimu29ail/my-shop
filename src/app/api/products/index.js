import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('myshop');

  if (req.method === 'GET') {
    const { email } = req.query;
    if (!email) return res.status(400).json({ message: 'Email required' });

    try {
      const products = await db
        .collection('products')
        .find({ email })
        .toArray();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else if (req.method === 'POST') {
    const product = req.body;
    try {
      const result = await db.collection('products').insertOne(product);
      res.status(201).json({ ...product, _id: result.insertedId });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
