import React, { useEffect, useState } from "react";
import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import L from "leaflet";

import osm from "../config/osm-providers";
import Markers from "./Markers";
import ORS_KEY from "../config/orsKey";

const ZOOM_LEVEL = 17;

// const polyline: LatLngExpression[] | LatLngExpression[][] = [
//   [22.427509, 114.205905],
//   [22.427513, 114.2055],
// ];

const LeafletMap: React.FC = () => {
  const [center] = useState({
    lat: 22.427509,
    lng: 114.205905,
  });
  const [markers, setMarkers] = useState<L.LatLng[]>([]);
  const [polyline, setPolyline] = useState<[number, number][][]>([]);
  const [disableMarkers, setDisableMarkers] = useState<boolean>(false);

  const getPath = async (pos1: number, pos2: number) => {
    const res = await fetch(
      `https://api.openrouteservice.org/v2/directions/foot-walking?api_key=${ORS_KEY}&start=${markers[pos1].lng},${markers[pos1].lat}&end=${markers[pos2].lng},${markers[pos2].lat}`
    );
    return res.json();
  };

  useEffect(() => {
    setPolyline([]);

    if (markers.length >= 2) {
      for (let i = 0; i < markers.length - 1; i++) {
        getPath(i, i + 1).then((path) => {
          const polylines = path.features[0].geometry.coordinates.map(
            (latlngs) => [latlngs[1], latlngs[0]]
          );

          setPolyline((prev) => [...prev, polylines]);
        });
      }
    }
  }, [markers]);

  return (
    <>
      <div>
        <MapContainer center={center} zoom={ZOOM_LEVEL}>
          <TileLayer
            url={osm.maptiler.url}
            attribution={osm.maptiler.attribution}
          />

          {!disableMarkers && (
            <Markers markers={markers} setMarkers={setMarkers} />
          )}

          {polyline &&
            polyline.map((_, i) => (
              <Polyline
                key={`polyline-${i}`}
                color={"red"}
                positions={polyline}
              />
            ))}
        </MapContainer>
        <button onClick={() => setMarkers((prev) => prev.slice(0, -1))}>
          Remove last marker
        </button>
        <button onClick={() => setDisableMarkers((prev) => !prev)}>
          Toggle markers
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
