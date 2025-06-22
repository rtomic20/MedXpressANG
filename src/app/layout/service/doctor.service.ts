import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DoktorService {
  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(`${this.baseUrl}/doctors`);
  }

  getById(id: number) {
    return this.http.get(`${this.baseUrl}/doctors/${id}`);
  }

  addDoctorWithNurses(data: any) {
    return this.http.post(`${this.baseUrl}/doktor_sestra_create/`, data);
  }

  update(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/doctors/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/doctors/${id}`);
  }
}
