import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Model } from '../models/model';


@Injectable({
    providedIn: 'root'
})
export class ModelService {
    private baseUrl = 'http://localhost:8085/model';
    private message: String;
    constructor(private http: HttpClient) { }

    getModel(id: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id}`);
    }

    createModel(model: Model, id: String,): Observable<any> {
        return this.http.post(`${this.baseUrl}/add/${id}`, model)

    }

    updateModel(id: number, value: any): Observable<Object> {
        return this.http.put(`${this.baseUrl}/update/${id}`, value);
    }

    deleteModel(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/delete/${id}`);
    }

    getModelList(): Observable<any> {
        console.log("list model ds le service")
        return this.http.get(`${this.baseUrl}/all`);
    }

    findByName(modelName: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/byName/${modelName}`);
    }

    findByBrand(brandId: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/byBrand/${brandId}`);
    }
}
