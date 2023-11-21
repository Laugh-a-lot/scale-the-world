import clientPromise from "../lib/mongodb";

export default async function useAirQuality(id) {
  const client = await clientPromise;
  const db = client.db("country");
  const airQuality = await db.collection("airquality").find({}).toArray();
  return {
    data: JSON.parse(JSON.stringify(airQuality)),
    // isLoading,
    // isError: error,
  };
}
