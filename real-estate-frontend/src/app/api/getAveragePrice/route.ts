import { NextResponse } from 'next/server';
import { getCsvData } from '@/utils/csvReader';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const zip = searchParams.get('zip');

    if (!zip) {
        return NextResponse.json({ error: 'Invalid zip code' }, { status: 400 });
    }

    try {
        const averagePrice = await getCsvData(zip);
        if (averagePrice !== null) {
            return NextResponse.json({ averagePrice });
        } else {
            return NextResponse.json({ error: 'No data found for this zip code' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error fetching CSV data:', error);
        return NextResponse.json({ error: 'Error processing CSV file' }, { status: 500 });
    }
}
