import React, { useEffect, useState } from "react";
import setFetch from "../Hooks/setFetch";
import axios from "axios";
import moment from "moment";
import loader from "../assets/loader2.gif";

const Weather = () => {
  const [geolocation, setGeolocation] = useState({});
  const [loadVisible, setLoadVisible] = useState(false);

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
            src="https://i.postimg.cc/y8jmrKXx/sun.jpg"
          ></img>
          {/* <div className="weather-search-locality">holis</div> */}
          <div className="weather-container">
            <div className="weather-container-data"></div>

            <div className="weather-container-view">
              <h2 className="title-weather">
                {geolocation.name}, {geolocation.sys?.country}
              </h2>
              <div className="temp-weather-container">
                <h2>{(geolocation.main?.temp - 273.15).toFixed(2)}°</h2>
                <h3>
                  <i className="fa-solid fa-temperature-three-quarters"> </i>{" "}
                  MAX: {(geolocation.main?.temp_max - 273.15).toFixed(2)} °C
                </h3>
                <h3>
                  <i className="fa-solid fa-temperature-three-quarters"> </i>{" "}
                  MIN: {(geolocation.main?.temp_min - 273.15).toFixed(2)} °C
                </h3>
                {moment().format("ddd, D [de] MMMM [de] YYYY LT")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
