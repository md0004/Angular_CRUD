import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientCRUDService } from '../Services/patient-crud.service';
import { Router } from '@angular/router';
import { IPatient } from '../Models/Patient';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css'] // Corrected to styleUrls
})
export class AddPatientComponent implements OnInit {
  addPatientForm!: FormGroup; // Ensure form is initialized

  constructor(
    private fb: FormBuilder,
    private _services: PatientCRUDService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.addPatientForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      age: ['', [Validators.required, Validators.min(0)]],
      gender: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Assuming a 10-digit contact number
      email: ['', [Validators.required, Validators.email]],
      hospital: ['', Validators.required]
    });
  }

  onSubmit(): void { // On Submit
    if (this.addPatientForm.valid) {
      const newPatient: IPatient = {
        id: Date.now(), // Temporary ID generation (should be handled by the backend in real apps)
        ...this.addPatientForm.value
      };

      this._services.addPatient(newPatient).subscribe({
        next: (response: IPatient) => {
          console.log('Patient added successfully:', response);
          this.router.navigate(['/patient']); // Navigate to patient list after successful submission
        },
        error: (error) => {
          console.error('Error adding patient:', error);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
