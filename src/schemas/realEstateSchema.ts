const realEstateSchema = {
    class: "RealEstate", // Collection name
    properties: [
      {
        name: "price",
        dataType: ["number"], // Assuming price is a number
      },
      {
        name: "zip_code",
        dataType: ["string"], // Assuming zip_code is a string
      },
      {
        name: "bedrooms",
        dataType: ["int"], // Assuming bedrooms is an integer
      },
      // Add more properties as needed
    ],
  };
  
  export default realEstateSchema;
  