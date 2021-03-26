import React, { useState } from "react";
import CityContext from "./CityContext";
import Header from "./components/Header";
import ScenicSpot from "./components/ScenicSpot";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const city = useState("");

  return (
    <CityContext.Provider value={city}>
      <Router>
        <Header />
        <ScenicSpot />
      </Router>
    </CityContext.Provider>
  );
}

export default App;
