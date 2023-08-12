import Description from './components/Description';
import { useEffect, useState } from 'react';
import { getFormattedWeatherData } from './weatherServices';

function App() {
  const [city, setCity] = useState('Paris');
  const [weather, setWeather] = useState('');
  const [units, setUnits] = useState('metric');

  useEffect(()=>{
    const fetchWeatherData = async()=>{
      const data =await getFormattedWeatherData(city,units);
      setWeather(data);
    };
    fetchWeatherData();
  }, [units, city]);

  const handleUnitsClick = (e) => {
      const button = e.currentTarget;
      const currentUnit = button.innerText.slice(1); 

      const isCelsius = currentUnit === 'C';
      button.innerText = isCelsius ? '°F':'°C';
      setUnits(isCelsius? 'metric':'imperial');
      console.log(button);
  };


  const enterKeyPressed = (e) => {
    if(e.keyCode === 13){
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  }

  return (
    <div className="App">
      <div className='overlay'>
          {
            weather && (
              <div className='container'>
              <div className='section section__inputs'>
              <input onKeyDown={enterKeyPressed} type='text' name='city' placeholder='Enter City..'/>
              <button className='btn-change' onClick={(e) => handleUnitsClick(e)}>°F</button>
            </div>
            <div className='section section__temperature'>
              <div className='icon'>
                <h3>{`${weather.name},${weather.country}`}</h3>
                <h3>{weather.description}</h3>
              </div>
              <div className='temperature'>
                <h1>{`${weather.temp} °${units === 'metric'?'C':'F'}`}</h1>
              </div> 
            </div>
          <Description weather={weather} units={units}/>
          </div>
            )
          }
      </div>
    </div>
  );
}

export default App;
