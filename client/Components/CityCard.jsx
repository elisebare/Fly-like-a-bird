import React from 'react';

// data has city, country, temperature
const CityCard = (props) => {
  const { city, country, temperature } = props;
  // return div that displays city, country, and temperature
  return (
    <div className="city-card">
      <h2>{city}</h2>
      <h3>{country}</h3>
      <h3>{temperature}</h3>
    </div>
  )
}

export default CityCard;