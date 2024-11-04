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
  date: Date;
  icon: string;
  iconDescription: string;
  temp: number;
  humidity: number;
  windSpeed: number;

  constructor(  city: string,
    date: Date,
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
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
  const response = await fetch(`${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`)
    const weatherData = await response.json();
    return weatherData;
  }
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
}
export default new WeatherService();
