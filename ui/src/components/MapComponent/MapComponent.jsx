import { icon, imageOverlay } from "leaflet";
import React, { useEffect, useState } from "react";
import {
  ImageOverlay,
  Marker,
  Pane,
  Rectangle,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
// import apapa_jetty from "../../images/apapa_jetty.png";
// import atlas_jetty from "../../images/atlas_jetty.png";
// import calabar_jetty from "../../images/calabar_jetty.png";
// import okrika_jetty from "../../images/okrika_jetty.png";
// import warri_jetty from "../../images/warri_jetty.png";
import apapa_jetty_img from "../../images/Apapa - Copy.jpg";
import warri_jetty_img from "../../images/Warri - Copy.jpg";
import atlas_jetty_img from "../../images/ATLAS COVE_2.jpg";
import calabar_jetty_img from "../../images/Calabar - Copy.jpg";
import okrika_jetty_img from "../../images/Okrika 2.jpg";

function MapComponent() {
  const state = useSelector((state) => state.ISMS);
  const [position, setPosition] = useState(null);
  const [markers, setMarkers] = useState(state.markers);
  const map = useMap();

  const mapEvents = useMapEvent({
    click: (e) => {
      let coordinates = e.latlng;
      console.log(coordinates);
      // setMarkers([...markers, coordinates]);
    },
  });

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

  // let outer = [
  //   [5.69242, 3.36908],
  //   [8.32331, 5.54087],
  // ];

  const apapaImage = imageOverlay(apapa_jetty_img, bounds.apapa).addTo(map);
  const atlasImage = imageOverlay(atlas_jetty_img, bounds.atlas).addTo(map);
  const calabarImage = imageOverlay(calabar_jetty_img, bounds.calabar).addTo(
    map
  );
  const okrikaImage = imageOverlay(okrika_jetty_img, bounds.okrika).addTo(map);
  const warriImage = imageOverlay(warri_jetty_img, bounds.warri).addTo(map);

  // Setting the right pan for our Jetty
  useEffect(() => {
    switch (state.SectionId) {
      case 21: // setting ATLAS Jetty
        map.panTo(state.Center);
        map.setZoom(16);
        break;
      case 20: // Setting APAPA Jetty
        map.panTo(state.Center);
        map.setZoom(18);
        break;
      case 22: // Setting CALABAR Jetty
        map.panTo(state.Center);
        map.setZoom(19);
        break;
      case 25: // Setting OKRIKA Jetty
        map.panTo(state.Center);
        map.setZoom(17);
        break;
      case 23: // Setting WARRI Jetty
        map.panTo(state.Center);
        map.setZoom(17);
        break;
      default:
        break;
    }
  }, [state]);

  return (
    <div>
      {markers.lenth === 0
        ? ""
        : markers.map((marker) => {
            return (
              <Marker
                key={marker.id}
                position={marker.coordinates}
                icon={icon({ iconUrl: marker.icon, iconSize: [28, 28] })}
                draggable={false}
              ></Marker>
            );
          })}
    </div>
  );
}

export default MapComponent;
