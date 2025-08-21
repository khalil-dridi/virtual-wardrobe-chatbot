import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocationDetails } from '../Models/LocationDetails';
import { WeatherDetails } from '../Models/WeatherDetails';
import { TemperatureData } from '../Models/TemperatureData';
import { TodayData } from '../Models/TodayData';
import { WeekData } from '../Models/WeekData';
import { TodaysHighlight } from '../Models/TodaysHighlight';
import { Observable } from 'rxjs';
import { EnvironmentalVariables } from '../Environment/EnvironmentVariables';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  locationDetails?: LocationDetails;
  weatherDetails?: WeatherDetails;

  temperatureData: TemperatureData = new TemperatureData();
  todayData: TodayData[] = [];
  weekData: WeekData[] = [];
  todaysHighlight: TodaysHighlight = new TodaysHighlight();

  cityName: string = 'tunis';
  language: string = 'en-US';
  date: string = '20240210';
  units: string = 'm';

  currentTime: Date = new Date();

  today: boolean = false;
  week: boolean = true;

  celsius: boolean = true;
  fahrenheit: boolean = false;

  constructor(private httpClient: HttpClient) {
    this.getData();
  }

  getSummaryImage(summary: string): string {
    const baseAddress = 'assets/';
    const cloudySunny = 'cloudyandsunny.png';
    const rainSunny = 'rainyandsunny.png';
    const windy = 'windy.png';
    const sunny = 'sun.png';
    const rainy = 'rainy.png';

    if (summary.includes("Partly Cloudy") || summary.includes("P Cloudy")) return baseAddress + cloudySunny;
    if (summary.includes("Partly Rainy") || summary.includes("P Rainy")) return baseAddress + rainSunny;
    if (summary.includes("wind")) return baseAddress + windy;
    if (summary.includes("rain")) return baseAddress + rainy;
    if (summary.includes("Sun")) return baseAddress + sunny;

    return baseAddress + cloudySunny;
  }

  fillTemperatureDataModel() {
    const currentDetails = this.weatherDetails?.['v3-wx-observations-current'];
    if (currentDetails && this.locationDetails) {
      this.currentTime = new Date();
      this.temperatureData.day = currentDetails.dayOfWeek;
      this.temperatureData.time = `${String(this.currentTime.getHours()).padStart(2, '0')}:${String(this.currentTime.getMinutes()).padStart(2, '0')}`;
      this.temperatureData.temperature = currentDetails.temperature;
      this.temperatureData.location = `${this.locationDetails.location.city[0]}, ${this.locationDetails.location.country[0]}`;
      this.temperatureData.rainPercent = currentDetails.precip24Hour;
      this.temperatureData.summaryPhrase = currentDetails.wxPhraseShort;
      this.temperatureData.summaryImage = this.getSummaryImage(this.temperatureData.summaryPhrase);
    } else {
      console.error("Les détails météo ou les détails de localisation sont manquants ou incomplets.", this.weatherDetails, this.locationDetails);
    }
  }

  fillWeekData() {
    if (this.weatherDetails && this.weatherDetails['v3-wx-forecast-daily-15day']) {
      for (let i = 0; i < 7; i++) {
        const weekDay = this.weatherDetails['v3-wx-forecast-daily-15day'];
        const weekDataItem = new WeekData();
        weekDataItem.day = weekDay.dayOfWeek[i].slice(0, 3);
        weekDataItem.tempMax = weekDay.calendarDayTemperatureMax[i];
        weekDataItem.tempMin = weekDay.calendarDayTemperatureMin[i];
        weekDataItem.summaryImage = this.getSummaryImage(weekDay.narrative[i]);
        this.weekData.push(weekDataItem);
      }
    } else {
      console.error("Les détails météo de la semaine sont manquants ou incomplets.", this.weatherDetails);
    }
  }

  fillTodayData() {
    if (this.weatherDetails && this.weatherDetails['v3-wx-forecast-hourly-10day']) {
      for (let i = 0; i < 7; i++) {
        const todayDetails = this.weatherDetails['v3-wx-forecast-hourly-10day'];
        const todayDataItem = new TodayData();
        todayDataItem.time = todayDetails.validTimeLocal[i].slice(11, 16);
        todayDataItem.temperature = todayDetails.temperature[i];
        todayDataItem.summaryImage = this.getSummaryImage(todayDetails.wxPhraseShort[i]);
        this.todayData.push(todayDataItem);
      }
    } else {
      console.error("Les détails météo d'aujourd'hui sont manquants ou incomplets.", this.weatherDetails);
    }
  }

  fillTodaysHighlight() {
    const currentDetails = this.weatherDetails?.['v3-wx-observations-current'];
    const airQualityDetails = this.weatherDetails?.['v3-wx-globalAirQuality'];
    if (currentDetails && airQualityDetails) {
      this.todaysHighlight.airQuality = airQualityDetails.globalairquality.airQualityIndex;
      this.todaysHighlight.humidity = currentDetails.relativeHumidity;
      this.todaysHighlight.sunrise = this.getTimeFromString(currentDetails.sunriseTimeLocal);
      this.todaysHighlight.sunset = this.getTimeFromString(currentDetails.sunsetTimeLocal);
      this.todaysHighlight.uvIndex = currentDetails.uvIndex;
      this.todaysHighlight.visibility = currentDetails.visibility;
      this.todaysHighlight.windStatus = currentDetails.windSpeed;
    } else {
      console.error("Les détails d'aujourd'hui sont manquants ou incomplets.", this.weatherDetails);
    }
  }

  getTimeFromString(localTime: string) {
    return localTime.slice(11, 16);
  }

  prepareData(): void {
    this.fillTemperatureDataModel();
    this.fillWeekData();
    this.fillTodayData();
    this.fillTodaysHighlight();
    console.log(this.weatherDetails);
    console.log(this.temperatureData);
    console.log(this.weekData);
    console.log(this.todayData);
    console.log(this.todaysHighlight);
  }

  celsiusToFahrenheit(celsius: number): number {
    return +((celsius * 1.8) + 32).toFixed(2);
  }

  fahrenheitToCelsius(fahrenheit: number): number {
    return +((fahrenheit - 32) * 0.555).toFixed(2);
  }

  getLocationDetails(cityName: string, language: string): Observable<LocationDetails> {
    return this.httpClient.get<LocationDetails>(EnvironmentalVariables.weatherApiLocationBaseURL, {
      headers: new HttpHeaders()
        .set(EnvironmentalVariables.xRapidApiKeyName, EnvironmentalVariables.xRapidApikeyValue)
        .set(EnvironmentalVariables.xRapidApiHostName, EnvironmentalVariables.xRapidApiHostValue),
      params: new HttpParams()
        .set('query', cityName)
        .set('language', language)
    });
  }

  getWeatherReport(date: string, latitude: number, longitude: number, language: string, units: string): Observable<WeatherDetails> {
    return this.httpClient.get<WeatherDetails>(EnvironmentalVariables.weatherApiForecastBaseURL, {
      headers: new HttpHeaders()
        .set(EnvironmentalVariables.xRapidApiKeyName, EnvironmentalVariables.xRapidApikeyValue)
        .set(EnvironmentalVariables.xRapidApiHostName, EnvironmentalVariables.xRapidApiHostValue),
      params: new HttpParams()
        .set('date', date)
        .set('latitude', latitude)
        .set('longitude', longitude)
        .set('language', language)
        .set('units', units)
    });
  }

  getData() {
    this.todayData = [];
    this.weekData = [];
    this.temperatureData = new TemperatureData();
    this.todaysHighlight = new TodaysHighlight();

    this.getLocationDetails(this.cityName, this.language).subscribe({
      next: (response) => {
        this.locationDetails = response;
        const latitude = this.locationDetails?.location.latitude[0];
        const longitude = this.locationDetails?.location.longitude[0];

        if (latitude && longitude) {
          this.getWeatherReport(this.date, latitude, longitude, this.language, this.units).subscribe({
            next: (response) => {
              this.weatherDetails = response;
              if (this.weatherDetails) {
                this.prepareData();
              } else {
                console.error("Les détails météo sont manquants ou incomplets.", this.weatherDetails);
              }
            },
            error: (err) => console.error('Erreur lors de la récupération des détails météo', err)
          });
        } else {
          console.error('Latitude ou longitude manquantes.', latitude, longitude);
        }
      },
      error: (err) => console.error('Erreur lors de la récupération des détails de localisation', err)
    });
  }

  getClothingRecommendation(temperature: number): string {
    let message = "";
    if (temperature < 10) {
      const messages = [
        "Il fait très froid. Portez un manteau épais, un bonnet et des gants.",
        "Il fait très froid. Enfilez une doudoune et des bottes chaudes.",
        "Il fait très froid. Une écharpe et des bottes sont indispensables."
      ];
      message = messages[Math.floor(Math.random() * messages.length)];
    } else if (temperature >= 10 && temperature < 18) {
      const messages = [
        "Il fait frais. Une veste légère et un pull seraient appropriés.",
        "Il fait frais. Portez un cardigan et des chaussures confortables.",
        "Il fait frais. Une écharpe légère pourrait être utile."
      ];
      message = messages[Math.floor(Math.random() * messages.length)];
    } else if (temperature >= 20 && temperature < 25) {
      const messages = [
        "Évitez les tissus synthétiques qui peuvent piéger la chaleur.",
        "Éclatez de Couleurs cet Été ! Comme  Blanc éclatant , Bleu ciel , Rose et  Jaune vif  ",
        "Il fait chaud. Optez pour des vêtements légers comme des shorts et des t-shirts.",
        "Il fait chaud. Portez une robe légère et des sandales.",
        "Choisissez des couleurs claires pour refléter la lumière du soleil.",
        " N'oubliez pas d'appliquer de la crème solaire pour protéger votre peau. ",
      ];
      message = messages[Math.floor(Math.random() * messages.length)];
    } else if (temperature >= 25 && temperature < 30) {
      const messages = [
        "Évitez les tissus synthétiques qui peuvent piéger la chaleur.",
        "Éclatez de Couleurs cet Été ! Comme  Blanc éclatant , Bleu ciel , Rose et  Jaune vif  ",
        "Il fait chaud. Optez pour des vêtements légers comme des shorts et des t-shirts.",
        "Il fait chaud. Portez une robe légère et des sandales.",
        "Choisissez des couleurs claires pour refléter la lumière du soleil.",
        " N'oubliez pas d'appliquer de la crème solaire pour protéger votre peau. ",
      ]
      message = messages[Math.floor(Math.random() * messages.length)];
    } else {
      const messages = [
        "Choisissez des couleurs claires pour refléter la lumière du soleil.",
        "Il fait très chaud. Prévoyez des vêtements légers et aérés.",
        "Il fait très chaud. Portez un chapeau et des lunettes de soleil.",
        "Il fait très chaud. N'oubliez pas votre crème solaire et une bouteille d'eau.",
        "Protégez-vous du soleil avec des chapeaux à larges bords et des lunettes de soleil",
      ];
      message = messages[Math.floor(Math.random() * messages.length)];
    }
    return message;
  }
}

