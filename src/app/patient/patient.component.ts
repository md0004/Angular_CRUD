import { Component, OnInit } from '@angular/core';
import { PatientCRUDService } from '../Services/patient-crud.service';
import { IPatient } from '../Models/Patient';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  selectedPatient: IPatient | null = null;
  patients: IPatient[] = [];
  filteredPatients: IPatient[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private _services: PatientCRUDService) { }

  ngOnInit() {
    this.loadPatients();
  }

  loadPatients() {
    this._services.getPatients().subscribe(
      (data: IPatient[]) => {
        this.patients = data;
        this.updateFilteredPatients();
      },
      (error) => {
        console.error('Error fetching patients:', error);
      }
    );
  }

  updateFilteredPatients() {
    if (!Array.isArray(this.patients)) {
      console.error('Patients data is not an array:', this.patients);
      return;
    }

    this.filteredPatients = this.patients.filter(patient =>
      patient.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.currentPage = 1;
  }

  onSearchQueryChange() {
    this.updateFilteredPatients();
  }

  DeleteSelectedPatient(patient: IPatient, event: Event): void {
    event.preventDefault();

    this._services.deletePatient(patient.id).subscribe(
      () => {
        this.patients = this.patients.filter(p => p.id !== patient.id);
        this.updateFilteredPatients();
      },
      (error) => {
        console.error('Error deleting patient:', error);
      }
    );
  }

  SelectPatientForEdit(patient: IPatient, event: Event): void {
    event.preventDefault();
    this.selectedPatient = { ...patient };
  }
}
