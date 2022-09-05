import axios from "axios";
import React, { useEffect, useState } from "react";

const setFetch = (url) => {
  const [datos, setDatos] = useState({});

  const getApi = () => {
    axios.get(url).then((res) => {
      setDatos(res.data);
    });
  };

  useEffect(() => {
    getApi();
  }, []);

  return { datos, getApi };
};

export default setFetch;
