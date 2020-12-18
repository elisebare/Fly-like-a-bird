import React from 'react';
import { useRadio, useRadioGroup, Grid } from "@chakra-ui/react";
import ContinentRadio from './ContinentRadio.jsx';


function GetContinent ( props ) {
  console.log('get user month props is', props)
  const {getRootProps, getRadioProps} = useRadioGroup({
    name: "continent",
    defaultValue: props.continent,
    onChange: props.setContinent,
  })

  const group = getRootProps()
  const continents = ["Africa", "Asia", "Europe", "North America", "Oceania", "South America"]
 
  const continentOptions = continents.map((value, i) => {
    const radio = getRadioProps({ value })
    return (<ContinentRadio key={value} {...radio}>{value}</ContinentRadio>)
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