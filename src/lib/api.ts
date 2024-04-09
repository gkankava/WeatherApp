// make axios instance
import axios from "axios";

const apiCall = axios.create({
  baseURL: import.meta.env.VITE_WEATHER_API_URL,
});

export const getForecast = async (city: string) => {
  const response = await apiCall.get(
    `/forecast.json?q=${city}&days=3&alerts=alerts%3Dno&aqi=aqi%3Dno&key=${
      import.meta.env.VITE_WEATHER_API_KEY
    }`
  );
  return response.data;
};
