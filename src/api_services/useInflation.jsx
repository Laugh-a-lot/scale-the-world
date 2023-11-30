import clientPromise from "../lib/mongodb";

export default async function useInflation(id) {
  const client = await clientPromise;
  const db = client.db("country");
  const airQuality = await db.collection("inflation").find({}).toArray();
  return {
    data: JSON.parse(JSON.stringify(airQuality)),
    // isLoading,
    // isError: error,
  };
}
