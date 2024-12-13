import { FunctionComponent, useEffect, useState } from "react";
import { getLatLon } from "../services/leafLetServices";
import { errorMsg } from "../services/feedbackService";

import { Marker, Popup } from "react-leaflet";
import { MapContainer, TileLayer } from "react-leaflet";



import { LatLngExpression } from "leaflet";

interface BussinessMapProps {
  address: string;
}

interface locationProps {
  lat: number;
  lon: number;
}

const BussinessMap: FunctionComponent<BussinessMapProps> = ({ address }) => {


  const [location, setLocation] = useState<locationProps | undefined>(
    undefined
  );

  useEffect(() => {
    getLatLon(address)
      .then((res) => {
        if (res.data.length > 0) {
          setLocation({
            lat: parseFloat(res.data[0].lat), 
            lon: parseFloat(res.data[0].lon),
          });

     
        }
      })
      .catch((err) => {
        const errorMessage = err.response ? err.response.data : err.message;
        errorMsg(`Transaction Error - ${errorMessage}`);
      });
  }, [address]);

  return (
    <>
    {console.log(location?.lat) }
    {console.log(location?.lon) }
      <div style={{ height: "20vh" }}>
        {location && (
          <MapContainer
            center={[location.lat, location.lon] as LatLngExpression}
            zoom={13}
            style={{ width: "100%", height: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[location.lat, location.lon] as LatLngExpression}>
              <Popup>{address}</Popup>
            </Marker>
          </MapContainer>

     
        )}
      </div>
    </>
  );
};

export default BussinessMap;
