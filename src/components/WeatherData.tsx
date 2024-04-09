import { icons } from "../consts/icons";

type Props = {
  data: any;
};

function WeatherData({ data }: Props) {
  const { location, current, forecast } = data;
  const { name: city, localtime } = location;
  const {
    condition: { text, icon },
    feelslike_c: feelsLike,
    humidity,
    is_day,
    temp_c: temperature,
    wind_kph: wind,
    vis_km: visibility,
    pressure_mb: pressure,
  } = current;

  const { mintemp_c, maxtemp_c } = forecast?.forecastday[0]?.day;

  const getIcon = (icon: string) => {
    if (icon) {
      const iconName = icon.split("/").pop()?.split(".")[0] || "113";
      const dayTime = is_day === 1 ? "day" : "night";
      return icons[iconName][dayTime];
    }
    return false;
  };

  const getLocalDateString = (date: string) => {
    const localDate = new Date(date);
    return localDate.toLocaleString("en-US", {
      weekday: "short",
      month: "long",
      day: "numeric",
    });
  };

  console.log(getLocalDateString(localtime));

  return (
    <div className="max-w-[320px] w-[100%] mx-auto sm:mt-[40px] mt-[20px]">
      <h1 className="text-center text-[32px] tracking-[.44em] text-white mb-[20px]">
        {city}
      </h1>
      <div className="flex flex-row w-full">
        <div className="w-[50%] flex flex-col">
          <h1 className="text-[96px]  text-primary leading-[80%] text-right">
            {temperature}°
          </h1>
          <p className="text-[18px] tracking-[0.1em] text-white mt-[30px]">
            {text}
          </p>
          <p className="text-[14px] tracking-[0.05em] text-white mt-[20px]">
            Feels like {feelsLike}°
          </p>
          <p className="text-[14px] tracking-[0.05em] text-white mt-[4px]">
            Humidity {humidity}
          </p>
          <p className="text-[14px] tracking-[0.05em] text-white mt-[4px]">
            Sea level {pressure}
          </p>
          <p className="text-[14px] tracking-[0.05em] text-white mt-[4px]">
            Wind Speed {wind}km/h
          </p>
          <p className="text-[14px] tracking-[0.05em] text-white mt-[4px]">
            Visibility {visibility}km
          </p>
        </div>
        {getIcon(icon) && (
          <div className="w-[50%] flex flex-col">
            <img src={getIcon(icon)} alt="sky image" />
            <p className="text-right text-[18px] tracking-[0.1em] text-white mt-auto">
              {getLocalDateString(localtime)}
            </p>
            <p className="text-right text-[18px] tracking-[0.1em] text-white mt-[6px]">
              {mintemp_c}° | {maxtemp_c}°
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherData;
