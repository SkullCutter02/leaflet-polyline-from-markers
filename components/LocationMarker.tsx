import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { LatLng } from "leaflet";

import markerIcon from "../config/markerIcon";
import MarkerWithRef from "./MarkerWithRef";

interface Props {
  markers: LatLng[];
  setMarkers: Dispatch<SetStateAction<LatLng[]>>;
}

const LocationMarker: React.FC<Props> = ({ setMarkers, markers }) => {
  const map = useMapEvents({
    click(e) {
      setMarkers((prev) => [...prev, e.latlng]);
    },
    locationfound(e) {
      map.flyTo(e.latlng, map.getZoom(), { animate: true });
    },
  });

  return (
    <>
      {markers.map((marker, i) => (
        <MarkerWithRef i={i} marker={marker} setMarkers={setMarkers} />
      ))}
    </>
  );
};

export default LocationMarker;
