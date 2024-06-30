import { faCloud, faSun, faCloudRain, faCloudSunRain
  , faSnowflake, faCloudMoon, faCloudSun, faCloudShowersHeavy, faSmog, faHillAvalanche, faCloudBolt, faBoltLightning} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment/moment';
export const getIcon = (description, is_day)=>{
  if (description==='Mainly clear' && is_day===1) {
    return faCloudSun;
  }
  else if (description==='Mainly clear' && is_day===0) {
    return faCloudMoon;
  }
  switch (description) {
    case 'Clear sky':
        return faSun;
    case 'Partly cloudy': 
    case 'Overcast':
        return faCloud; 
    case 'Depositing rime fog':
    case 'Fog':
        return faSmog; 
    case 'Freezing Drizzle: Light intensity':
    case 'Rain: Slight intensity':
    case 'Drizzle: Light intensity':
    case 'Freezing Rain: Light intensity':
        return faCloudSunRain;
    case 'Drizzle: Moderate intensity':
    case 'Rain: Moderate intensity':
        return faCloudRain; 
    case 'Freezing Drizzle: Dense intensity':
    case 'Drizzle: Dense intensity':
    case 'Rain: Heavy intensity':
    case 'Freezing Rain: Heavy intensity':
    case 'Rain showers: Slight':
    case 'Rain showers: Moderate':
    case 'Rain showers: Violent':
        return faCloudShowersHeavy; 
    case 'Snow fall: Slight intensity':
    case 'Snow fall: Moderate intensity':
    case 'Snow fall: Heavy intensity':
    case 'Snow grains':
    case 'Snow showers: Slight':
      return faSnowflake;
    case 'Snow showers: Heavy':
        return faHillAvalanche;
    case 'Thunderstorm with slight hail':
    case 'Thunderstorm: Slight or moderate':
        return faBoltLightning;
    case 'Thunderstorm with heavy hail':
        return faCloudBolt;
    default:
        return 'weather undefined'; 
}
  }
  
export const convertToDate = (datestring)=>{
    const date = moment(datestring);
    return date;
  }


export const setParams = (lat,lon)=>{
  const params = {
    latitude: lat,
    longitude: lon,
    current: ["temperature_2m", "relative_humidity_2m",  "apparent_temperature", "is_day", "precipitation", "rain", "showers", "snowfall", "cloud_cover", "pressure_msl", "surface_pressure", "wind_speed_10m", "wind_direction_10m", "wind_gusts_10m","weather_code"],
    hourly: ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "precipitation", "rain", "showers", "snowfall", "snow_depth", "pressure_msl", "surface_pressure", "cloud_cover", "visibility", "wind_speed_10m", "wind_direction_10m", "wind_gusts_10m", "uv_index", "is_day","weather_code"],
    forecast_days: 16
  };
  const queryString = new URLSearchParams({
    latitude: params.latitude,
    longitude: params.longitude,
    current: params.current.join(','),
    hourly: params.hourly.join(','),
    forecast_days: params.forecast_days
  }).toString();
  return queryString;

}
export const setParamsForAirQuality = (lat,lon)=>{
  const params = {
    latitude: lat,
    longitude: lon,
    current: ["european_aqi", "us_aqi", "pm10", "pm2_5", "carbon_monoxide", "nitrogen_dioxide", "sulphur_dioxide", "ozone", "aerosol_optical_depth", "dust", "uv_index", "uv_index_clear_sky", "ammonia", "alder_pollen", "birch_pollen", "grass_pollen", "mugwort_pollen", "olive_pollen", "ragweed_pollen"],
	  forecast_days: 1
  };
  const queryString = new URLSearchParams({
    latitude: params.latitude,
    longitude: params.longitude,
    current: params.current.join(','),
    forecast_days: params.forecast_days
  }).toString();
  return queryString;

}
export const getDescription=(wc)=>{
  var description = '';
  switch (wc) {
    case 0:
        description = 'Clear sky';
        break;
    case 1:
        description = 'Mainly clear';
        break;
    case 2:
        description = 'Partly cloudy';
        break;
    case 3:
        description = 'Overcast';
        break;
    case 45:
        description = 'Fog';
        break;
    case 48:
        description = 'Depositing rime fog';
        break;
    case 51:
        description = 'Drizzle: Light intensity';
        break;
    case 53:
        description = 'Drizzle: Moderate intensity';
        break;
    case 55:
        description = 'Drizzle: Dense intensity';
        break;
    case 56:
        description = 'Freezing Drizzle: Light intensity';
        break;
    case 57:
        description = 'Freezing Drizzle: Dense intensity';
        break;
    case 61:
        description = 'Rain: Slight intensity';
        break;
    case 63:
        description = 'Rain: Moderate intensity';
        break;
    case 65:
        description = 'Rain: Heavy intensity';
        break;
    case 66:
        description = 'Freezing Rain: Light intensity';
        break;
    case 67:
        description = 'Freezing Rain: Heavy intensity';
        break;
    case 71:
        description = 'Snow fall: Slight intensity';
        break;
    case 73:
        description = 'Snow fall: Moderate intensity';
        break;
    case 75:
        description = 'Snow fall: Heavy intensity';
        break;
    case 77:
        description = 'Snow grains';
        break;
    case 80:
        description = 'Rain showers: Slight';
        break;
    case 81:
        description = 'Rain showers: Moderate';
        break;
    case 82:
        description = 'Rain showers: Violent';
        break;
    case 85:
        description = 'Snow showers: Slight';
        break;
    case 86:
        description = 'Snow showers: Heavy';
        break;
    case 95:
        description = 'Thunderstorm: Slight or moderate';
        break;
    case 96:
        description = 'Thunderstorm with slight hail';
        break;
    case 99:
        description = 'Thunderstorm with heavy hail';
        break;
    default:
        description = 'Unknown weather code';
}
  return description;
}

