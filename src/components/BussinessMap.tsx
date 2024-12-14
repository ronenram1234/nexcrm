import { FunctionComponent, useEffect, useState } from "react";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import { LatLngExpression } from "leaflet";
import { clearScreenDown } from "readline";
import axios from "axios";

interface BussinessMapProps {
  address: string;
}


const containerStyle = {
  width: "100%",
  height: "300px",
};

// const center = {
//   lat: 37.7749, // San Francisco latitude
//   lng: -122.4194, // San Francisco longitude
// };

const BussinessMap: FunctionComponent<BussinessMapProps> = ({ address }) => {
  // const [location, setLocation] = useState<locationProps | undefined>(
  //   undefined
  // );

  const [lat, setLat] = useState<number | undefined>(undefined);
  const [lng, setLng] = useState<number | undefined>(undefined);

  const [error, setError] = useState<string>("");

  const apiKey = "AIzaSyCxEnj4F8H4Gu2hGfWH-sGPjhGNHwG_Un8";

  useEffect(() => {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;
    async function geocodeAddress() {
      try {
        const response = await axios.get(geocodeUrl);
        // console.log(address);
        // console.log(geocodeUrl);
        if (response.data.status === "OK") {
          setLat(response.data.results[0].geometry.location.lat);
          setLng(response.data.results[0].geometry.location.lng);

          setError("");
        } else {
          setError("Address not found. Please try again.");
        }
      } catch (err) {
        setError("Error fetching address data");
      }
    }

    geocodeAddress();
  }, [address]);

  return (
    <>
      <div>
        {error && <p style={{ color: "red" }}>{error}</p>}

        {lat !== undefined && lng !== undefined && (
          <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={{ lat, lng }}
              zoom={12}
            >
              <Marker position={{ lat, lng }} />
            </GoogleMap>
          </LoadScript>
        )}
      </div>
      {/* {console.log("-------------------------------")} */}
    </>
  );
};

export default BussinessMap;
