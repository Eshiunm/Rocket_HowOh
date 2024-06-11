import { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import logo from "../assets/imgs/howohLogo_whiteMode.svg";
import { Link } from "react-router-dom";

const markers = [
  {
    id: 1,
    name: "中都濕地",
    position: { lat: 22.647008460819123, lng: 120.28641104944805 },
  },
  {
    id: 2,
    name: "大港橋",
    position: { lat: 22.617981945485884, lng: 120.2838413826435 },
  },
  {
    id: 3,
    name: "大東濕地",
    position: { lat: 22.62856154127709, lng: 120.36481780492072 },
  },
];

function MapSearchPage() {
  // 紀錄目前被點擊的 marker 是哪一個
  const [center, setCenter] = useState({
    lat: 22.63964471528547,
    lng: 120.30283893636098,
  });
  const [activeMarker, setActiveMarker] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API,
  });

  const handleActiveMarker = (marker: any) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
    setCenter({
      lat: 0,
      lng: 0,
    });
  };

  return (
    <>
      <div className="container">
        <h1>google Maps Markers</h1>
        <div className="w-full h-[60vh]">
          {isLoaded && (
            <GoogleMap
              center={center}
              zoom={10}
              onClick={() => setActiveMarker(null)}
              mapContainerStyle={{ width: "100%", height: "100%" }}
            >
              {markers.map(({ id, name, position }) => (
                <MarkerF
                  key={id}
                  position={position}
                  onClick={() => handleActiveMarker(id)}
                  icon={logo}
                >
                  {activeMarker === id ? (
                    <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                      <>
                        <div>{name}</div>
                        <Link to="/houseList/33">前往房源</Link>
                      </>
                    </InfoWindowF>
                  ) : null}
                </MarkerF>
              ))}
            </GoogleMap>
          )}
        </div>
      </div>
    </>
  );
}

export default MapSearchPage;
