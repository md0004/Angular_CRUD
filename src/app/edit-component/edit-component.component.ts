import { Component, OnInit } from '@angular/core';
import { IPatient } from '../Models/Patient';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientCRUDService } from '../Services/patient-crud.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-component',
  templateUrl: './edit-component.component.html',
  styleUrl: './edit-component.component.css'
})
export class EditPatientComponent implements OnInit{
  editPatientForm!: FormGroup; // FormGroup for handling the form
  patientId!: number; // To store patient ID from the route

  constructor(
    private fb: FormBuilder,
    private _services: PatientCRUDService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize form with empty values
    this.editPatientForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      age: ['', [Validators.required, Validators.min(0)]],
      gender: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Assuming a 10-digit contact number
      email: ['', [Validators.required, Validators.email]],
      hospital: ['', Validators.required]
    });

    // Get the patient ID from route parameters
    this.patientId = +this.route.snapshot.paramMap.get('id')!;
    
    // Fetch the patient data and populate the form
    this._services.getPatientById(this.patientId).subscribe({
      next: (patient: IPatient) => {
        this.editPatientForm.patchValue(patient); // Populate form with fetched patient data
      },
      error: (error) => {
        console.error('Error fetching patient details:', error);
      }
    });
  }

  // Submit the updated form data
  onSubmit(): void {
    if (this.editPatientForm.valid) {
      const updatedPatient: IPatient = {
        id: this.patientId, // Ensure the ID stays the same
        ...this.editPatientForm.value
      };

      this._services.updatePatient(this.patientId, updatedPatient).subscribe({
        next: (response: IPatient) => {
          console.log('Patient updated successfully:', response);
          this.router.navigate(['/patient']); // Redirect to the patient list after successful update
        },
        error: (error) => {
          console.error('Error updating patient:', error);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
