import React, {useEffect, useState} from 'react';
import './App.css';
import {FormControl, Select, MenuItem, Card, CardContent} from "@material-ui/core";
import Infobox from "./components/Infobox/Infobox";
import Map from "./components/Map/Map";
import Table from "./components/Table/Table";
import {sortData} from "./utils";

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
      .then(data => setCountryInfo(data))
  }, [])

  useEffect( () => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then(response => response.json())
        .then(data => {
          const countries = data.map(country => (
            {
              name: country.country,
              value: country.countryInfo.iso2,
            }
          ))

          const sortedData = sortData(data)
          setTableData(sortedData)
          setCountries(countries)
        })
    }
    getCountriesData()
  }, [])

  console.log(tableData)

  const onCountryChange = async event => {
    const countryCode = event.target.value
    const url = countryCode === 'worldwide'
      ? 'https://disease.sh/v3/covid-19/all'
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`


    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode)
        setCountryInfo(data)
      })
  }

  console.log(countryInfo)

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className='app__dropdown'>
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value='worldwide'>Worldwide</MenuItem>
              {
                countries.map((country, index) => (
                  <MenuItem
                    value={country.value}
                    key={index}
                  >
                    {country.name}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <Infobox title='Coronavirus Cases' total={countryInfo.cases} cases={countryInfo.todayCases}/>
          <Infobox title='Recovered' total={countryInfo.recovered} cases={countryInfo.todayRecovered}/>
          <Infobox title='Deaths' total={countryInfo.deaths} cases={countryInfo.todayDeaths}/>
          <Map />
        </div>
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData}/>
          <h3>Worldwide New Cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
