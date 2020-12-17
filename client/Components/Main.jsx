import React, { useState } from 'react';
import axios from 'axios';
import { Input } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import CityCard from './CityCard.jsx';
import { Redirect } from 'react-router-dom';


function Main() {
  const [month, setMonth] = useState('');
  const [temp, setTemp] = useState('');
  const [continent, setContinent] = useState('');
  const [country, setCountry ] = useState('');
  const [apiData, setApiData] = useState('');
  const [countries, setCountries ] = useState('');
  const [isLoggedIn, setIsLoggedIn ] = useState(true);


  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthOptions = months.map((mon, i) => {
    return (<option value={mon} key={`month${i}`}>{mon}</option>)
  })

  const continents = ["Africa", "Asia", "Europe", "North America", "Oceania", "South America"]
  const continentOptions = continents.map((continent, i) => (<option key={`continents${i}`} value={continent}>{continent}</option>))

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
  }

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
  // const subArraysFunc = (arr) => {
  //   let subArr = [];
  //   const newArr = [];
  //   // check if arr is not null
  //   if (arr) {
  //     // loop through input arr
  //     arr.forEach((city, i) => {
  //       // check to see if subArr has length of 5
  //       if (arr[i + 1] === undefined) {
  //         newArr.push(subArr)
  //       }
  //       if (subArr.length === 5) {
  //         // if so, push subArr into newArr
  //         newArr.push(subArr);
  //         // reassign subArr to empty array
  //         subArr = [];
  //       }
  //       subArr.push(city);
  //     })
  //   } 
  //   return newArr;
  // }
  // const subArrays = subArraysFunc(cityArray);
  

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
    <div>
      {isLoggedIn === false ? <Redirect to="/" /> : <></>}
      <h2>Give us some info so we can share some recs</h2>
      <button onClick={handleLogout}>Logout</button>
      <form onSubmit={handleSubmit}>
        <Select key="selectmonth" name="month" placeholder="What month are you travelling" isRequired onChange={e => setMonth(e.target.value)}>
          {monthOptions}
        </Select>
        <Select key="selectcont" name="continent" placeholder="Where are you going?" onChange={
          e => {
            getCountries(e.target.value);
            setContinent(e.target.value);
          }
        }>
          {continentOptions}
        </Select>
        {/* if countries array has values display select for country */}
        
        <Select placeholder="Is there a country you're most interested in visiting?" onChange={e => setCountry(e.target.value)} >
          {countries ? countries: <></>}
        </Select>
        <Select key="selecttemp" name="temp" placeholder = "What's your ideal temperature?" onChange={e => setTemp(e.target.value)}>
          <option key={'temp0'} value="0-30">Freezing!</option>
          <option key={'temp1'} value="30-50">Cold</option>
          <option key={'temp2'} value="50-60">Chillly</option>
          <option key={'temp3'} value="60-70">Mild</option>
          <option key={'temp4'} value="70-80">Warm</option>
          <option key={'temp5'} value="80-90">Hot</option>
          <option key={'temp6'} value="90-120">Oppressive</option>
        </Select>
        <Input type="submit" value="Send me my recs!" />
      </form>
      {/* if api data has a length > 0, display recs component */}
      <div className="api-data">
        <div>{cityArray}</div>
        <button>Show Me More!</button>
        </div>
    </div>
  )
}

export default Main;