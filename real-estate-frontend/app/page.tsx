"use client";

import React, { useState } from 'react';

export default function Page() {
  const [zipCode, setZipCode] = useState('');
  const [averagePrice, setAveragePrice] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZipCode(e.target.value);
  };

  const handleSubmit = async () => {
    if (!zipCode) return;

    try {
      const response = await fetch(`/api/getAveragePrice?zip=${zipCode}`);
      const data = await response.json();
      setAveragePrice(data.averagePrice);
    } catch (error) {
      console.error('Error fetching average price:', error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Find Average Real Estate Price</h1>
      <input
        type="text"
        value={zipCode}
        onChange={handleInputChange}
        placeholder="Enter Zip Code"
      />
      <button onClick={handleSubmit}>Get Average Price</button>
      {averagePrice !== null && (
        <p>Average Price in {zipCode}: ${averagePrice.toLocaleString()}</p>
      )}
    </div>
  );
}
