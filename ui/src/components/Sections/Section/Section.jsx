import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCoordinatesJetty,
  setDevicesJetty,
  setSectionId,
} from "../../../redux/ISMS_Slice";
import "./Section.css";

function Section({ jetty, coordinates, sectionId }) {
  const state = useSelector((state) => state.ISMS);
  const dispatch = useDispatch();
  // const [selectedJetty, setSeletedJetty] = useState(null);

  const handleJettyClick = () => {
    dispatch(setCoordinatesJetty(coordinates));
    dispatch(setDevicesJetty(jetty));
    dispatch(setSectionId(sectionId));
  };

  useEffect(() => {}, [state.SectionId]);

  return (
    <div
      className={`Section ${
        state.SectionId === sectionId ? "Section__selected" : ""
      }`}
    >
      <button onClick={handleJettyClick}>{jetty}</button>
    </div>
  );
}

export default Section;
