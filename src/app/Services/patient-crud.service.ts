import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPatient } from '../Models/Patient';

@Injectable({
  providedIn: 'root'
})
export class PatientCRUDService {

  private url = "http://localhost:3000/posts";

  constructor(private http: HttpClient) {}

  getPatients(): Observable<IPatient[]> {
    return this.http.get<IPatient[]>(this.url);
  }

  // Fetch a patient by ID
  getPatientById(id: number): Observable<IPatient> {
    return this.http.get<IPatient>(`${this.url}/${id}`);
  }

  // Add a new patient
  addPatient(patient: IPatient): Observable<IPatient> {
    return this.http.post<IPatient>(this.url, patient);
  }

  // Edit a patient by ID
  updatePatient(id: number, patient: IPatient): Observable<IPatient> {
    return this.http.put<IPatient>(`${this.url}/${id}`, patient);
  }  

  // Delete a patient
  deletePatient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

}
