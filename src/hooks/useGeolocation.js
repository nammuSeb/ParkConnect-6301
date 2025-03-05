import { useState, useEffect } from 'react';

const useGeolocation = (options = {}) => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: null, lng: null },
    error: null
  });

  const onSuccess = (position) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      },
      error: null
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      coordinates: { lat: null, lng: null },
      error: {
        code: error.code,
        message: error.message
      }
    });
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation({
        loaded: true,
        error: {
          code: 0,
          message: "La géolocalisation n'est pas supportée"
        }
      });
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      onSuccess,
      onError,
      options
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [options]);

  return location;
};

export default useGeolocation;