const API_KEY = '180693beecb233d4c32e67d008c89a77'

const makeIconURL = (iconID) => `https://api.openweathermap.org/img/wn/${iconID}@2x.png`

const getFormattedWeatherData = async (city, units = 'metric') => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

    const data = await fetch(url)
        .then((res) => res.json())
        .then((data) => data);

    const { 
            weather, 
            main: {temp, feel_like, temp_min, temp_max, pressure, humidity},
            wind : {speed},
            sys : {country},
            name,
        } = data;

    const { description, icon } = weather[0];

    return {
        description,
        iconURL : makeIconURL(icon),
        temp,
        feel_like,
        temp_min,
        temp_max,
        pressure,
        humidity,
        speed,
        country,
        name,
    };
};

export {getFormattedWeatherData};