import { imageOverlay } from "leaflet";
import React, { useEffect } from "react";
import { useMap, useMapEvent } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import apapa_jetty_img from "../../images/Apapa - Copy.jpg";
import warri_jetty_img from "../../images/Warri - Copy.jpg";
import atlas_jetty_img from "../../images/ATLAS COVE_2.jpg";
import calabar_jetty_img from "../../images/Calabar - Copy.jpg";
import okrika_jetty_img from "../../images/Okrika 2.jpg";
import MapMarker from "./MapMarker";
import { setDevicesJetty } from "../../redux/ISMS_Slice";

// dandles the overlay of the map and hendles the viulazation of markers on map

function MapComponent() {
  const state = useSelector((state) => state.ISMS);
  const dispatch = useDispatch();

  window.mainMap = useMap();

  // const mapEvents = useMapEvent({
  //   click: (e) => {
  //     let coordinates = e.latlng;
  //     // setMarkers([...markers, coordinates]);
  //   },
  //   zoom: (e) => {
  //     console.log(e.target._zoom);
  //   },
  //   // moveend: (e) => {
  //   //   console.log(e.target);
  //   // },
  // });

  // map image overlay bounds

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

  const apapaImage = imageOverlay(apapa_jetty_img, bounds.apapa).addTo(
    window.mainMap
  );
  const atlasImage = imageOverlay(atlas_jetty_img, bounds.atlas).addTo(
    window.mainMap
  );
  const calabarImage = imageOverlay(calabar_jetty_img, bounds.calabar).addTo(
    window.mainMap
  );
  const okrikaImage = imageOverlay(okrika_jetty_img, bounds.okrika).addTo(
    window.mainMap
  );
  const warriImage = imageOverlay(warri_jetty_img, bounds.warri).addTo(
    window.mainMap
  );

  // Setting the right pan for our Jetty
  useEffect(() => {
    switch (state.SectionId) {
      case 21: // setting ATLAS Jetty
        window.mainMap.setView(state.Center, 16.5);
        // window.mainMap.setZoom(16.5);
        window.mainMap.setMaxZoom(18);

        break;
      case 20: // Setting APAPA Jetty
        window.mainMap.setView(state.Center, 17);
        // window.mainMap.setZoom(17);
        window.mainMap.setMaxZoom(19);

        break;
      case 22: // Setting CALABAR Jetty
        window.mainMap.setView(state.Center, 19);
        // window.mainMap.setZoom(19);
        window.mainMap.setMaxZoom(20);

        break;
      case 25: // Setting OKRIKA Jetty
        window.mainMap.setView(state.Center, 17.5);
        // window.mainMap.setZoom(17.5);
        window.mainMap.setMaxZoom(18);

        break;
      case 23: // Setting WARRI Jetty
        window.mainMap.setView(state.Center, 17.5);
        // window.mainMap.setZoom(17.5);
        window.mainMap.setMaxZoom(18);

        break;
      default:
        break;
    }
  }, [state.Center]);

  // check if event selected to see on map - pan to marker and change the jetty selection
  useEffect(() => {
    if (!state.event?.show) {
      console.log("No event selected");
      return;
    } else {
      console.log("Selected new event");
      // window.mainMap.setView(state.event.coordinates, 17);
      // document.getElementById(state.event.InvokerId).classList.add("alert");
      if (apapaImage.getBounds().contains(state.event.coordinates)) {
        dispatch(setDevicesJetty(20));
        setTimeout(() => {
          window.mainMap.setView(state.event.coordinates, 17);
          document.getElementById(state.event.InvokerId).classList.add("alert");
        }, 100);
      }
      if (atlasImage.getBounds().contains(state.event.coordinates)) {
        dispatch(setDevicesJetty(21));
        setTimeout(() => {
          window.mainMap.setView(state.event.coordinates, 17);
          document.getElementById(state.event.InvokerId).classList.add("alert");
        }, 100);
      }
      if (calabarImage.getBounds().contains(state.event.coordinates)) {
        dispatch(setDevicesJetty(22));
        setTimeout(() => {
          window.mainMap.setView(state.event.coordinates, 17);
          document.getElementById(state.event.InvokerId).classList.add("alert");
        }, 100);
      }
      if (okrikaImage.getBounds().contains(state.event.coordinates)) {
        dispatch(setDevicesJetty(25));
        setTimeout(() => {
          window.mainMap.setView(state.event.coordinates, 17);
          document.getElementById(state.event.InvokerId).classList.add("alert");
        }, 100);
      }
      if (warriImage.getBounds().contains(state.event.coordinates)) {
        dispatch(setDevicesJetty(23));
        setTimeout(() => {
          window.mainMap.setView(state.event.coordinates, 17);
          document.getElementById(state.event.InvokerId).classList.add("alert");
        }, 100);
      }
    }
  }, [state.event]);

  return (
    <div>
      {state.markers.lenth === 0
        ? ""
        : state.markers.map((marker) => {
            return (
              <MapMarker
                key={marker.id}
                id={marker.id}
                coordinates={marker.coordinates}
                img={marker.icon}
                name={marker.name}
                isDraggable={false}
                isSettings={false}
                status={marker.status}
                type={marker.type}
              />
            );
          })}
    </div>
  );
}

export default MapComponent;
