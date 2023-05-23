import React, { useEffect, useState } from "react";
import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";
import image from "./assets/image.png";

const App = () => {
  const [data, setData] = useState({});
  const [country, setCountry] = useState("");

  useEffect(() => {
    const fetchAPI = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
    };

    fetchAPI();
  }, []);

  const handleCountryChange = async (selectedCountry) => {
    const fetchedData = await fetchData(selectedCountry);
    setData(fetchedData);
    setCountry(selectedCountry);
  };

  return (
    <div className={styles.container}>
      <img className={styles.image} src={image} alt="COVID-19" />
      <Cards data={data} />
      <CountryPicker handleCountryChange={handleCountryChange} />
      <Chart />
    </div>
  );
};

export default App;
