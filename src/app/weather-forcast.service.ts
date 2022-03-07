import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherForcastService {

  weatherUrl = 'https://api.open-meteo.com/v1/forecast'

  weatherApiParams = {
    'latitude': 0,
    'longitude': 0,
    'hourly': 'temperature_2m',
    'timezone': 'UTC',
    'daily': 'temperature_2m_max'
  }

  constructor(private http: HttpClient) { }

  getWeather(lat: number, lng: number) {
    this.weatherApiParams.latitude = lat;
    this.weatherApiParams.longitude = lng
    const params = new HttpParams({fromObject:this.weatherApiParams})
    return this.http.get(this.weatherUrl, {params: params} )
  }
}
