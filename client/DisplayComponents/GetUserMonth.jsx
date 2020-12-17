import React from 'react';
import { useRadio, useRadioGroup, Grid } from "@chakra-ui/react";
import MonthRadioCard from './MonthRadioCard.jsx';


function GetUserMonth ( props ) {
  const {getRootProps, getRadioProps} = useRadioGroup({
    name: "month",
    defaultValue: props.month,
    onChange: props.setMonth,
  })

  const group = getRootProps()
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthOptions = months.map((value, i) => {
    const radio = getRadioProps({ value })
    return (<MonthRadioCard key={value} {...radio}>{value}</MonthRadioCard>)
  })

  return (
    <Grid 
      templateColumns="repeat(6, 1fr)" 
      gap={2} 
      templateRows ="repeat(2, 1fr)"
      {...group}>
      {monthOptions}
    </Grid>
  )
}

export default GetUserMonth;