"use client";
import React, { useEffect, useRef, useState } from "react";
import Earth from "../component/Earth";
import * as topojson from "topojson";
import * as d3 from "d3";
import Legend from "../../components/chart-components/Legend";
import Swatches from "../../components/chart-components/Swatches";
import generateColorPalette from "../../utils/generateColorPalette";
import CountryDetailsCard from "./CountryDetailsCard";

const coolColor = "#d0decb";
const hotColor = "#FF4500";
const stepsBetween = 5;
const colors = generateColorPalette(coolColor, hotColor, stepsBetween);

function getColorForAQI(aqiValue) {
  if (aqiValue >= 0 && aqiValue <= 50) {
    return colors[0]; // Good (0-50)
  } else if (aqiValue >= 51 && aqiValue <= 100) {
    return colors[1]; // Moderate (51-100)
  } else if (aqiValue >= 101 && aqiValue <= 150) {
    return colors[2]; // Unhealthy for Sensitive Groups (101-150)
  } else if (aqiValue >= 151 && aqiValue <= 200) {
    return colors[3]; // Unhealthy (151-200)
  } else if (aqiValue >= 201 && aqiValue <= 300) {
    return colors[4]; // Very Unhealthy (201-300)
  } else if (aqiValue >= 301 && aqiValue <= 400) {
    return colors[5]; // Hazardous (301-400)
  } else if (aqiValue >= 401 && aqiValue <= 500) {
    return colors[6]; // Very Hazardous (401-500)
  } else {
    return colors[0]; // Default to black for values outside defined ranges
  }
}

async function additionalComponents(context) {
  return (
    <div>
      <h1>Air Quality</h1>
    </div>
  );
}

const AirQuality = ({ topoJSONdata, airQualityData }) => {
  const legendRef = useRef();
  const [selectedCountry, setSelectedCountry] = useState(null);
  async function fillLand(context, path) {
    const feature = topojson.feature(
      topoJSONdata,
      topoJSONdata.objects.countries
    );
    for await (const d of feature.features) {
      const airQuality = airQualityData.find(
        (airQuality) => airQuality.numeric == d.id
      )?.overall_aqi;
      context.beginPath(),
        path(d),
        (context.fillStyle = getColorForAQI(airQuality)),
        context.fill();
    }
  }

  async function setSelectedCountryDetails(geoData) {
    setSelectedCountry({
      geoData,
      ...airQualityData.find((airQuality) => airQuality.numeric == geoData.id),
    });
  }

  return (
    <div className="flex gap-4 flex-wrap">
      <div className="basis-full">
        <h3 className="card text-2xl font-semibold w-min border-2 px-4 py-1 whitespace-nowrap rounded-full">
          Air Quality
        </h3>
      </div>
      <div className="card flex flex-col basis-3/4">
        <Legend
          color={d3.scaleOrdinal(
            [
              "<50",
              "50-100",
              "101-150",
              "151-200",
              "201-300",
              "301-400",
              "401-500",
            ],
            colors
          )}
          options={{ title: "AQI" }}
        />
        <Swatches
          color={d3
            .scaleOrdinal()
            .domain([
              "Good",
              "Moderate",
              "Unhealthy for Sensitive Groups",
              "Unhealthy",
              "Very Unhealthy",
              "Hazardous",
              "Very Hazardous",
            ])
            .range(colors)}
          options={{
            columns: "100px",
          }}
        />
        <Earth
          countriesTopoJson={topoJSONdata}
          fillLand={fillLand}
          additionalComponents={additionalComponents}
          selectedCountry={selectedCountry}
          setSelectedCountryDetails={setSelectedCountryDetails}
        />
      </div>
      <CountryDetailsCard countryData={selectedCountry} />
    </div>
  );
};

export default AirQuality;
