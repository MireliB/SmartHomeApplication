import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Homepage.module.css";
import Header from "../Header";

const homepageContainer = {
  homeHeader: (
    <h2 className={classes["homepage-header"]}>
      Make Your Home Smart and Comfortable
    </h2>
  ),
  homePara: (
    <p className={classes["homepage-para"]}>
      Our smart solutions elevate your living environment,
      <br /> bringing together innovation and comfort in perfect harmony
    </p>
  ),
};

export default function Homepage({}) {
  const [lightsOn, setLightsOn] = useState(false);
  const [temp, setTemp] = useState(72);
  const nav = useNavigate();

  const toggleLigts = () => {
    setLightsOn((prev) => !prev);
  };

  const increaseTemp = () => {
    setTemp(temp + 1);
  };

  const decreaseTemp = () => {
    setTemp(temp - 1);
  };

  const dashboardPanelMovementHandler = () => {};

  return (
    <div className={classes["homepage-container"]}>
      {/* {homepageContainer.homeHeader}

      {homepageContainer.homePara} */}
      <Header
        title={"Make Your Home Smart and Comfortable"}
        subtitle={
          "Our smart solutions elevate your living environment, bringing together innovation and comfort in perfect harmony"
        }
      />
      <button
        onClick={() => {
          nav("/dashboard");
        }}
      >
        DASHBOARD PANEL
      </button>
    </div>
  );
}
