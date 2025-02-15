import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';

const MapClickHandler = ({ setLatLng, localLat }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setLatLng(prev=>({...prev, lat, lng }));
      localLat({ lat, lng }); // Update the state with clicked lat and lng
    },
  });

  return null;
};

const MapWithClick = (props) => {
  const [latLng, setLatLng] = useState({ lat: props.current.lat, lng: props.current.lng });
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Use navigator.geolocation to get user's current position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatLng({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setReady(true);
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  // Custom icon for the marker
  const currentLocationIcon = new L.Icon({
    iconUrl: 'geo-alt-fill.svg', // Replace with your own image URL or a local image
    iconSize: [25, 41], // size of the icon
    iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
    popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
  });

  return (!ready?
  
  <p>Gathering Location info </p>:
    <div className='rounded-5 overflow-hidden '>
      <MapContainer center={[latLng.lat, latLng.lng]} zoom={13} style={{ height: props.wid, width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[latLng.lat, latLng.lng]} icon={currentLocationIcon}>
          <Popup>
            Current Location<br />Latitude: {latLng.lat}, Longitude: {latLng.lng}
          </Popup>
        </Marker>
        <MapClickHandler localLat={setLatLng} setLatLng={props.lat} />
      </MapContainer>
    </div>
  );
};

export default MapWithClick;
