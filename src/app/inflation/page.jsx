import React from "react";
import Earth from "../component/Earth";
import useTopoJSONdata from "../../api_services/useTopoJSONdata";
import useInflation from "../../api_services/useInflation";
import InflationDashboard from "./InflationDashboard";

const Page = async () => {
  const { data: topoJSONdata } = await useTopoJSONdata();
  const {data: inflationData} = await useInflation();  
  return <InflationDashboard topoJSONdata={topoJSONdata} inflationData={inflationData} />;
};

export default Page;
