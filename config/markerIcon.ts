import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl: "/marker.png",
  iconSize: [45, 45],
  iconAnchor: [17, 46], // [left/right, top/bottom]
  popupAnchor: [3, -46],
});

export default markerIcon;
