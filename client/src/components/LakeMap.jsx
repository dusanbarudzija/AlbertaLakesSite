import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";
import { C, levelColor } from "../constants";

// Fix default marker icons broken by Vite bundling
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function FlyTo({ lake }) {
  const map = useMap();
  useEffect(() => {
    if (lake?.latitude && lake?.longitude) {
      map.flyTo([lake.latitude, lake.longitude], 11, { duration: 1 });
    }
  }, [lake, map]);
  return null;
}

export default function LakeMap({ lakes, selectedLake, onSelectLake }) {
  const mappableLakes = lakes.filter(l => l.latitude && l.longitude);

  return (
    <MapContainer
      center={[53.5, -113.5]}
      zoom={7}
      style={{ height: "100%", width: "100%", borderRadius: 12 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {mappableLakes.map(lake => {
        const lc = levelColor(lake.level);
        return (
          <Marker
            key={lake._id}
            position={[lake.latitude, lake.longitude]}
            eventHandlers={{ click: () => onSelectLake(lake) }}
          >
            <Popup>
              <strong>{lake.name}</strong>
              {lake.beachName && <div style={{ fontSize: 12 }}>{lake.beachName}</div>}
              <div style={{ marginTop: 4 }}>
                <span style={{ color: lc.text, fontWeight: 600 }}>{lake.level}</span> algae level
              </div>
            </Popup>
          </Marker>
        );
      })}
      <FlyTo lake={selectedLake} />
    </MapContainer>
  );
}
