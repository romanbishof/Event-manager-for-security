import { imageOverlay } from "leaflet";
import React, { useEffect } from "react";
import { TileLayer, useMap, useMapEvent } from "react-leaflet";
import { useSelector } from "react-redux";
import apapa_jetty from "../../images/apapa_jetty.png";
import atlas_jetty from "../../images/atlas_jetty.png";
import calabar_jetty from "../../images/calabar_jetty.png";
import okrika_jetty from "../../images/okrika_jetty.png";
import warri_jetty from "../../images/warri_jetty.png";

function MapComponent() {
  const state = useSelector((state) => state.ISMS);

  const map = useMap();

  const bounds = {
    apapa: [
      [6.45241, 3.36908],
      [6.4576, 3.3739],
    ],
    atlas: [
      [6.40555, 3.3866],
      [6.41787, 3.39844],
    ],
    calabar: [
      [8.32159, 4.98318],
      [8.32331, 4.98493],
    ],
    okrika: [
      [7.08312, 4.71875],
      [7.08941, 4.72508],
    ],
    warri: [
      [5.69242, 5.53459],
      [5.69863, 5.54087],
    ],
  };

  const apapaImage = imageOverlay(apapa_jetty, bounds.apapa).addTo(map);
  const atlasImage = imageOverlay(atlas_jetty, bounds.atlas).addTo(map);
  const calabarImage = imageOverlay(calabar_jetty, bounds.calabar).addTo(map);
  const okrikaImage = imageOverlay(okrika_jetty, bounds.okrika).addTo(map);
  const warriImage = imageOverlay(warri_jetty, bounds.warri).addTo(map);

  useEffect(() => {
    map.panTo(state.Center);
    map.setZoom(17);
  }, [state]);
  return (
    <div>
      <TileLayer url={process.env.REACT_APP_API_MAP} />
    </div>
  );
}

export default MapComponent;
