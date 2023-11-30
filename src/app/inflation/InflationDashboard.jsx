"use client";
import { useState } from "react";
import Earth from "../component/Earth";
import Swatches from "../../components/chart-components/Swatches";
import Legend from "../../components/chart-components/Legend";
import generateColorPalette from "../../utils/generateColorPalette";
import * as d3 from "d3";
import * as topojson from "topojson";
import InflationDetailsCard from "./InflationDetailsCard";

const coolColor = "#d0decb";
const hotColor = "#FF4500";
const stepsBetween = 5;
const colors = generateColorPalette(coolColor, hotColor, stepsBetween);

function getColorForInflation(inflationRate) {
  if (inflationRate <= 3) {
    return colors[0]; // Green (0-3%)
  } else if (inflationRate > 3 && inflationRate <= 5) {
    return colors[1]; // Light Green (3-5%)
  } else if (inflationRate > 5 && inflationRate <= 7) {
    return colors[2]; // Yellow (5-7%)
  } else if (inflationRate > 7 && inflationRate <= 10) {
    return colors[3]; // Orange (7-10%)
  } else if (inflationRate > 10 && inflationRate <= 15) {
    return colors[4]; // Red (10-15%)
  } else if (inflationRate > 15 && inflationRate <= 20) {
    return colors[5]; // Dark Red (15-18%)
  } else if (inflationRate > 20) {
    return colors[6]; // Dark Red (15-18%)
  } else {
    return "#333"; // Maroon (18% and above)
  }
}

const InflationDashboard = ({ topoJSONdata, inflationData }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  async function fillLand(context, path) {
    const feature = topojson.feature(
      topoJSONdata,
      topoJSONdata.objects.countries
    );
    for await (const d of feature.features) {
      const inflationRate = inflationData?.find(
        (elm) => elm.numeric === parseInt(d.id)
      )?.data["2023"];
      // [0]["2023"]
      context.beginPath(),
        path(d),
        (context.fillStyle = getColorForInflation(inflationRate)),
        context.fill();
    }
  }

  async function setSelectedCountryDetails(geoData) {
    setSelectedCountry({
      geoData,
      ...inflationData.find((airQuality) => airQuality.numeric == geoData.id),
    });
  }

  return (
    <div className="flex gap-4 flex-wrap">
      <div className="basis-full">
        <h3 className="card text-2xl font-semibold w-min border-2 px-4 py-1 whitespace-nowrap rounded-full">
          Inflation: end of period consumer prices 2023
        </h3>
      </div>
      <div className="card flex flex-col basis-3/4">
        <Legend
          color={d3.scaleOrdinal(
            ["0-3%", "3-5%", "5-7%", "7-10%", "10-15%", "15-20%", ">20%"],
            colors
          )}
          options={{ title: "Inflation Rate" }}
        />
        <Swatches
          color={d3
            .scaleOrdinal()
            .domain([
              "Price Hike 🔺",
              "Costly Surge 💸🔺",
              "Rising Expenses 💹💰",
              "Financial Stress 😩💸",
              "Expensive Outlay 💸💣",
              "Budget Crisis 💣💸",
              "Exorbitant Costs 🚀💸",
            ])
            .range(colors)}
          options={{
            columns: "150px",
          }}
        />

        <Earth
          countriesTopoJson={topoJSONdata}
          fillLand={fillLand}
          selectedCountry={selectedCountry}
          setSelectedCountryDetails={setSelectedCountryDetails}
        />
      </div>
      <InflationDetailsCard countryData={selectedCountry} />
    </div>
  );
};

export default InflationDashboard;
