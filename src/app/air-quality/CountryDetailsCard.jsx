import React from "react";

const CountryDetailsCard = ({ countryData }) => {
  console.log(countryData);
  
  return (
    <div className="card flex-1">
      {countryData ? (
        <div>
          <h5 className="text-center font-semibold text-lg">{countryData?.country}</h5>
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
