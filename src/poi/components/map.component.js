import { useEffect, useMemo, useRef, useState } from "react";
import { Container } from "@mui/material";
import {
  FeatureGroup,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import placeIcon from "../../assets/place.svg";
import MarkerClusterGroup from "react-leaflet-cluster";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

// work around broken icons when using webpack, see https://github.com/PaulLeCam/react-leaflet/issues/255

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-shadow.png",
});

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

const Map = ({
  center,
  markers = [],
  updateMarker,
  zoom = 15,
  edit = false,
  edges = [],
  onCreateShape = () => {}
}) => {
  const [map, setMap] = useState(null);
  const lastLayerRef = useRef();
  const featureGroupRef = useRef();

  useEffect(() => {
    if (map) {
      const cent = center?.latitude
        ? [center.latitude, center.longitude]
        : DEFAULT_CENTER;
      map.setView(cent, zoom);
    }
  }, [center, map, zoom]);

  const onCreated = (e) => {
    let type = e.layerType;
    if (type === "polygon") {
      lastLayerRef.current = e.layer;
      console.log("shape created", e.layer.getLatLngs()[0]);
      onCreateShape(e.layer.getLatLngs()[0].map(el => ({ latitude: el.lat, longitude:el.lng})));
    }
  };

  const onDeleted = (e) => {
    const deleted = e.layers.getLayers().length > 0;
    if (deleted) {
      console.log("shape delete", e.layers.getLayers()[0]);
    }
  };

  useEffect(() => {
    if (featureGroupRef.current && edges?.length > 0) {
      const geoGson = new L.GeoJSON({
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [edges.map((edge) => [edge.longitude, edge.latitude])],
        },
      });
      geoGson.eachLayer((layer) => {
        lastLayerRef.current = layer;
        featureGroupRef.current.addLayer(layer);
      });
    }
  }, [featureGroupRef.current, edges]);

  const onDrawStart = () => {
    if (featureGroupRef.current && lastLayerRef.current) {
      featureGroupRef.current.removeLayer(lastLayerRef.current);
      lastLayerRef.current = null;
    }
  };

  return (
    <Container style={{ height: "300px" }}>
      <MapContainer
        center={[
          center?.latitude || DEFAULT_CENTER[0],
          center?.longitude || DEFAULT_CENTER[1],
        ]}
        zoom={zoom}
        style={{ height: "100%", minHeight: "100%" }}
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FeatureGroup ref={featureGroupRef}>
          {edit ? (
            <EditControl
              position="topright"
              onCreated={onCreated}
              onDeleted={onDeleted}
              onDrawStart={onDrawStart}
              edit={{ remove: true, edit: true }}
              draw={{
                polygon: { allowIntersection: false },
                rectangle: false,
                circle: false,
                circlemarker: false,
                marker: false,
                polyline: false,
              }}
            />
          ) : null}
        </FeatureGroup>
        <MarkerClusterGroup chunkedLoading>
          {markers.map((marker) => (
            <DraggableMarker
              key={marker.id}
              draggable={marker.draggable}
              marker={marker}
              updateMarker={updateMarker}
            >
              {<Popup>{marker.displayName}</Popup>}
            </DraggableMarker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </Container>
  );
};

export default Map;
