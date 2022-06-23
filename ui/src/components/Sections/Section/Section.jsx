import React from "react";
import { useDispatch } from "react-redux";
import {
  setCoordinatesJetty,
  setDevicesJetty,
  setSectionId,
  setZoneId,
} from "../../../redux/ISMS_Slice";
import "./Section.css";

function Section({ jetty, coordinates, sectionId }) {
  const dispatch = useDispatch();
  const handleJettyClick = () => {
    dispatch(setCoordinatesJetty(coordinates));
    dispatch(setDevicesJetty(jetty));
    dispatch(setZoneId(""));
    dispatch(setSectionId(sectionId));
  };

  return (
    <div className="Section">
      <button onClick={handleJettyClick}>{jetty}</button>
    </div>
  );
}

export default Section;
