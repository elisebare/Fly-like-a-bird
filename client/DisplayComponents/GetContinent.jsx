import React from 'react';
import { useRadioGroup, Grid } from "@chakra-ui/react";
import RadioButton from './RadioButton.jsx';


function GetContinent ( props ) {

  const {getRootProps, getRadioProps} = useRadioGroup({
    name: "continent",
    defaultValue: props.continent,
    onChange: props.setContinent,
  })

  const group = getRootProps()
  const continents = ["Africa", "Asia", "Europe", "North America", "Oceania", "South America"]
 
  const continentOptions = continents.map((value, i) => {
    const radio = getRadioProps({ value })
    return (<RadioButton key={value} {...radio}>{value}</RadioButton>)
  })

  return (
    <Grid 
      templateColumns="repeat(3, 1fr)" 
      gap={2} 
      templateRows ="repeat(2, 1fr)"
      {...group}>
      {continentOptions}
    </Grid>
  )
}

export default GetContinent;