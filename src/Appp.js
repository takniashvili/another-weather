import { useState, useEffect } from "react";
import "./index.css";
import morningIcon from "./images/icons/icon-sun.svg";
export default function Appp() {
  const [info, setInfo] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [closing, setClosing] = useState(false);
  const apiKey = "35b1f1d45a7b4378cf2430ae601816be";
  const inputValue = "Tbilisi,ge";

  const handleMoreClick = () => {
    if (showMore) {
      setClosing(true); // Start closing animation
      setTimeout(() => {
        setShowMore(false); // Hide after animation duration
        setClosing(false); // Reset closing state
      }, 500); // 500ms should match your CSS animation duration
    } else {
      setShowMore(true); // Show without delay
    }
  };

  useEffect(() => {
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`;

    const fetchWeatherData = () => {
      fetch(weatherApiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setInfo(data);
          // console.log(data);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    };

    fetchWeatherData();

    const updateTimeAndGreetings = () => {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();
      let greeting = "GOOD MORNING";

      if (currentHour >= 12 && currentHour < 17) {
        greeting = "GOOD AFTERNOON";
      } else if (currentHour >= 17 && currentHour < 24) {
        greeting = "GOOD EVENING";
      } else if (currentHour >= 0 && currentHour < 5) {
        greeting = "GOOD NIGHT";
      }

      const options = {
        timeZone: "Asia/Tbilisi",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };
      const formattedTime = currentTime.toLocaleTimeString("en-US", options);
      document.getElementById("current-time").textContent = formattedTime;
      document.getElementById("greeting").textContent = greeting;
    };

    const intervalId = setInterval(updateTimeAndGreetings, 1000);

    return () => clearInterval(intervalId);
  }, [apiKey, inputValue]);

  return (
    <div className="footer">
      <div className="icon-and-greeting">
        <img src={morningIcon} alt="morning-icon" />
        <p id="greeting">Loading...</p>
      </div>
      <span id="current-time"></span>
      {info && info.name && info.sys ? (
        <div>
          <p className="in-tbilisi-ge">
            In {info.name}, {info.sys.country}
          </p>
          <div className="just-padding">
            <div
              className={`more-less-button ${
                showMore ? "show-less" : "show-more"
              }`}
              onClick={handleMoreClick}
            >
              <div className="more-less-text more-text">MORE</div>
              <div className="more-less-text less-text">LESS</div>
            </div>
          </div>
          {showMore && (
            <div className={`more-information ${closing ? "Closing" : ""}`}>
              <div className="info-div">
                {" "}
                <div className="info-text1"> TEMPERATURE </div>{" "}
                <div className="info-text2"> {info.main.temp}°C </div>
              </div>
              <div className="info-div">
                {" "}
                <div className="info-text1">WEATHER</div>{" "}
                <div className="info-text2">{info.weather[0].description}</div>
              </div>
              <div className="info-div">
                <div className="info-text1"> WIND SPEED METERS PER SECOND </div>
                <div className="info-text2"> {info.wind.speed} </div>
              </div>
              <div className="info-div">
                {" "}
                <div className="info-text1">WIND DIRECTION DEGREES</div>{" "}
                <div className="info-text2">{info.wind.deg} </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
}
