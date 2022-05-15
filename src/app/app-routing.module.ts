import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './core/about/about.component';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { VaccinationsFormComponent } from './vaccinations/vaccinations-form/vaccinations-form.component';
import { VaccinationsListComponent } from './vaccinations/vaccinations-list/vaccinations-list.component';

const routes: Routes = [
  {path:'vaccinations',component:VaccinationsListComponent},
  {path:'addVaccination',component:VaccinationsFormComponent},
  {path:'persons/:personal_number', component:PersonDetailsComponent},
  {path:'about',component:AboutComponent},
  {path:'',redirectTo:'/vaccinations',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
