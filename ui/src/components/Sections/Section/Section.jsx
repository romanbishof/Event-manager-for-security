import React from "react";
import { useDispatch } from "react-redux";
import {
  setCoordinatesJetty,
  setDevicesJetty,
  setZoneId,
} from "../../../redux/ISMS_Slice";
import "./Section.css";

function Section({ jetty, coordinates }) {
  const dispatch = useDispatch();
  const handleJettyClick = () => {
    dispatch(setCoordinatesJetty(coordinates));
    dispatch(setDevicesJetty(jetty));
    dispatch(setZoneId(""));
  };

  return (
    <div className="Section">
      <button onClick={handleJettyClick}>{jetty}</button>
    </div>
  );
}

export default Section;
