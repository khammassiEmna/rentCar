import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Car } from '../models/car';


@Injectable({
  providedIn: 'root'
})
export class carService {
  private baseUrl = 'http://localhost:8085/car';

  constructor(private http: HttpClient) { }

  getCar(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createCar(brand: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/`, brand);
  }

  updateCar(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/update/${id}`, value);
  }



  getCarList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get`);
  }

  getRecent(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getRecent`)
  }
  getById(id: number): Observable<any> {

    return this.http.get(`${this.baseUrl}/getById/${id}`);

  }
  getByModel(modelName: string): Observable<any> {

    return this.http.get(`${this.baseUrl}/getByModel/${modelName}`);

  }

  getRecentByModel(modelName: string): Observable<any> {

    return this.http.get(`${this.baseUrl}/getRecentByModel/${modelName}`);

  }

  deleteCar(id: number): Observable<any> {

    return this.http.delete(`${this.baseUrl}/${id}`);

  }
  getByPrice(price: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getByPrice/${price}`)

  }

  getNewByPrice(price: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getNewByPrice/${price}`)

  }
}
