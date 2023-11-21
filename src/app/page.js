import useAirQuality from "../api_services/useAirQuality";
import Earth from "./component/Earth";
import useTopoJSONdata from "../api_services/useTopoJSONdata";
import AirQuality from "./air-quality/AirQuality";

async function Home() {
  const { data: topoJSONdata } = await useTopoJSONdata();
  const { data: airQualityData } = await useAirQuality();

  return (
    <AirQuality topoJSONdata={topoJSONdata} airQualityData={airQualityData} />
  );
}

export default Home;