export const organizeForecast = (forecast_hourly, hourly_units, cityName, current_hour, country) => {
  const foreCastDaily= [];
  forecast_hourly.time.forEach((time, index) => {
      if (convertToDate(time).hours()===current_hour) {

          const currentWeather = {
            apparent_temperature: forecast_hourly.apparent_temperature[index],
            cloud_cover: forecast_hourly.cloud_cover[index],
            is_day: forecast_hourly.is_day[index],
            precipitation: forecast_hourly.precipitation[index],
            pressure_msl: forecast_hourly.pressure_msl[index],
            rain: forecast_hourly.rain[index],
            relative_humidity_2m: forecast_hourly.relative_humidity_2m[index],
            showers: forecast_hourly.showers[index],
            snowfall: forecast_hourly.snowfall[index],
            surface_pressure: forecast_hourly.surface_pressure[index],
            temperature_2m: forecast_hourly.temperature_2m[index],
            visibility: forecast_hourly.visibility[index],
            wind_direction_10m: forecast_hourly.wind_direction_10m[index],
            wind_speed_10m: forecast_hourly.wind_speed_10m[index],
            wind_gusts_10m: forecast_hourly.wind_gusts_10m[index],
            tempF: forecast_hourly.tempF[index]
          };
          const is_day = forecast_hourly.is_day[index];
          const description = getDescription(forecast_hourly.weather_code[index]);
          const date = convertToDate(time);
          const icon  = getIcon(description,is_day);
          foreCastDaily.push({ data: currentWeather, date: date, units: hourly_units, name: cityName, icon:icon, description: description, country:country});
      }
  });

  return foreCastDaily;
};
export const organizeChartData = (data, units, current_date)=>{
  const chartData = {
    feels_like: [],
    cloud_cover: [],
    precipitation: [],
    pressure_msl: [],
    rain: [],
    relative_humidity_2m: [],
    showers: [],
    snowfall: [],
    snow_depth: [],
    surface_pressure: [],
    temperature_2m: [],
    visibility: [],
    wind_direction_10m: [],
    wind_speed_10m: [],
    wind_gusts_10m: [],
    hours: [],
    date: '',
  };

  data.time.forEach((time, index) => {
    if (convertToDate(time).date() === current_date.date()) {
      chartData.feels_like.push(data.apparent_temperature[index]);
      chartData.cloud_cover.push(data.cloud_cover[index]);
      chartData.precipitation.push(data.precipitation[index]);
      chartData.pressure_msl.push(data.pressure_msl[index]);
      chartData.rain.push(data.rain[index]);
      chartData.relative_humidity_2m.push(data.relative_humidity_2m[index]);
      chartData.showers.push(data.showers[index]);
      chartData.snowfall.push(data.snowfall[index]);
      chartData.snow_depth.push(data.snow_depth[index]);
      chartData.surface_pressure.push(data.surface_pressure[index]);
      chartData.temperature_2m.push(data.temperature_2m[index]);
      chartData.visibility.push(data.visibility[index]);
      chartData.wind_direction_10m.push(data.wind_direction_10m[index]);
      chartData.wind_speed_10m.push(data.wind_speed_10m[index]);
      chartData.wind_gusts_10m.push(data.wind_gusts_10m[index]);
      chartData.hours.push(convertToDate(time).format('HH:00'))
    }
  });
  chartData.date = `${current_date.format('D')} ${current_date.format('MMMM')}, ${current_date.year()}`
  chartData.units = units;
  return chartData;
}


