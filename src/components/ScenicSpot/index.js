import CityContext from "../../CityContext";
import { useContext, useState, useEffect } from "react";
// import useStateWithCallbackLazy from "use-state-with-callback";
import useInfiniteScroll from "react-infinite-scroll-hook";

const ScenicSpot = () => {
  const [city] = useContext(CityContext);
  const [page, setPage] = useState("0");
  const [scenicSpots, setScenicSpots] = useState([]);
  const [cityChange, setCityChange] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);

  const fetchData = (page) => {
    // if (hasNextPage) {
    let scenicSpotUrl =
      "https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/" +
      city +
      "?$top=30&$skip=" +
      page +
      "&$format=JSON";

    fetch(scenicSpotUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log("fetch");
        setScenicSpots([...scenicSpots, ...data]);
        setLoadMore(false);
        console.log(data.length);
        if (data.length < 30) {
          setHasNextPage(false);
        }
      })
      .catch(console.error);
    // }
  };

  useEffect(() => {
    if (cityChange === true) {
      console.log("cityChange");
      fetchData(page);
      setCityChange(false);
    }
  }, [cityChange]);

  useEffect(() => {
    console.log("city");
    setScenicSpots([]);
    setPage("0");
    setHasNextPage(true);
    setCityChange(true);
  }, [city]);

  const handleLoadMore = () => {
    console.log("loadMore");
    setLoadMore(true);
    let newPage = String(parseInt(page) + 30);
    setPage(newPage);
    fetchData(newPage);
  };

  const infiniteRef = useInfiniteScroll({
    loadMore,
    hasNextPage: true,
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
      <div className="load-more">{loadMore ? "下載更多景點中..." : ""}</div>
      <div className="no-more">{hasNextPage ? "" : "已無其他景點"}</div>
      {/* {loadMore ? <div className="load-more">Loading More</div> : <div>Not Loading</div>} */}
      {/* <div className="loading" ref={loader}>
        Load More
      </div> */}
      {/* <button onClick={fetchMore}>Fetch More</button> */}
    </div>
  );
};

export default ScenicSpot;
