// src/types/weaviateTypes.ts
export interface WeaviateResponse {
    objects: {
      properties: {
        price: number;
        zip_code: string;
        bedrooms: number;
      };
    }[];
  }
  