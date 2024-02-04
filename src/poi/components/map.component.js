import { Container } from "@mui/material";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import placeIcon from "../../assets/place.svg";
import { Icon } from "leaflet";
import { useEffect, useMemo, useRef, useState } from "react";

const customIcon = new Icon({
  iconUrl: placeIcon,
  iconSize: [35, 35],
});

const DEFAULT_CENTER = [43.1403645, 13.0688];

const DraggableMarker = ({ marker, updateMarker, draggable, children }) => {
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          console.log(marker);
          const { lat, lng } = marker.getLatLng();
          updateMarker(marker, { latitude: lat, longitude: lng });
        }
      },
    }),
    [updateMarker]
  );
  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={[marker.latitude, marker.longitude]}
      icon={customIcon}
      ref={markerRef}
    >
      <Popup minWidth={90}>{children}</Popup>
    </Marker>
  );
};

const Map = ({ center, markers = [], updateMarker }) => {
  const [map, setMap] = useState(null);
  useEffect(() => {
    if (map) {
      const cent = center?.latitude
        ? [center.latitude, center.longitude]
        : DEFAULT_CENTER;
      map.setView(cent, 15);
    }
  }, [center, map]);
  return (
    <Container style={{ height: "300px" }}>
      <MapContainer
        center={[center.latitude, center.longitude]}
        zoom={15}
        style={{ height: "100%", minHeight: "100%" }}
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {markers.map((marker) => (
          <DraggableMarker
            key={marker.id}
            draggable={marker.draggable}
            marker={marker}
            updateMarker={updateMarker}
          >
            {marker.label && <Popup>{marker.label}</Popup>}
          </DraggableMarker>
        ))}
      </MapContainer>
    </Container>
  );
};

export default Map;
