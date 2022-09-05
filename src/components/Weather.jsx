import React, { useEffect, useState } from "react";
import setFetch from "../Hooks/setFetch";
import axios from "axios";
import moment from "moment";
import loader from "../assets/loader2.gif";

const Weather = () => {
  const [geolocation, setGeolocation] = useState({});
  const [loadVisible, setLoadVisible] = useState(false);
  const [ degreesT, setDegreesT] = useState('C')
  const [ degrees, setDegrees] = useState(0)
  const [background, setBackground] = useState('nodata')


const backgrounds = [
  {
    name: 'Clouds',
    url: "https://i.postimg.cc/x88mqjws/Clouds.jpg"
  },
  {
    name: 'Rain',
    url: "https://i.postimg.cc/Y0pJPJQ1/rain.jpg"
  },
  {
    name: 'Clear',
    url: "https://i.postimg.cc/sxXT7yp0/Clear-Sky.jpg"
  }
]


  moment.updateLocale("en", {
    months: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
  });
  moment.updateLocale("en", {
    weekdaysShort: [
      "Domingo",
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ],
  });
  const changeFC=()=>{
    if(degreesT === 'C') {

      setDegreesT('F')
      setDegrees(Math.round(degrees*1.8+32))
    }
    else{

      setDegreesT('C')
      setDegrees(Math.round(((degrees - 32)*5)/9))
    }
  }

  const getGeolocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let coordenadas = position.coords;

      getApi(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coordenadas.latitude}&lon=${coordenadas.longitude}&appid=81f4eed0e6574e4650a235ec66a35cdd`
      );
    }, error);
  };
  //ejecutemos geolocalizacion solo al cargar la pagina

  useEffect(() => {
    getGeolocation();
    moment.locale("es");
  }, []);

  const getApi = (url) => {
    axios.get(url).then((res) => {
      setGeolocation(res.data);
      setDegrees(Math.round(res.data.main.temp - 273.15))
      backgrounds.map(item => {
        if(item.name === res.data.weather?.[0].main)  setBackground(item.url)
      })
      setLoadVisible(!loadVisible);
      console.log(res.data);
    });
  };

  // si hay algun fallo al obtener la localizacion
  function error(error) {
    console.warn("ERROR(" + error.code + "): " + error.message);
  }

  return (
    <>
      <div className="container">
        <div
          className="load"
          id="load"
          style={{ visibility: loadVisible ? "hidden" : "inherit" }}
        >
          <img className="loader" src={loader}></img>
        </div>
        <div className="weather">
          <img
            className="background-weather"
            src={background}
          ></img>
          {/* <div className="weather-search-locality">holis</div> */}
          <div className="weather-container">
            <div className="weather-container-data">
              
            </div>

            <div className="weather-container-view">
            <h2 className="title-weather">
                {geolocation.name}, {geolocation.sys?.country}
              </h2>
              <h2 className="temp">  {degrees} °{degreesT}</h2>
            <img className="icon-weather" src={`http://openweathermap.org/img/wn/${geolocation.weather?.[0].icon}@2x.png`} />
       
              <div className="temp-weather-container">
                
                <h3>
                  <i className="fa-solid fa-temperature-three-quarters"> </i>{" "}
                  MAX: { degreesT === 'C' ?  Math.round((geolocation.main?.temp_max- 273.15)) : Math.round((geolocation.main?.temp_max- 273.15) * 9/5 + 32)} °{degreesT}
                </h3>
                <h3>
                  <i className="fa-solid fa-temperature-three-quarters"> </i>{" "}
                  MIN: { degreesT === 'C' ?  Math.round((geolocation.main?.temp_min- 273.15)) : Math.round((geolocation.main?.temp_min- 273.15) * 9/5 + 32)} °{degreesT}
                  
                  
                </h3>
               <h3><i className="fa-solid fa-wind"></i> Viento: {geolocation.wind?.speed} m/s</h3>  
               <h3><i className="fa-solid fa-droplet"></i> Humedad: {geolocation.main?.humidity}%</h3>  
                {moment().format("ddd, D [de] MMMM [de] YYYY LT")}
              </div>
            </div>
            <button onClick={changeFC} className="btn-fc" type="button">{degreesT === 'C' ? "Cambiar a °F" : "Cambiar a °C" }</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
