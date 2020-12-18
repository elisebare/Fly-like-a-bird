import React from 'react';
import ReactDom from 'react-dom';
import App from './Components/App.jsx';
import { ChakraProvider } from "@chakra-ui/react";

// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react"

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#C53030",
    800: "#C53030",
    700: "#C53030",
  },
}

const theme = extendTheme({ colors })

// 3. Pass the `theme` prop to the `ChakraProvider`

// render app.jsx app component
ReactDom.render(<ChakraProvider theme={theme}>
                  <App/>
                </ChakraProvider>, 
                document.getElementById("contents"));