import { useEffect, useMemo, useRef, useState } from "react";
import SearchIcon from "../assets/search-icon.svg";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";

type Props = { selectedCity: any; setSelectedCity: (city: string) => void };

function SearchBar({ selectedCity, setSelectedCity }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [predictionsShown, setPredictionsShown] = useState<boolean>(false);

  useEffect(() => {
    setPredictionsShown(false);
  }, [selectedCity]);

  const { placePredictions, getPlacePredictions } = usePlacesService({
    apiKey: import.meta.env.VITE_GOOGLE_PLACES_API_KEY,
  });

  const placePredictionsFiltered = useMemo(() => {
    if (placePredictions.length > 0) {
      setPredictionsShown(true);
      return placePredictions.filter((location) =>
        location.types.includes("locality")
      );
    } else {
      return [];
    }
  }, [placePredictions]);

  return (
    <div className="max-w-[480px] w-[100%] mx-auto">
      <div className="flex flex-row align-center gap-2">
        <div className="w-full relative">
          <input
            ref={inputRef}
            type="text"
            onChange={(evt) => {
              getPlacePredictions({ input: evt.target.value });
            }}
            placeholder="Search for a city..."
            className="w-full p-2 bg-blue-light rounded-[10px] h-[36px] shadow-custom placeholder-placeholder font text-base text-white focus:shadow-md"
          />
          {placePredictionsFiltered.length > 0 && predictionsShown && (
            <div className="flex flex-col absolute bg-blue-dark w-full shadow-custom z-10 top-[56px] py-[8px] pl-[13px]">
              {placePredictionsFiltered.map((location: any, key: number) => (
                <button
                  key={key.toString()}
                  className="text-left pl-[9px] py-[8px] border-b border-solid border-gray last:border-0 text-white tracking-wider hover:bg-blue-light active:bg-blue-dark"
                  onClick={() => {
                    setSelectedCity(location.structured_formatting.main_text);
                    inputRef.current!.value = "";
                  }}
                >
                  {location.description}
                </button>
              ))}
            </div>
          )}
        </div>
        <img src={SearchIcon} alt="search-icon" />
      </div>
    </div>
  );
}

export default SearchBar;
