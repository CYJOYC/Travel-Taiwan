import CityContext from "../../CityContext";
import { useContext, useState, useEffect } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";

const ScenicSpot = () => {
  const [city] = useContext(CityContext);
  const [page, setPage] = useState("0");
  const [scenicSpots, setScenicSpots] = useState([]);
  const [cityChange, setCityChange] = useState(false);
  const [loading, setloading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);

  const fetchData = (page) => {
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
          setScenicSpots([...scenicSpots, ...data]);
          setloading(false);
          if (data.length < 30) {
            setHasNextPage(false);
          }
        })
        .catch(console.error);
    }
  };

  useEffect(() => {
    if (cityChange === true) {
      fetchData(page);
      setCityChange(false);
    }
  }, [cityChange]);

  useEffect(() => {
    setScenicSpots([]);
    setPage("0");
    setHasNextPage(true);
    setCityChange(true);
  }, [city]);

  const handleLoadMore = () => {
    if (hasNextPage) {
      setloading(true);
      let newPage = String(parseInt(page) + 30);
      setPage(newPage);
      fetchData(newPage);
    }
  };

  const infiniteRef = useInfiniteScroll({
    loading,
    hasNextPage: hasNextPage,
    onLoadMore: handleLoadMore,
    scrollContainer: "window",
  });

  return (
    <div className="spots-list-background" ref={infiniteRef}>
      {scenicSpots.length === 0 ? (
        <div className="loading">景點下載中</div>
      ) : (
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
      )}
      <div className="load-more">{loading ? "下載更多景點中..." : ""}</div>
      <div className="no-more">{hasNextPage ? "" : "已無其他景點"}</div>
    </div>
  );
};

export default ScenicSpot;
