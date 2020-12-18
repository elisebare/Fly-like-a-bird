import React from 'react';
import { useRadioGroup, Grid } from "@chakra-ui/react";
import RadioButton from './RadioButton.jsx';


function GetContinent ( props ) {
  console.log('running get continent', props)
  const {getRootProps, getRadioProps} = useRadioGroup({
    name: "temp",
    defaultValue: '',
    onChange: props.setTemp,
  })


  const group = getRootProps()
  const temps = [["0-30", "Cold"], ["30-50", "Chilly"], ["50-60", "Mild"], ["70-80", "Warm"], ["80-90", "Hot"], ["90-120", "Really Hot"]]
 
  const tempOptions = temps.map((arr, i) => {
    const value = arr[0]
    const radio = getRadioProps({ value });
    return (<RadioButton key={arr[0]} {...radio}>{arr[1]}</RadioButton>)
  })

  return (
    <Grid 
      templateColumns="repeat(3, 1fr)" 
      gap={2} 
      templateRows ="repeat(2, 1fr)"
      {...group}>
      {tempOptions}
    </Grid>
  )
}

export default GetContinent;