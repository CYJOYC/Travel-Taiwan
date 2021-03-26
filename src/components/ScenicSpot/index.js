import CityContext from "../../CityContext";
import { useContext, useState, useEffect } from "react";

const ScenicSpot = () => {
  const [city] = useContext(CityContext);
  const [page, setPage] = useState("0");
  const [scenicSpots, setScenicSpots] = useState([]);
  const [cityChange, setCityChange] = useState(false);
  const [loading, setloading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isBottom, setIsBottom] = useState(false);

  function fetchData(page) {
    if (hasNextPage) {
      let scenicSpotUrl =
        "https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot" +
        city +
        "?$top=30&$skip=" +
        page +
        "&$format=JSON";

      fetch(scenicSpotUrl)
        .then((res) => res.json())
        .then((data) => {
          setCityChange(false);
          setScenicSpots([...scenicSpots, ...data]);
          setloading(false);
          setIsBottom(false);
          if (data.length < 30) {
            setHasNextPage(false);
          }
        })
        .catch(console.error);
    }
  }

  function handleScroll() {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    if (scrollTop + window.innerHeight >= scrollHeight) {
      setIsBottom(true);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isBottom && hasNextPage) {
      setloading(true);
      let newPage = String(parseInt(page) + 30);
      setPage(newPage);
      fetchData(newPage);
    }
  }, [isBottom]);

  useEffect(() => {
    if (cityChange === true) {
      fetchData(page);
    }
  }, [cityChange]);

  useEffect(() => {
    setScenicSpots([]);
    setPage("0");
    setloading(true);
    setHasNextPage(true);
    setCityChange(true);
  }, [city]);

  return (
    <>
      <div className="spots-list-background">
        <div id="spots-list">
          {scenicSpots.map((scenicSpot) => {
            return (
              <div className="spot-item" key={scenicSpot.ID}>
                <div className="spot-item-name">{scenicSpot.Name}</div>
                <div className="spot-item-description">
                  {scenicSpot.Description === undefined
                    ? "暫無景點介紹"
                    : scenicSpot.Description}
                </div>
              </div>
            );
          })}
        </div>
        <div className="load-more">{loading ? "下載更多景點中..." : ""}</div>
        <div className="no-more">{hasNextPage ? "" : "已無其他景點"}</div>
      </div>
      {scenicSpots.length === 0 ? (
        <div className="loading">景點下載中</div>
      ) : (
        <></>
      )}
      ;
    </>
  );
};

export default ScenicSpot;
