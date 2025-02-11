import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}
// TODO: Define a class for the Weather object
class Weather {
  city: string;
  date: string;
  icon: string;
  iconDescription: string;
  tempF: number;
  humidity: number;
  windSpeed: number;

  constructor(  city: string,
    date: string,
    icon: string,
    iconDescription: string,
    tempF: number,
    humidity: number,
    windSpeed: number) {
      this.city = city;
      this.date = date;
      this.icon = icon;
      this.iconDescription = iconDescription;
      this.tempF = tempF;
      this.humidity = humidity;
      this.windSpeed = windSpeed
    }
}
// TODO: Complete the WeatherService class
class WeatherService {
  cityName: string = '';
  baseURL?: string;
  apiKey?: string;
  
  
  constructor() {
    // TODO: Define the baseURL, API key, and city name properties
    this.baseURL = process.env.API_BASE_URL || '';
    
    this.apiKey = process.env.API_KEY || '';
  }
  
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
        const response = await fetch(query);
    const responseTwo = await response.json();

    return responseTwo[0];
  }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    const coordinates = {
    lat: locationData.lat,
    lon: locationData.lon
    };
    return coordinates;
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `${this.baseURL}/geo/1.0/direct?q=${this.cityName}&appid=${this.apiKey}`
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    const weatherQuery = `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${this.apiKey}`
    return weatherQuery
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    const partOne: Coordinates = await this.fetchLocationData(this.buildGeocodeQuery())
    const partTwo = this.destructureLocationData(partOne)
    return partTwo
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
   try{ 
    const weatherQuery = this.buildWeatherQuery(coordinates)
    const response = await fetch(weatherQuery)
    if (!response) {
      throw new Error('Weather data not found');
    }
    const weatherData = await response.json();
    const parsedData = this.parseCurrentWeather(weatherData)
    console.log(parsedData)
    const parsedArray = this.buildForecastArray(parsedData, weatherData.list)
    return parsedArray
   } catch (error) {
    return console.log(error)
  }
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    console.log(response.list[0])
    const weatherObject: Weather = {
      city: this.cityName,
      date: response.list[0].dt_txt,
      icon: response.list[0].weather[0].icon,
      iconDescription: response.list[0].weather[0].description,
      tempF: response.list[0].main.temp, //in Kelvin, need in  F
      humidity: response.list[0].main.humidity,
      windSpeed: response.list[0].wind.speed
    }
    return weatherObject
  }
  // TODO: Complete buildForecastArray method
 private buildForecastArray(_currentWeather: Weather, _weatherData: any[]) {
    // return [_currentWeather]
    // Build our 5 day forecast
    const forecastArray: Weather[] = [_currentWeather];

    console.log("Weather Data: \n\n\n");

    console.log(_weatherData);


    // Filter for each day dt_txt -> parse for time -> 12:00:00
    const filteredData = _weatherData.filter((data: any) => {
      return data.dt_txt.includes("12:00:00");
    });

    for (const data of filteredData) {
      forecastArray.push(
        new Weather(
          this.cityName,
          data.dt_txt,
          data.weather[0].icon,
          data.weather[0].description,
          data.main.temp,
          data.main.humidity,
          data.wind.speed
        )
      )
    };

    return forecastArray;
 }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string): Promise<Weather[] | void> {
    try {
      this.cityName = city;
      const coordinates =  await this.fetchAndDestructureLocationData();
      // console.log(coordinates)
      if (coordinates) {
        const weatherData = await this.fetchWeatherData(coordinates);
        // console.log(weatherData)
        return weatherData;
      }

      throw new Error('Weather data not found')
    } catch (err) {
      console.error(err);
      throw err;
    }
  //return [todaysWeather, tomorrowsWeather, thirdWeather, fourthWeather, fifthWeather]
  }
}
export default new WeatherService();
