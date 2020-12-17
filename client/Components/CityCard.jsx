import React from 'react';
import { Box } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
// data has city, country, temperature
const CityCard = (props) => {
  const { city, country, temperature } = props;
  // return div that displays city, country, and temperature
  return (
    <div className="city-card">
      <Box bg="lightseagreen" 
      w="200px"
      height="200px" 
      p={2} 
      color="white" 
      borderRadius="5px"
      textAlign="center"
      alignItems="center"
      boxShadow="2px 2px 5px 2px #e6e6e6"
      >
      <Text paddingTop="50px" fontWeight="700" fontSize="larger">{city}</Text>
      <Text>{country}</Text>
      <Text fontWeight="700">{temperature}° F</Text>
        </Box>  
    </div>
  )
}

export default CityCard;