"use client";

import { useEffect, useState } from 'react';
import createClient from '../../src/config/weaviateClient'; // Ensure this path matches your structure
import { WeaviateResponse } from '../../src/types/weaviateTypes';

type RealEstate = {
  price: number;
  zip_code: string;
  bedrooms: number;
};

const Home = () => {
  const [realEstateData, setRealEstateData] = useState<RealEstate[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const client = await createClient();

        // Fetch the data and log the response structure
        const response = await client.collections.get("RealEstate");
        console.log('RealEstate collection response:', response); // Log to inspect structure

        // Assuming response has an "objects" array, adjust this based on console output
        const objects = (response as unknown as WeaviateResponse).objects || [];

        const formattedData: RealEstate[] = objects.map((item) => ({
          price: item.properties.price,
          zip_code: item.properties.zip_code,
          bedrooms: item.properties.bedrooms,
        }));

        setRealEstateData(formattedData);
      } catch (error) {
        console.error('Failed to fetch real estate data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Real Estate Listings</h1>
      <div className="grid grid-cols-1 gap-4">
        {realEstateData.map((item, index) => (
          <div key={index} className="p-4 border rounded shadow">
            <p>Price: ${item.price}</p>
            <p>Zip Code: {item.zip_code}</p>
            <p>Bedrooms: {item.bedrooms}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;