import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './patient/patient.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { EditPatientComponent } from './edit-component/edit-component.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
    { path: '', redirectTo: 'patient', pathMatch: 'full' },
    { path: 'patient', component: PatientComponent },
    { path: 'add-patient', component: AddPatientComponent },
    { path: 'patient/:id/details', component: UserDetailsComponent },
    { path: 'edit-patient/:id', component: EditPatientComponent },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
