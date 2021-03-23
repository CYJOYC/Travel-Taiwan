import React, { useState } from "react";
import CityContext from "./CityContext";
import Header from "./components/Header";
import ScenicSpot from "./components/ScenicSpot";

function App() {
  const city = useState("");
  return (
    <CityContext.Provider value={city}>
      <Header />
      <ScenicSpot />
    </CityContext.Provider>
  );
}

export default App;
