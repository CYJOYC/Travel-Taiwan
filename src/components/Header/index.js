import { BrowserRouter as Router, Link } from "react-router-dom";
import { useContext } from "react";
import CityContext from "../../CityContext";

function Header() {
  const [cityChosen, setCityChosen] = useContext(CityContext);

  const cities = [
    // { id: "", name: "所有縣市" },
    { id: "Taipei", name: "台北市" },
    { id: "NewTaipei", name: "新北市" },
    { id: "Taoyuan", name: "桃園市" },
    { id: "Taichung", name: "台中市" },
    { id: "Tainan", name: "台南市" },
    { id: "Kaohsiung", name: "高雄市" },
    { id: "Keelung", name: "基隆市" },
    { id: "Hsinchu", name: "新竹市" },
    { id: "HsinchuCounty", name: "新竹縣" },
    { id: "MiaoliCounty", name: "苗栗縣" },
    { id: "ChanghuaCounty", name: "彰化縣" },
    { id: "NantouCounty", name: "南投縣" },
    { id: "YunlinCounty", name: "雲林縣" },
    { id: "ChiayiCounty", name: "嘉義縣" },
    { id: "Chiayi", name: "嘉義市" },
    { id: "PingtungCounty", name: "屏東縣" },
    { id: "YilanCounty", name: "宜蘭縣" },
    { id: "HualienCounty", name: "花蓮縣" },
    { id: "TaitungCounty", name: "台東縣" },
    { id: "KinmenCounty", name: "金門縣" },
    { id: "PenghuCounty", name: "澎湖縣" },
    { id: "LienchiangCounty", name: "連江縣" },
  ];

  return (
    <Router>
      <div className="city-nav">
        <Link
          className={cityChosen === "" ? "item-active city-item" : "city-item"}
          to="/scenicSpot"
          key={""}
          onClick={() => {
            setCityChosen("");
          }}
        >
          所有縣市
        </Link>
        {cities.map((city) => (
          <Link
            className={
              cityChosen === city.id ? "item-active city-item" : "city-item"
            }
            to={"/scenicSpot/" + city.id}
            key={city.id}
            onClick={() => {
              setCityChosen(city.id);
            }}
          >
            {city.name}
          </Link>
        ))}
      </div>
    </Router>
  );
}

export default Header;
