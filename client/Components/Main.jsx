import React, { useEffect, useState  } from 'react';
import axios from 'axios';


import { Redirect } from 'react-router-dom';
import { SimpleGrid, Box, Input, VStack, StackDivider, Select, Center, Button } from '@chakra-ui/react';
import GetUserMonth from '../DisplayComponents/GetUserMonth.jsx';
import GetContinent from '../DisplayComponents/GetContinent.jsx';
import GetTemp from '../DisplayComponents/GetTemp.jsx';
import CityCard from './CityCard.jsx';

function Main() {
  const [month, setMonth] = useState('');
  const [temp, setTemp] = useState('');
  const [continent, setContinent] = useState('');
  const [country, setCountry ] = useState('');
  const [apiData, setApiData] = useState('');
  const [countries, setCountries ] = useState('');
  const [isLoggedIn, setIsLoggedIn ] = useState(true);

  const handleSubmit = (e) => {
    console.log('state that we will send to /recs is ', month, temp, continent, country)
    e.preventDefault();
    axios.post('/recs', {
      month,
      temp,
      continent,
      country,
    })
    .then(res => {
      if (res.status === 200) {
        console.log('hit axios get recs response, data: ', res.data);
        setApiData(res.data);
      }
    })
  };

  useEffect(()=>{
    console.log('hit useEffect for continent')
    getCountries(continent);
    
  }, [continent])

  // functionality that loops through data and creates cards array
  const displayData = (arr) => {
  // if array is empty => display message saying "no cities match your preferences"
  if (arr.length === 0) return 'No cities match your preferences';
  // iterate over the array 
  return arr.map((obj, i) => {
    // for every object in the array, display the cityCard component passing down props
    return (
      <CityCard key={obj.city + i} city={obj.city} country={obj.country} temperature={obj.temperature}/>
      )
    })
  }

  const cityArray = apiData ? displayData(apiData) : null;
 
  

  const getCountries = (val) => {
    console.log('axios hit get countries: ', val);
    axios.get(`/recs/months/${val}`)
    .then(res => {
      if (res.status === 200) {
        console.log('hit 200 on recs/months request, data is ', res.data)
        /**format of response is [{'country': countryName}]
         * objects cannot be passed as react props
         * conver to array of strings only
         */
        const countriesOptions = res.data.countries.map((countryObj, i) => {
          let country = countryObj['country'];
          
          return (<option key={`month${i}`} value={country}>{country}</option>)
          
        });
        setCountries(countriesOptions);
      }
    })
  };

  const handleLogout = ()=> {
    axios.get('/users/logout')
    .then(res => {
      if (res.status === 200) setIsLoggedIn(false)
    })
  }

  return(
    <Box maxW="500px" mx="auto" marginTop="5%">
      {isLoggedIn === false ? <Redirect to="/" /> : <></>}
      
      <Button onClick={handleLogout}>Logout</Button>
      <form onSubmit={handleSubmit}>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
      >
       
       
        <Center size="lg" color="teal.600">What month are you travelling?</Center>
     
        <GetUserMonth setMonth={setMonth} month={month}/>
        <Center size="lg" color="teal.600">Where do you want to go?</Center>
        <GetContinent setContinent={setContinent} continent={continent}/>
        
        
        <Select placeholder="Is there a country you're most interested in visiting?" color="teal.600" onChange={e => setCountry(e.target.value)} >
          {countries ? countries: <></>}
        </Select>
        <Center size="lg" color="teal.600">What is your ideal temperature?</Center>
        <GetTemp temp={temp} setTemp={setTemp}/>
        <Input type="submit" value="Send me my recs!" variant="filled" />
        </VStack>
      </form>
      {/* if api data has a length > 0, display recs component */}
      <div className="api-data">
        <SimpleGrid minChildWidth="200px" spacing="40px" margin="20px" justifyItems="center">
          {cityArray}
          </SimpleGrid>
      </div>
    </Box>
  )
}

export default Main;