export const getChart = (chartData, specifier)=>{
  console.log(chartData)
  const chartDataForTemp = {
    labels: chartData.hours,
    datasets: [
      {
        label: `Feels like`,
        data: chartData.feels_like,
        fill: false,
        borderColor: 'rgb(195, 10, 133)',
        tension: 0.1,
      },
    
     
    
      {
        label: `Temperature 2m`,
        data: chartData.temperature_2m,
        fill: false,
        borderColor: 'rgb(32, 215, 8)',
        tension: 0.1,
      },
     
      
    ],
  };
  const chartDataForCloudsHumidity = {
    labels: chartData.hours,
    datasets: [
      {
        label: `Cloud cover`,
        data: chartData.cloud_cover,
        fill: false,
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1,
      },
      {
        label: `Relative Humidity 2m`,
        data: chartData.relative_humidity_2m,
        fill: false,
        borderColor: 'rgb(255, 205, 86)',
        tension: 0.1,
      },
    ],
  };

  const chartDataForRain = {
    labels: chartData.hours,
    datasets: [
      {
        label: `Rain`,
        data: chartData.rain,
        fill: false,
        borderColor: 'rgb(255, 159, 64)',
        tension: 0.1,
      },
      {
        label: `Showers`,
        data: chartData.showers,
        fill: false,
        borderColor: 'rgb(75, 192, 192)', 
        tension: 0.1,
      },
      {
        label: `Precipitation`,
        data: chartData.precipitation,
        fill: false,
        borderColor: 'rgb(255, 99, 132)', 
        tension: 0.1,
      },
    ],
  };
  const chartDataForPressure = {
    labels: chartData.hours,
    datasets: [
      {
        label: `Pressure MSL`,
        data: chartData.pressure_msl,
        fill: false,
        borderColor: 'rgb(400, 102, 255)',
        tension: 0.1,
      },
      {
        label: `Surface Pressure`,
        data: chartData.surface_pressure,
        fill: false,
        borderColor: 'rgb(153, 102, 255)', 
        tension: 0.1,
      },
    ],
  };
  const chartDataForWind = {
    labels: chartData.hours,
    datasets: [
      {
        label: `Wind Speed 10m`,
        data: chartData.wind_speed_10m,
        fill: false,
        borderColor: 'rgb(75, 192, 192)', 
        tension: 0.1,
      },
      {
        label: `Wind Gusts 10m`,
        data: chartData.wind_gusts_10m,
        fill: false,
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1,
      },
    ],
  };
  const chartDataForVisibility = {
    labels: chartData.hours,
    datasets: [
      {
        label: `Visibility`,
        data: chartData.visibility,
        fill: false,
        borderColor: 'rgb(255, 159, 64)', 
        tension: 0.1,
      },
    ],
  };
  const chartDataForSnowDepth = {
    labels: chartData.hours,
    datasets: [
      {
        label: `Snow Depth`,
        data: chartData.snow_depth,
        fill: false,
        borderColor: 'rgb(255, 159, 64)', 
        tension: 0.1,
      },
    ],
  };
  const chartDataForSnowFall = {
    labels: chartData.hours,
    datasets: [
      {
        label: `Snow Depth`,
        data: chartData.snowfall,
        fill: false,
        borderColor: 'rgb(255, 159, 64)', 
        tension: 0.1,
      },
    ],
  };
  const chartDataForWindDirection = {
    labels: chartData.hours,
    datasets: [
      {
        label: `Snow Depth`,
        data: chartData.wind_direction_10m,
        fill: false,
        borderColor: 'rgb(255, 159, 64)', 
        tension: 0.1,
      },
    ],
  };
  switch(specifier) {
    case('temp'):
    return [chartDataForTemp, chartData.units.temperature_2m, `Temperature for ${chartData.date}`];
    case('cloud'):
    return [chartDataForCloudsHumidity, chartData.units.cloud_cover, `Cloud + Humidity stats for ${chartData.date}`];
    case('snow_depth'):
    return [chartDataForSnowDepth, chartData.units.snow_depth, `Snow depth for ${chartData.date}`];
    case('pressure'):
    return [chartDataForPressure, chartData.units.pressure_msl, `Pressure stats for ${chartData.date}`];
    case('snowfall'):
    return [chartDataForSnowFall, chartData.units.snowfall, `Snowfall stats for ${chartData.date}`];
    case('wind_direction'):
    return [chartDataForWindDirection, chartData.units.wind_direction_10m, `Wind direction for ${chartData.date}`];
    case('rain'):
    return [chartDataForRain, chartData.units.rain, `Rain stats for ${chartData.date}`];
    case('wind'):
    return [chartDataForWind, chartData.units.wind_speed_10m, `Wind stats for ${chartData.date}`];
    case('visibility'):
    return [chartDataForVisibility, chartData.units.visibility, `Visibility for ${chartData.date}`];

    default:
      return '';
  }
}

export const capitalizeInput = (string)=>{
  return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}


export const getTeamText = (person)=>{
  const texts = {
    'Karim Saliev': 'Karim Saliev 840820235, karim.saliev@ue-germany.de',
    'Nazar Zhanabergenov': 'Nazar Zhanabergenov 40231090, nazar.zhanabergenov@ue-germany.de',
    'Kateryna Sadovska': 'Kateryna Sadovska 67155040, kateryna.sadovska@ue-germany.de',
    'Ravshanbek Musaev': 'Ravshanbek Musaev 32034926, ravshanbek.musaev@ue-germany.de'
  }
  return texts[person];
}

export const addFahr = (data)=>{
  console.log(data);
  const tempF = (data.current.temperature_2m*9/5)+32
  const fUnit = '°F';
  data.current.tempF = tempF;
  data.current_units.fUnit = fUnit;
  data.hourly.tempF = data.hourly.temperature_2m.map(item=>(item*9/5)+32)
  data.hourly_units.fUnit = fUnit;
  return data;
}
