import CityContext from "../../CityContext";
import { useContext, useState, useEffect } from "react";
// import useStateWithCallbackLazy from "use-state-with-callback";

const ScenicSpot = () => {
  const [city] = useContext(CityContext);
  const [page, setPage] = useState("0");
  const [scenicSpots, setScenicSpots] = useState([]);
  const [cityChange, setCityChange] = useState(false);

  const fetchData = (page) => {
    let scenicSpotUrl =
      "https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/" +
      city +
      "?$top=30&$skip=" +
      page +
      "&$format=JSON";
    fetch(scenicSpotUrl)
      .then((res) => res.json())
      .then((data) => {
        setScenicSpots([...scenicSpots, ...data]);
      });
  };

  useEffect(() => {
    fetchData(page);
  }, []);

  useEffect(() => {
    fetchData(page);
    setCityChange(false);
  }, [cityChange]);

  useEffect(() => {
    setScenicSpots([]);
    setPage("0");
    setCityChange(true);
  }, [city]);

  return (
    <>
      {scenicSpots.length === 0 ? (
        <div>Loading</div>
      ) : (
        scenicSpots.map((scenicSpot) => {
          return (
            <div key={scenicSpot.ID}>
              <div>{scenicSpot.Name}</div>
              {/* <div>{scenicSpot.Description}</div> */}
            </div>
          );
        })
      )}
    </>
  );
};

export default ScenicSpot;
