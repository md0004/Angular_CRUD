import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientCRUDService } from '../Services/patient-crud.service';
import { IPatient } from '../Models/Patient';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  patient!: IPatient;

  constructor(
    private _services: PatientCRUDService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const patientId = +this.route.snapshot.paramMap.get('id')!;
    
    this._services.getPatientById(patientId).subscribe((patientDetail: IPatient) => {
      this.patient = patientDetail;
    });
  }
}
