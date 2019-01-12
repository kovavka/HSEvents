import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BsModalModule } from 'ng2-bs3-modal';
import { ControlsModule } from '../../controls/controls.module';
import { ManagementComponent } from './management.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { DepartmentsComponent } from './departments/departments.component';
import { VolunteersComponent } from './volunteers/volunteers.component';
import { GroupsComponent } from './groups/groups.component';
import { AcademicProgramsComponent } from './academic-programs/academic-programs.component';
import { SchoolsComponent } from './schools/schools.component';
import { SchoolTypesComponent } from './school-types/school-types.component';
import { AddressesComponent } from './addresses/addresses.component';
import { StreetsComponent } from './streets/streets.component';
import { CitiesComponent } from './cities/cities.component';
import { CityTypesComponent } from './city-types/city-types.component';
import { RegionsComponent } from './regions/regions.component';
import { CountriesComponent } from './countries/countries.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		ControlsModule,
		FormsModule,
		BsModalModule
	],
    declarations: [
        ManagementComponent,
        SubjectsComponent,
        DepartmentsComponent,
        VolunteersComponent,
        GroupsComponent,
        AcademicProgramsComponent,
        SchoolsComponent,
        SchoolTypesComponent,
        AddressesComponent,
        StreetsComponent,
        CitiesComponent,
        CityTypesComponent,
        RegionsComponent,
        CountriesComponent
	],
    exports: [
	]
})
export class ManagementModule { }