import weaviate, { WeaviateClient, ApiKey } from 'weaviate-client';
import 'dotenv/config';

console.log('Weaviate URL:', process.env.WEAVIATE_URL); // Debugging line to check if the URL is loaded

async function createClient(): Promise<WeaviateClient> {
  const client = await weaviate.connectToWeaviateCloud(
    process.env.WEAVIATE_URL || '',
    {
      authCredentials: new ApiKey(process.env.WEAVIATE_API_KEY || ''),
      skipInitChecks: true // Disables the gRPC health check
    }
  );
  return client;
}

export default createClient;
