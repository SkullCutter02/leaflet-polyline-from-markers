import { useEffect, useState } from "react";

export default function useGeoLocation() {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: null, lng: null },
    error: null,
  });

  const onSuccess = (location: GeolocationPosition) => {
    setLocation((prev) => ({
      ...prev,
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    }));
  };

  const onError = (error: GeolocationPositionError) => {
    setLocation((prev) => ({
      ...prev,
      loaded: true,
      error,
    }));
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setLocation((prev) => ({
        ...prev,
        loaded: true,
        error: {
          code: 0,
          message: "Geolocation not supported",
        },
      }));
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return location;
}
