import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import SearchIcon from "./assets/search-icon.svg";
import { getForecast } from "./lib/api";
import useUserLocation from "./hooks/useUserLocation";
import WeatherData from "./components/WeatherData";

function App() {
  const location = useUserLocation();
  const [selectedCity, setSelectedCity] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (location) {
      setSelectedCity(`${location.latitude},${location.longitude}`);
    }
  }, [location]);

  useEffect(() => {
    if (selectedCity) {
      setLoading(true);
      getForecast(selectedCity)
        .then((data) => {
          setData(data);
        })
        .catch(() => {
          setData("No matching location found.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [selectedCity]);

  return (
    <div className="h-full bg-blue-dark p-5 sm:pt-[170px] flex flex-col  align-center">
      <SearchBar
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />
      {data && typeof data === "object" && !loading ? (
        <WeatherData data={data} />
      ) : (
        <div className="mt-[33px] mx-auto">
          <img
            src={SearchIcon}
            alt="Search icon"
            className="mx-auto h-[89px] w-[89px] opacity-[25%]"
          />
          {loading ? (
            <p className="text-base text-white text-center opacity-[25%] tracking-[.50em]">
              loading...
            </p>
          ) : (
            <p className="text-base text-white text-center opacity-[25%] tracking-wider">
              {typeof data === "string" ? data : "Search for prefered location"}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
