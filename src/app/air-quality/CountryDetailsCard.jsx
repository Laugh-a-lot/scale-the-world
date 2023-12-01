import React from "react";
import { GiGasMask, GiDustCloud } from "react-icons/gi";
import { FaBiohazard, FaSmog } from "react-icons/fa";
import { MdLocalFireDepartment } from "react-icons/md";
import { FaCloudMeatball } from "react-icons/fa6";
import Gradients from "../../utils/Gradients";

function showAirContents(fields) {
  return (
    <>
      <b>Concentration</b>{" "}
      {fields.map(({ label, icon, conc, aqi }) => (
        <React.Fragment key={label}>
          <div className="flex w-full gap-4 pb-2">
            {icon}
            <b className="basis-1/5">{label}</b>
            <span className="basis-1/4">{conc}</span>
            <span className="basis-1/5">
              {aqi}
              <span className="text-[8px]"> AQI</span>
            </span>
          </div>
          <hr className="w-full mb-2" />
        </React.Fragment>
      ))}
    </>
  );
}

const CountryDetailsCard = ({ countryData }) => {
  let fields;
  if (countryData) {
    fields = [
      {
        label: "CO",
        aqi: countryData.CO.aqi,
        conc: countryData.CO.concentration,
        icon: (
          <GiGasMask
            size={32}
            className="animate-glow fill-[url(#verdantGrowth)]"
          />
        ),
      },
      {
        label: "NO2",
        aqi: countryData.NO2.aqi,
        conc: countryData.NO2.concentration,
        icon: (
          <FaBiohazard
            size={32}
            className="animate-glow fill-[url(#warmHarvest)]"
          />
        ),
      },
      {
        label: "O3",
        aqi: countryData.O3.aqi,
        conc: countryData.O3.concentration,
        icon: (
          <FaSmog
            size={32}
            className="animate-glow fill-[url(#twilightRadiance)]"
          />
        ),
      },
      {
        label: "PM2.5",
        aqi: countryData["PM2.5"].aqi,
        conc: countryData["PM2.5"].concentration,
        icon: (
          <GiDustCloud
            size={32}
            className="animate-glow fill-[url(#oceanicDepths)]"
          />
        ),
      },
      {
        label: "PM10",
        aqi: countryData.PM10.aqi,
        conc: countryData.PM10.concentration,
        icon: (
          <FaCloudMeatball
            size={32}
            className="animate-glow fill-[url(#vibrantSunset)]"
          />
        ),
      },
      {
        label: "SO2",
        aqi: countryData.SO2.aqi,
        conc: countryData.SO2.concentration,
        icon: (
          <MdLocalFireDepartment
            size={32}
            className="animate-glow fill-[url(#fieryBlaze)]"
          />
        ),
      },
    ];
  }

  const countryInfo = {
    latitude: "latitude",
    longitude: "longitude",
    numeric: "country code",
  };

  return (
    <div className="card flex-1">
      <Gradients />
      {countryData ? (
        <div className="flex items-center flex-col">
          <h5 className="text-center font-semibold text-lg">
            {countryData.geoData.properties.name}
          </h5>
          <span className="text-sm">
            <b className="text-4xl">{countryData?.overall_aqi}</b> AQI{" "}
          </span>

          <div className="w-full justify-between flex gap-2 p-4 px-0 mb-4">
            {Object.keys(countryInfo).map((ele, idx) => (
              <div key={ele} className="flex flex-col items-center text-center">
                <bold>{[countryData[ele], idx < 2 && "°"]} </bold>
                <span className="whitespace-nowrap">{countryInfo[ele]}</span>
              </div>
            ))}
          </div>

          {showAirContents(fields)}
        </div>
      ) : (
        <p className="flex h-full items-center text-center">
          Tap on any country to view air quality stats.
        </p>
      )}
    </div>
  );
};

export default CountryDetailsCard;
