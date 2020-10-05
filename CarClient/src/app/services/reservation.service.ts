import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private baseUrl = 'http://localhost:8085/reservation';
  constructor(private http: HttpClient) { }
  addReservation(username: string, reservation: reservation): Observable<any> {

    return this.http.post(`${this.baseUrl}/${username}`, reservation);
  }

  getNotConfirmed(): Observable<any> {

    return this.http.get(`${this.baseUrl}/notConfirmed`);
  }

  confirmReservation(id: number): Observable<any> {

    return this.http.get(`${this.baseUrl}/confirm/${id}`);
  }

  delete(id: number): Observable<any> {

    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  update(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  getOne(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getOne/${id}`);
  }
  findByCar(carId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getByCar/${carId}`);
  }

  findByUser(userName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/byUser/${userName}`);
  }

  findOld(): Observable<any> {
    return this.http.get(`${this.baseUrl}/old`);
  }

  findNext(): Observable<any> {
    return this.http.get(`${this.baseUrl}/next`);
  }

  reservOfTheDay(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ofTheDay`);
  }

  returnOfTheDay(): Observable<any> {
    return this.http.get(`${this.baseUrl}/return`);
  }


}
