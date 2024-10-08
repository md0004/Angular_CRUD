import { Component, OnInit } from '@angular/core';
import { PatientCRUDService } from '../Services/patient-crud.service';
import { IPatient } from '../Models/Patient';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  patients: IPatient[] = [];
  
  filteredPatients: IPatient[] = [];
  searchQuery: string = '';

  currentPage: number = 1;
  patientsPerPage: number = 5;

  constructor(private _services: PatientCRUDService) { }

  ngOnInit() {
    this.loadPatients();
  }

  loadPatients() {
    this._services.getPatients().subscribe(
      (data: IPatient[]) => {
        this.patients = data;
        this.filteredPatients = data;
      },
      (error) => {
        console.error('Error fetching patients:', error);
      }
    );
  }

  searchPatients() {
    if (this.searchQuery) {
      this.filteredPatients = this.patients.filter(patient =>
        patient.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredPatients = this.patients;
    }
  }

  DeleteSelectedPatient(patient: IPatient, event: Event): void {
    event.preventDefault();

    this._services.deletePatient(Number(patient.id)).subscribe(
      () => {
        this.patients = this.patients.filter(p => p.id !== patient.id);
      },
      (error) => {
        console.error('Error deleting patient:', error);
        alert('Failed to delete patient. Please try again.');
      }
    );
    
  }
}
