import { NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser'; // Importing csv-parser directly

interface DataRow {
  zipCode: string;
  price: number;
}

export async function GET(request: Request) {
  console.log('Received GET request');

  const { searchParams } = new URL(request.url);
  const zip = searchParams.get('zip');

  console.log(`Zip code: ${zip}`);

  if (!zip) {
    console.log('Invalid zip code');
    return NextResponse.json({ error: 'Invalid zip code' }, { status: 400 });
  }

  const dsPath = path.resolve(process.cwd(), 'public/data/realtor-data.zip.csv');

  console.log(`Reading CSV file from: ${dsPath}`);

  const results: DataRow[] = [];

  // Wrapping the CSV parsing in a Promise to handle asynchronous logic
  return new Promise((resolve, reject) => {
    fs.createReadStream(dsPath)
      .pipe(csv()) // Now TypeScript should recognize the correct type here
      .on('data', (data: { zipCode: string; price: string }) => {
        console.log(`Processing data: ${JSON.stringify(data)}`);
        if (data.zipCode === zip) {
          results.push({ zipCode: data.zipCode, price: parseFloat(data.price) });
        }
      })
      .on('end', () => {
        console.log('Finished processing CSV file');
        if (results.length > 0) {
          const averagePrice =
            results.reduce((sum, row) => sum + row.price, 0) / results.length;
          console.log(`Average price: ${averagePrice}`);
          resolve(NextResponse.json({ averagePrice }));
        } else {
          console.log('No data found for this zip code');
          resolve(NextResponse.json({ error: 'No data found for this zip code' }, { status: 404 }));
        }
      })
      .on('error', (error) => {
        console.error('Error reading CSV file:', error);
        reject(NextResponse.json({ error: 'Error processing data' }, { status: 500 }));
      });
  });
}