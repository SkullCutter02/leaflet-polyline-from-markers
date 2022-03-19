import React, { Dispatch, SetStateAction } from "react";
import { useMapEvents } from "react-leaflet";
import { LatLng } from "leaflet";

import MarkerWithRef from "./MarkerWithRef";

interface Props {
  markers: LatLng[];
  setMarkers: Dispatch<SetStateAction<LatLng[]>>;
}

const Markers: React.FC<Props> = ({ setMarkers, markers }) => {
  const map = useMapEvents({
    click(e) {
      if (markers.length < 15) {
        setMarkers((prev) => [...prev, e.latlng]);
      }
    },
    locationfound(e) {
      map.flyTo(e.latlng, map.getZoom(), { animate: true });
    },
  });

  return (
    <>
      {markers.map((marker, i) => (
        <MarkerWithRef
          key={"marker_" + i}
          i={i}
          marker={marker}
          setMarkers={setMarkers}
        />
      ))}
    </>
  );
};

export default Markers;
