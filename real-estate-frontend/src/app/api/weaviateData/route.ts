// import { NextResponse } from "next/server";
// import createClient from 'app/config/weaviateClient';
//  // Adjust this path based on actual setup

// export async function GET() {
//   try {
//     const client = await createClient();
//     const collections = await client.collections.listAll();
//     return NextResponse.json({ collections });
//   } catch (error) {
//     console.error("Failed to fetch collections:", error);
//     return NextResponse.json({ error: "Failed to fetch collections" }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import createClient from '@config/weaviateClient';

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
