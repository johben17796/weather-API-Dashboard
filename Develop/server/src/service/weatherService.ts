import dotenv from 'dotenv';
import { stringify } from 'node:querystring';
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
  temp: number;
  humidity: number;
  windSpeed: number;

  constructor(  city: string,
    date: string,
    icon: string,
    iconDescription: string,
    temp: number,
    humidity: number,
    windSpeed: number) {
      this.city = city;
      this.date = date;
      this.icon = icon;
      this.iconDescription = iconDescription;
      this.temp = temp;
      this.humidity = humidity;
      this.windSpeed = windSpeed
    }
}
// TODO: Complete the WeatherService class
class WeatherService {
  cityName: string
  baseURL?: string;
  apiKey?: string;
  
  
  constructor(cityName: string, baseURL?: string, apiKey?: string) {
    this.baseURL = process.env.API_BASE_URL || '';
    
    this.apiKey = process.env.API_KEY || '';

    this.cityName = cityName
  }
  
  // TODO: Define the baseURL, API key, and city name properties
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
   try{
     const response = await fetch (`${this.baseURL}geo/1.0/direct?q=${query}&appid=${this.apiKey}`)
       const locationData = await response.json();
       return locationData;
   } catch (err) {
    console.log('Error:', err);
    return err;
   }
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
  private buildGeocodeQuery(): string {}
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    const weatherQuery = `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`
    return weatherQuery
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    const partOne = await this.fetchLocationData()
    const partTwo = await this.destructureLocationData(partOne)
    return partTwo
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const weatherQuery = this.buildWeatherQuery(coordinates)
    const response = await fetch(weatherQuery)
    const weatherData = await response.json();
    const parsedData = this.parseCurrentWeather(weatherData)
    const parsedArray = this.buildForecastArray(parsedData, blankArray)
    return parsedArray
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    const weatherObject: Weather = {
      city: response.city,
      date: response.date,
      icon: response.icon,
      iconDescription: response.iconDescription,
      temp: response.temp,
      humidity: response.humidity,
      windSpeed: response.windSpeed
    }
  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {

  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {}
  fetchLocationData()
  fetchWeatherData()

  return [todaysWeather, tomorrowsWeather, thirdWeather, fourthWeather, fifthWeather]
}
export default new WeatherService();
