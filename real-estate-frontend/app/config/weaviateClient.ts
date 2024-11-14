// import weaviate, { WeaviateClient, ApiKey } from 'weaviate-client';

// console.log('Weaviate URL:', process.env.NEXT_PUBLIC_WEAVIATE_URL); // Debugging line to check if the URL is loaded

// async function createClient(): Promise<WeaviateClient> {
//   const client = await weaviate.connectToWeaviateCloud(
//     process.env.NEXT_PUBLIC_WEAVIATE_URL || '',
//     {
//       authCredentials: new ApiKey(process.env.NEXT_PUBLIC_WEAVIATE_API_KEY || ''),
//       skipInitChecks: true // Disables the gRPC health check
//     }
//   );
//   return client;
// }

// export default createClient;
// console.log('Creating Weaviate client...');



import weaviate, { ApiKey } from 'weaviate-client';

const clusterURL = 'https://2d4pu317qfmkic5x70saa.c0.us-east1.gcp.weaviate.cloud';
const apiKey = 'GXKjbzlUUP53DtLYhelXeSNTs0Pf7E4rokyZ';

export default async function createClient() {
  console.log("Cluster URL:", clusterURL);
  console.log("API Key:", apiKey);

  if (!clusterURL) {
    throw new Error('Missing `clusterURL` parameter');
  }

  return await weaviate.connectToWeaviateCloud(clusterURL, {
    authCredentials: new ApiKey(apiKey),
    skipInitChecks: true,
  });
}




