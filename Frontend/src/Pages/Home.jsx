import React, { useState, useEffect } from 'react';

function Home() {
  const [location, setLocation] = useState({ latitude: null, longitude: null, error: null });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });
        },
        (error) => {
          setLocation({ latitude: null, longitude: null, error: error.message });
        }
      );
    } else {
      setLocation({ latitude: null, longitude: null, error: 'Geolocation is not supported by this browser.' });
    }
  }, []);

  return (
    <div>
      <h1>HOME</h1>
      <h2>Your Location:</h2>
      {location.latitude && location.longitude ? (
        <p>Latitude: {location.latitude}, Longitude: {location.longitude}</p>
      ) : location.error ? (
        <p>Error: {location.error}</p>
      ) : (
        <p>Getting location...</p>
      )}
    </div>
  );
}

export default Home;
