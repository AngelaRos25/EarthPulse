import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = 'https://global-warming.org/api';

  constructor(private http: HttpClient) { }

  getTemperature(){
    return this.http.get(`${this.url}/temperature-api`)
  }

  getCO2(){
    return this.http.get(`${this.url}/co2-api`)
  }

  getMethane(){
    return this.http.get(`${this.url}/methane-api`)
  }

  getNO2(){
    return this.http.get(`${this.url}/nitrous-oxide-api`)
  }

  getPolarIce(){
    return this.http.get(`${this.url}/arctic-api`)
  }
}
