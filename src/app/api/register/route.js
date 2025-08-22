// import clientPromise from '@/lib/mongodb';
// import bcrypt from 'bcryptjs';
// import { NextResponse } from 'next/server';

// export async function POST(req) {
//   try {
//     const { name, email, password } = await req.json();
//     if (!name || !email || !password)
//       return NextResponse.json(
//         { message: 'All fields required' },
//         { status: 400 }
//       );

//     const client = await clientPromise;
//     const db = client.db('myshop');
//     const users = db.collection('users');

//     const existing = await users.findOne({ email });
//     if (existing)
//       return NextResponse.json(
//         { message: 'Email already exists' },
//         { status: 400 }
//       );

//     const hashed = await bcrypt.hash(password, 10);
//     await users.insertOne({ name, email, password: hashed });

//     return NextResponse.json(
//       { message: 'User registered successfully' },
//       { status: 201 }
//     );
//   } catch (err) {
//     return NextResponse.json({ message: err.message }, { status: 500 });
//   }
// }
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { message: 'All fields required' },
      { status: 400 }
    );
  }

  const client = await clientPromise;
  const db = client.db('myshop');
  const users = db.collection('users');

  const existingUser = await users.findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { message: 'User already exists' },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await users.insertOne({
    name,
    email,
    password: hashedPassword,
  });

  return NextResponse.json({ message: 'User registered successfully' });
}
