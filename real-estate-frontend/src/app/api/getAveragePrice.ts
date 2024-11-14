import { NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser'; // Importing csv-parser directly

interface DataRow {
  zipCode: string;
  price: number;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const zip = searchParams.get('zip');

  if (!zip) {
    return NextResponse.json({ error: 'Invalid zip code' }, { status: 400 });
  }

  const dsPath = path.resolve('/content/drive/MyDrive/realtor-data.zip.csv');
  const results: DataRow[] = [];

  // Wrapping the CSV parsing in a Promise to handle asynchronous logic
  return new Promise((resolve, reject) => {
    fs.createReadStream(dsPath)
      .pipe(csv()) // Now TypeScript should recognize the correct type here
      .on('data', (data: { zipCode: string; price: string }) => {
        if (data.zipCode === zip) {
          results.push({ zipCode: data.zipCode, price: parseFloat(data.price) });
        }
      })
      .on('end', () => {
        if (results.length > 0) {
          const averagePrice =
            results.reduce((sum, row) => sum + row.price, 0) / results.length;
          resolve(NextResponse.json({ averagePrice }));
        } else {
          resolve(NextResponse.json({ error: 'No data found for this zip code' }, { status: 404 }));
        }
      })
      .on('error', (error) => {
        console.error('Error reading CSV file:', error);
        reject(NextResponse.json({ error: 'Error processing data' }, { status: 500 }));
      });
  });
}
