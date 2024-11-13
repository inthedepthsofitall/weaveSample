import createClient from '../../real-estate-frontend/app/config/weaviateClient';
import realEstateSchema from '../schemas/realEstateSchema';

async function testConnection() {
  try {
    const client = await createClient() as any; // Bypass type checking
    console.log('Client methods:', client);

    // Create the RealEstate collection
    await client.collections.createFromSchema(realEstateSchema);
    console.log('RealEstate collection created successfully.');

    // List all collections to confirm
    const collections = await client.collections.listAll();
    console.log('Updated Collections:', collections);
  } catch (error) {
    console.error('Connection failed:', error);
  }
}

testConnection();
