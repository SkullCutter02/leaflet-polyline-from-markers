import React, { Dispatch, SetStateAction, useRef } from "react";
import { Marker } from "react-leaflet";
import L, { LatLng } from "leaflet";

import markerIcon from "../config/markerIcon";

interface Props {
  i: number;
  marker: L.LatLng;
  setMarkers: Dispatch<SetStateAction<LatLng[]>>;
}

const MarkerWithRef: React.FC<Props> = ({ i, marker, setMarkers }) => {
  const markerRef = useRef<L.Marker>(null);

  const eventHandlers = (i: number) => ({
    dragend() {
      if (markerRef.current != null) {
        setMarkers((prev) => {
          const newMarkers = [...prev];
          newMarkers[i] = markerRef.current.getLatLng();
          return newMarkers;
        });
      }
    },
  });

  return (
    <>
      <Marker
        ref={markerRef}
        draggable
        eventHandlers={eventHandlers(i)}
        icon={markerIcon}
        position={marker}
      />
    </>
  );
};

export default MarkerWithRef;
