import { divIcon, imageOverlay } from "leaflet";
import React, { useEffect } from "react";
import { useMap, useMapEvent } from "react-leaflet";
import { useSelector } from "react-redux";
import apapa_jetty_img from "../../images/Apapa - Copy.jpg";
import warri_jetty_img from "../../images/Warri - Copy.jpg";
import atlas_jetty_img from "../../images/ATLAS COVE_2.jpg";
import calabar_jetty_img from "../../images/Calabar - Copy.jpg";
import okrika_jetty_img from "../../images/Okrika 2.jpg";
import MapMarker from "./MapMarker";

function MapComponent() {
  const state = useSelector((state) => state.ISMS);
  const map = useMap();

  // const mapEvents = useMapEvent({
  //   click: (e) => {
  //     let coordinates = e.latlng;
  //     // setMarkers([...markers, coordinates]);
  //   },
  //   zoom: (e) => {
  //     console.log(e.target._zoom);
  //   },
  // });

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
        map.setZoom(16.5);
        map.setMaxZoom(18);

        break;
      case 20: // Setting APAPA Jetty
        map.panTo(state.Center);
        map.setZoom(18);
        map.setMaxZoom(19);

        break;
      case 22: // Setting CALABAR Jetty
        map.panTo(state.Center);
        map.setZoom(19);
        map.setMaxZoom(20);

        break;
      case 25: // Setting OKRIKA Jetty
        map.panTo(state.Center);
        map.setZoom(17.5);
        map.setMaxZoom(18);

        break;
      case 23: // Setting WARRI Jetty
        map.panTo(state.Center);
        map.setZoom(17.5);
        map.setMaxZoom(18);

        break;
      default:
        break;
    }
  }, [state]);

  // useEffect(() => {
  //   state.integration.forEach((device) => {
  //     if (device.LocationX !== 0) {
  //       setMarkers([
  //         ...markers,
  //         {
  //           coordinates: { lat: device.LocationX, lng: device.LocationY },
  //           icon: hadleImageType(device.Type),
  //           id: device.Id,
  //           name: device.Name,
  //         },
  //       ]);
  //       dispatch(
  //         setMarkersState([
  //           ...markers,
  //           {
  //             coordinates: { lat: device.LocationX, lng: device.LocationY },
  //             icon: hadleImageType(device.Type),
  //             id: device.Id,
  //             name: device.Name,
  //           },
  //         ])
  //       );
  //     }
  //   });
  // }, []);

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
              />
            );
          })}
    </div>
  );
}

export default MapComponent;
