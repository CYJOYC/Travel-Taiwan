import CityContext from "../../CityContext";
import { useContext } from "react";

const ScenicSpot = () => {
  const [city] = useContext(CityContext);
  return <div>{city}</div>;
};

export default ScenicSpot;
