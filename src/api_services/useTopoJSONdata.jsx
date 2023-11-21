import clientPromise from "../lib/mongodb";

export default async function useTopoJSONdata(id) {
  const client = await clientPromise;
  const db = client.db("country");
  const airQuality = await db.collection("topojson").find().toArray();
  return {
    data: JSON.parse(JSON.stringify(airQuality[0].data)),
    // isLoading,
    // isError: error,
  };
}
