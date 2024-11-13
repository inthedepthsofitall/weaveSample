"use client";

import { useEffect, useState } from 'react';

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
        const response = await fetch('/api/weaviateData');
        const data = await response.json();
        setRealEstateData(data.objects || []);
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