import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';

@Injectable({
    providedIn: 'root'
})
export class PacientService {
    private baseUrl = `${environment.apiUrl}/pacients`;

    constructor(private http: HttpClient) {}

    getAll() {
        return this.http.get(this.baseUrl);
    }

    getById(id: number) {
        return this.http.get(`${this.baseUrl}/${id}`);
    }

    create(data: any) {
        return this.http.post(`${this.baseUrl}/`, data);
    }

    update(id: number, data: any) {
        return this.http.put(`${this.baseUrl}/${id}`, data);
    }

    delete(id: number) {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}
