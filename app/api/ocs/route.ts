import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Character from '../../../models/Character';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();
    const character = await Character.create(data);
    return NextResponse.json(character, { status: 201 });
  } catch (error) {
    // ESTA LÍNEA ES NUEVA, NOS DIRÁ QUÉ PASÓ REALMENTE
    console.error("ERROR EXACTO DE MONGODB:", error); 
    return NextResponse.json({ error: 'Failed to create character' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const characters = await Character.find({}).sort({ createdAt: -1 });
    return NextResponse.json(characters);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch characters' }, { status: 500 });
  }
}