import React, { useEffect, useState } from "react";
import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";

import osm from "../config/osm-providers";
import LocationMarker from "./LocationMarker";
import ORS_KEY from "../config/orsKey";

const ZOOM_LEVEL = 15;

// const polyline: LatLngExpression[] | LatLngExpression[][] = [
//   [22.427509, 114.205905],
//   [22.427513, 114.2055],
// ];

const LeafletMap: React.FC = () => {
  const [map, setMap] = useState<L.Map>(null);
  const [center, setCenter] = useState({
    lat: 22.427509,
    lng: 114.205905,
  });
  const [markers, setMarkers] = useState<L.LatLng[]>([]);
  const [polyline, setPolyline] = useState<[number, number][]>(null);

  const getPath = async () => {
    const res = await fetch(
      `https://api.openrouteservice.org/v2/directions/foot-walking?api_key=${ORS_KEY}&start=${markers[0].lng},${markers[0].lat}&end=${markers[1].lng},${markers[1].lat}`
    );
    return res.json();
  };

  useEffect(() => {
    if (markers.length >= 2) {
      getPath().then((path) => {
        const polylines = path.features[0].geometry.coordinates.map(
          (latlngs) => [latlngs[1], latlngs[0]]
        );

        setPolyline(polylines);
      });
    }
  }, [markers]);

  return (
    <>
      <div>
        <MapContainer center={center} zoom={ZOOM_LEVEL} whenCreated={setMap}>
          <TileLayer
            url={osm.maptiler.url}
            attribution={osm.maptiler.attribution}
          />

          <LocationMarker markers={markers} setMarkers={setMarkers} />

          {polyline &&
            polyline.map((latlng) => (
              <Polyline
                key={`${latlng[0]}-${latlng[1]}`}
                color={"red"}
                positions={polyline}
              />
            ))}

          {/*<Polyline pathOptions={{ fillColor: "red" }} positions={polyline} />*/}
        </MapContainer>
        <button onClick={() => setMarkers((prev) => prev.slice(0, -1))}>
          Remove last marker
        </button>
      </div>

      <style jsx>{`
        div {
          margin: 100px auto;
          width: 70%;
          height: 600px;
        }
      `}</style>
    </>
  );
};

export default LeafletMap;
