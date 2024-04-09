import { useState, useEffect } from "react";

interface Coordinates {
  latitude: number;
  longitude: number;
}

const useUserLocation = (): Coordinates | null => {
  const [location, setLocation] = useState<Coordinates | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);

  return location;
};

export default useUserLocation;
