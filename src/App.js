import './App.css';
import React from "react";
import StatusSun from "./assets/StatusSun.png";
import StatusRain from "./assets/StatusRain.png";
import StatusWindFall from "./assets/StatusWindFall.png";
import Chicken from "./assets/chicken.png";
//https://weatherapi-com.p.rapidapi.com/current.json?q=34.0551%2C-117.7500&rapidapi-key=c7c101b08emshab768bf7ae07662p17f381jsn5c30271e4a9a&"


const App = () => {
  const [items, setItems] = React.useState([]);
  const [isDataLoaded, setIsDataLoaded] = React.useState(false);
  var icon = '';

  React.useEffect(() => {
    fetch("https://weatherapi-com.p.rapidapi.com/current.json?q=Pomona&rapidapi-key=c7c101b08emshab768bf7ae07662p17f381jsn5c30271e4a9a&%22")
    .then((res) => res.json())
    .then((json) => {
      setItems(json);
      setIsDataLoaded(true);
    });
}, []);

  if (!isDataLoaded) {
    return (
      <div>
        <h1> The data is still loading OR the free API calls are used up. </h1>
      </div>
    );
  }

  var weather = items.current.condition.text;
  if(weather === "Sunny" || weather === "Partly Cloudy" || weather === "Cloudy" ) {
    icon = StatusSun;
  }

  if(items.current.condition.text === ("Partly cloudy" || "Cloudy" || "Sunny") ) {
    icon = StatusSun;
  }
  else if(items.current.condition.text === ("Light rain" || "Moderate rain" || "Heavy rain") ) {
    icon = StatusRain;

  }
  

  //items.location.name should be Pomona
  return (
    <div className="App">
      <h1> Weather App using WeatherAPI.com </h1>
      <br></br>
      <p>
        <div className="box">
        City Name: {items.location.name}
        <br /> Region: {items.location.region}
        <br /> Country: {items.location.country}
        <br /> Latitude: {items.location.lat}
        <br /> Longitude: {items.location.lon} {<img src={Chicken} alt='chicken'></img>}
        <br></br>
        </div>

        <div className="box">
        <br /> Temperature Farenheit: {items.current.temp_f} °F
        <br /> Temperature Celsius: {items.current.temp_c} °C
        <br /> Feels Like Farenheit: {items.current.feelslike_f} °F
        <br /> Feels Like Celsius: {items.current.feelslike_c} °C
        <br /> Condition: {items.current.condition.text} {<img src={icon} alt='weathericon'></img>}
        <br></br>
        </div>
        
        
        <div className="box">
        <br/> Wind MI: {items.current.wind_mph} MI/Hr
        <br/> Wind KH: {items.current.wind_kph} KM/hr
        <br/> Wind Direction: {items.current.wind_dir}  {<img src={StatusWindFall} alt='Wind Icon'></img>}
        <br></br>
        </div>

        <div className="box">
        <br/> Precipatation mm: {items.current.precip_mm} mm
        <br/> Precipatation in: {items.current.precip_in} in
        <br/> Humidity: {items.current.humidity} %
        <br/> Cloud: {items.current.cloud}
        <br/> UV Index: {items.current.uv} {<img src={StatusRain} alt='Rain Icon'></img>}
        </div>

        <div className="box">
          Thank you for using my weather app!
          <br/> The boxes are in the following order:
          <br/> Location
          <br/> Temperature
          <br/> Wind
          <br/> Other Conditions
        </div>
       </p>

    </div>
  );
};

export default App;