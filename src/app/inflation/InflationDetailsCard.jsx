import React from "react";
import InflationChart from "./InflationChart";

const InflationDetailsCard = ({ countryData }) => {
  const countryInfo = {
    latitude: "latitude",
    longitude: "longitude",
    numeric: "country code",
  };
  console.log(countryData)

  return (
    <div className="card flex-1 h-100">
      {countryData ? (
        <div className="flex items-center flex-col">
          <h5 className="text-center font-semibold text-lg">
            {countryData.geoData.properties.name}
          </h5>
          <span className="text-sm">
            <b className="text-4xl">{countryData?.data?.["2023"] ?? "NA"}</b> %
          </span>

          <div className="w-full flex gap-2 p-4 px-0 mb-4">
            {Object.keys(countryInfo).map((ele, idx) => (
              <div key={ele} className="flex flex-col items-center text-center">
                <bold>{countryData[ele] ? [countryData[ele], idx < 2 && "°"] : "NA"} </bold>
                <span className="whitespace-nowrap">{countryInfo[ele]}</span>
              </div>
            ))}
          </div>

          {countryData.data && <InflationChart data={countryData.data} />}
          <span className="self-start mt-auto text-xs">Source: IMF</span>
        </div>
      ) : (
        <p className="flex h-full items-center text-center">
          Tap on any country to view inflation stats.
        </p>
      )}
    </div>
  );
};

export default InflationDetailsCard;
