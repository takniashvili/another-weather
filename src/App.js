import "./index.css";
import { useEffect, useState } from "react";
import refreshIcon from "./images/icons/icon-refresh.png";

export default function App() {
  const [state, setState] = useState("");

  const api = () => {
    fetch("https://api.quotable.io/random?minLength=100&maxLength=140")
      .then((response) => response.json())
      .then((data) => setState(data))
      .catch((error) => console.error("Error fetching quote:", error));
  };

  useEffect(() => {
    api();
  }, []);

  function handleRefresh() {
    api();
  }

  return (
    <div className="header">
      <div className="content-and-icon-flex">
        <div className="header-content">
          <p> "{state.content}" </p>
        </div>
        <div className="header-refresh-icon">
          <img
            className="refresh-icon"
            src={refreshIcon}
            alt="refresh-icon"
            onClick={handleRefresh}
          />
        </div>
      </div>
      <div className="header-content-author">
        <h3> {state.author} </h3>
      </div>
    </div>
  );
}
