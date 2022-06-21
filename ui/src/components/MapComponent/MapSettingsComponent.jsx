import { icon, imageOverlay, marker, point } from "leaflet";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ImageOverlay,
  Marker,
  Pane,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import apapa_jetty_img from "../../images/Apapa - Copy.jpg";
import warri_jetty_img from "../../images/Warri - Copy.jpg";
import atlas_jetty_img from "../../images/ATLAS COVE_2.jpg";
import calabar_jetty_img from "../../images/Calabar - Copy.jpg";
import okrika_jetty_img from "../../images/Okrika 2.jpg";
import { setMarkersState } from "../../redux/ISMS_Slice";

function MapSettingsComponent() {
  const state = useSelector((state) => state.ISMS);
  const [markers, setMarkers] = useState(state.markers);
  // const [position, setPosition] = useState("");
  const [id, setId] = useState("");
  const dispatch = useDispatch();
  const markerRef = useRef(null);

  const map = useMap();

  // const mapEvents = useMapEvent({
  //   mouseup: (e) => {
  //     // let coordinates = e.latlng;
  //     // console.log(e.target);
  //   },
  //   locationfound: (location) => {
  //     console.log(location);
  //   },
  // });

  let target = document.getElementById("map");
  target.ondragstart = function (e) {
    setId(e.target.id);
  };
  target.ondragover = function (e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };
  target.ondrop = function (e) {
    e.preventDefault();
    let imagePath = e.dataTransfer.getData("text/plain");
    let coordinates = map.containerPointToLatLng(point([e.offsetX, e.offsetY]));
    markers.forEach((marker) => {});
    setMarkers([
      ...markers,
      { coordinates: coordinates, icon: imagePath, id: id },
    ]);
    dispatch(
      setMarkersState([
        ...markers,
        { coordinates: coordinates, icon: imagePath, id: id },
      ])
    );
    // createMarker(coordinates, imagePath);
  };

  // const createMarker = (coordinates, imgIcon) => {
  //   // let myDivIcon = divIcon({
  //   //   className: "Settings__Icon",
  //   //   html: `<img className="Settings__Icon-img" src=${imgIcon}/>`,
  //   // });

  //   marker(coordinates, {
  //     // icon: myDivIcon,
  //     icon: icon({ iconUrl: imgIcon, iconSize: [28, 28] }),
  //     draggable: true,
  //     attribution: "1",
  //     eventHandlers: {
  //       click: (e) => {
  //         console.log("marker clicked", e);
  //       },
  //     },
  //   }).addTo(map);
  // };

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

  useEffect(() => {
    map.panTo(state.Center);
    map.setZoom(17);
  }, [state]);

  const handleDeleteIcon = (_id) => {
    let newMarkers = markers.filter((marker) => marker.id !== _id);
    setMarkers(newMarkers);
    dispatch(setMarkersState(newMarkers));
  };

  const handleMarkerNewLocation = (location, _id) => {
    let newMarkers = markers.map((marker) => {
      return marker.id === _id ? { ...marker, coordinates: location } : marker;
    });
    console.log(newMarkers);
    setMarkers(newMarkers);
    dispatch(setMarkersState(newMarkers));
  };

  return (
    <div>
      {/* <TileLayer></TileLayer> */}
      {markers.length === 0
        ? ""
        : markers.map((marker) => {
            return (
              <div key={marker.id}>
                <Marker
                  position={marker.coordinates}
                  icon={icon({ iconUrl: marker.icon, iconSize: [28, 28] })}
                  draggable={true}
                  eventHandlers={{
                    mouseup: (e) => {
                      handleMarkerNewLocation(e.latlng, marker.id);
                    },
                  }}
                >
                  <Popup>
                    <p>Device Name</p>
                    <DeleteIcon
                      sx={{ cursor: "pointer" }}
                      fontSize="small"
                      onClick={() => handleDeleteIcon(marker.id)}
                    ></DeleteIcon>
                  </Popup>
                </Marker>
              </div>
            );
          })}
    </div>
  );
}

export default MapSettingsComponent;
