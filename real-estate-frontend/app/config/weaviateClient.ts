import weaviate, { WeaviateClient, ApiKey } from 'weaviate-client';

console.log('Weaviate URL:', process.env.NEXT_PUBLIC_WEAVIATE_URL); // Debugging line to check if the URL is loaded

async function createClient(): Promise<WeaviateClient> {
  const client = await weaviate.connectToWeaviateCloud(
    process.env.NEXT_PUBLIC_WEAVIATE_URL || '',
    {
      authCredentials: new ApiKey(process.env.NEXT_PUBLIC_WEAVIATE_API_KEY || ''),
      skipInitChecks: true // Disables the gRPC health check
    }
  );
  return client;
}

export default createClient;
console.log('Creating Weaviate client...');