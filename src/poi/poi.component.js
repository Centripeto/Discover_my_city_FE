import { Container } from "@mui/material";
import "leaflet/dist/leaflet.css";
import placeIcon from "../assets/place.svg"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import { useMemo, useRef, useState } from "react";
const markers = [
  {
    geocode: [43.2927794620618, 13.439146199210253],
    popUp: "Casa",
  }
];

// create custom icon
const customIcon = new Icon({
  iconUrl : placeIcon,
  iconSize : [35, 35]
});

// draggable marker
const DraggableMarker = ({center, draggable, children }) => {
  const [position, setPosition] = useState(center)
  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng())
        }
      },
    }),
    [],
  )

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      icon={customIcon}
      ref={markerRef}>
      <Popup minWidth={90}>
        {children}
      </Popup>
    </Marker>
  )
}


function Poi() {
  const sumMarkers = markers.reduce((acc, next) => [acc[0] + next.geocode[0], acc[1] + next.geocode[1]], [0, 0])
  const [center] = useState([sumMarkers[0] / markers.length, sumMarkers[1] / markers.length])
  return (
    <Container style={{height: '300px'}}>
      <MapContainer
        center={center}
        zoom={15}
        style={{ height: "100%", minHeight: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Mapping through the markers */}
        {markers.map((marker) => (
          // <Marker key={marker.geocode.join()} position={marker.geocode} icon={customIcon}>
          //   <Popup>{marker.popUp}</Popup>
          // </Marker>
          <DraggableMarker key={marker.geocode.join()} draggable center={marker.geocode}>
            <Popup>{marker.popUp}</Popup>
          </DraggableMarker>
        ))}

        {/* Hard coded markers */}
        {/* <Marker position={[51.505, -0.09]} icon={customIcon}>
              <Popup>This is popup 1</Popup>
            </Marker>
            <Marker position={[51.504, -0.1]} icon={customIcon}>
              <Popup>This is popup 2</Popup>
            </Marker>
            <Marker position={[51.5, -0.09]} icon={customIcon}>
              <Popup>This is popup 3</Popup>
            </Marker>
          */}
      </MapContainer>
    </Container>
  );
}

export default Poi;
