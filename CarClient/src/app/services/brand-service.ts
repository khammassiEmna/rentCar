import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private baseUrl = 'http://localhost:8085/brand';

  constructor(private http: HttpClient) { }

  getBrand(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createBrand(brand: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/`, brand);
  }

  updateBrand(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/update/${id}`, value);
  }

  deleteBrand(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
  }

  getBrandList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }

  findByName(brandName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/byName/${brandName}`);
  }



}
