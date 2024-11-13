import { NextResponse } from 'next/server';
import createClient from '../../../app/config/weaviateClient';

export async function GET() {
  try {
    const client = await createClient();
    const response = await client.collections.get("RealEstate");
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching data from Weaviate:', error);
    return NextResponse.json({ error: 'Failed to fetch data from Weaviate' }, { status: 500 });
  }
}
