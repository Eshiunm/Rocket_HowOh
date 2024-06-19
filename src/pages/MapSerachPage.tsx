import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Load google maps necessary packages
import { apiGetMapSearchList } from "../apis/apis";
import markerIcon from "../assets/imgs/mapSearch/mapMarker.svg";
import {
  GoogleMap,
  useLoadScript,
  Circle,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

const PlacesAutocomplete = ({ setSelectedPlace }: any) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelectPlace = async (address: any) => {
    setValue(address, false); // "false" means "No need to obtain external data"
    clearSuggestions(); // 因為已經選定地址，所以將推薦選項區塊清除

    const results = await getGeocode({ address }); // 將地址轉成經緯度
    const { lat, lng } = getLatLng(results[0]);
    setSelectedPlace({ lat, lng });
  };

  return (
    <Combobox onSelect={handleSelectPlace}>
      <ComboboxInput
        value={value}
        onChange={e => setValue(e.target.value)}
        disabled={!ready}
        className="w-full py-2 pl-4 rounded-full focus:outline-none border border-Neutral-80 shadow-elevation-4"
        placeholder="請輸入地點"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

function MapSearchPage() {
  // 記錄目前被點擊的 marker 是哪一個
  const [activeMarker, setActiveMarker] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(undefined);
  const [markers, setMarkers] = useState<any[]>([]);
  const [distance, setDistance] = useState('');

  //定位預設高雄火車站
  const defaultCenter = {
    lat: 22.63964471528547,
    lng: 120.30283893636098,
  };
  // 判斷是否載入成功
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API,
    libraries: ["places"],
  });

  // 處理 marker 被點擊時
  const handleActiveMarker = (marker: any) => {
    marker === activeMarker ? "" : setActiveMarker(marker);
  };

  const handleDistanceChange = (e: any) => {
    const selectedDistance = e.target.value;
    const getMapSearchList = async (position: any) => {
      try {
        const res1 = await apiGetMapSearchList(position);
        const searchResult = res1.data;
        setMarkers(searchResult);
      } catch (err) {
        console.log(err);
      }
    };
    const defaultCenter = {
      // 經緯度預設是高雄火車站
      latitude: "22.63964471528547",
      longitude: "120.30283893636098",
      distance: selectedDistance,
      pageNumber: "1",
    };
    getMapSearchList(defaultCenter);
    setDistance(selectedDistance);
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className="flex">
        {/* 地圖 */}
        <div className="w-full">
          {isLoaded && (
            <div className="relative w-full h-[100vh]">
              <div className="absolute top-3 left-1/4 z-10 w-[300px]">
                <PlacesAutocomplete setSelectedPlace={setSelectedPlace} />
              </div>
              <form className="absolute top-3 left-2/4 z-10 flex w-[150px]">
                <select
                  id="countries"
                  defaultValue="0"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  onChange={handleDistanceChange}
                >
                  <option value="0">選擇距離</option>
                  <option value="200">200公尺</option>
                  <option value="500">500公尺</option>
                  <option value="1000">1公里</option>
                  <option value="2000">2公里</option>
                </select>
              </form>
              <GoogleMap
                center={selectedPlace || defaultCenter}
                zoom={15}
                onClick={() => setActiveMarker(null)}
                mapContainerStyle={{ width: "100%", height: "100%" }}
              >
                <>
                  {
                    <div className="places-container border-4 border-black">
                      <PlacesAutocomplete setSelected={setSelectedPlace} />
                    </div>
                  }
                  {selectedPlace && <Marker position={selectedPlace}></Marker>}
                  {markers.length > 0 &&
                    markers.map(houseInfo => (
                      <Marker
                        key={houseInfo.houseId}
                        position={{
                          lat: parseFloat(houseInfo.latitude),
                          lng: parseFloat(houseInfo.longitude),
                        }}
                        onClick={() => handleActiveMarker(houseInfo.houseId)}
                        icon={markerIcon}
                      >
                        {activeMarker === houseInfo.houseId ? (
                          // 點擊地圖上的 marker 顯示內容
                          <InfoWindow
                            onCloseClick={() => setActiveMarker(null)}
                          >
                            <Link
                              to={`/houseList/${houseInfo.houseId}`}
                              target="_blank"
                              className="max-w-[375px] flex gap-x-2"
                            >
                              <div className="w-[144px]  rounded-lg overflow-hidden">
                                <img
                                  src={houseInfo.coverImage}
                                  alt="coverImage"
                                  className="w-full h-full"
                                />
                              </div>
                              <div className="flex flex-col justify-between">
                                <h3 className="text-sans-b-body1">
                                  {houseInfo.title}
                                </h3>
                                <ul className="flex flex-wrap gap-1">
                                  {houseInfo.isRentSubsidy && (
                                    <li className="text-sans-b-caption py-[2px] px-1 bg-Tenant-90 rounded-lg">
                                      租屋補助
                                    </li>
                                  )}
                                  {houseInfo.isPetAllowed && (
                                    <li className="text-sans-b-caption py-[2px] px-1 bg-Tenant-90 rounded-lg">
                                      寵物友善
                                    </li>
                                  )}
                                  {houseInfo.isCookAllowed && (
                                    <li className="text-sans-b-caption py-[2px] px-1 bg-Tenant-90 rounded-lg">
                                      可開火
                                    </li>
                                  )}
                                  {houseInfo.isSTRAllowed && (
                                    <li className="text-sans-b-caption py-[2px] px-1 bg-Tenant-90 rounded-lg">
                                      可短租
                                    </li>
                                  )}
                                </ul>
                                <ul className="flex flex-wrap gap-1 text-sans-b-caption">
                                  <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                                    <span>
                                      {houseInfo.type === 1
                                        ? "獨立套房"
                                        : houseInfo.type === 2
                                        ? "分租套房"
                                        : houseInfo.type === 3
                                        ? "雅房"
                                        : houseInfo.type === 4
                                        ? "其他"
                                        : "整層住家"}
                                    </span>
                                  </li>
                                  <li
                                    className={
                                      houseInfo.roomNumber > 0 ||
                                      houseInfo.bathRoomNumbers > 0 ||
                                      houseInfo.livingRoomNumbers > 0 ||
                                      houseInfo.balconyNumbers > 0
                                        ? "pr-2 border-r-[1px] border-r-Tenant-70"
                                        : "hidden"
                                    }
                                  >
                                    <span>
                                      {houseInfo.roomNumbers > 0
                                        ? `${houseInfo.roomNumbers}房`
                                        : ""}{" "}
                                      {houseInfo.livingRoomNumbers > 0
                                        ? ` ${houseInfo.livingRoomNumbers}廳`
                                        : ""}
                                    </span>
                                  </li>
                                  <li
                                    className={
                                      houseInfo.ping > 0
                                        ? "pr-2 border-r-[1px] border-r-Tenant-70"
                                        : "hidden"
                                    }
                                  >
                                    <span>{houseInfo.ping}坪</span>
                                  </li>
                                </ul>
                                <p className="text-sans-b-caption">
                                  {houseInfo.district + houseInfo.road}
                                </p>
                                <div className="flex justify-end items-end">
                                  <span className="before:block before:absolute before:h-[10%] before:w-[95%] before:bg-[#bac6e6] before:bottom-[5%] before:right-[7%] relative">
                                    <span className="relative text-sans-b-h6 mr-2">
                                      {parseInt(
                                        houseInfo.rent
                                      ).toLocaleString()}
                                    </span>
                                  </span>
                                  <span className="text-sans-caption font-normal">
                                    元/月
                                  </span>
                                </div>
                              </div>
                            </Link>
                          </InfoWindow>
                        ) : null}
                      </Marker>
                    ))}

                  {
                    <Circle
                      center={selectedPlace}
                      radius={parseInt(distance)}
                      options={{
                        strokeColor: "red",
                        strokeOpacity: 0.5,
                        strokeWeight: 2,
                        fillColor: "red",
                        fillOpacity: 0.13,
                      }}
                    />
                  }
                </>
              </GoogleMap>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MapSearchPage;
