import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BsModalModule } from 'ng2-bs3-modal';
import { ControlsModule } from '../../controls/controls.module';
import { ManagementComponent } from './management.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { VolunteersComponent } from './components/volunteers/volunteers.component';
import { GroupsComponent } from './components/groups/groups.component';
import { AcademicProgramsComponent } from './components/academic-programs/academic-programs.component';
import { SchoolsComponent } from './components/schools/schools.component';
import { SchoolTypesComponent } from './components/school-types/school-types.component';
import { AddressesComponent } from './components/addresses/addresses.component';
import { StreetsComponent } from './components/streets/streets.component';
import { CitiesComponent } from './components/cities/cities.component';
import { CityTypesComponent } from './components/city-types/city-types.component';
import { RegionsComponent } from './components/regions/regions.component';
import { CountriesComponent } from './components/countries/countries.component';
import { SubjectModalComponent } from './components/subjects/subject-modal/subject-modal.component';
import { AcademicProgramModalComponent } from './components/academic-programs/academic-program-modal/academic-program-modal.component';
import { CityTypeModalComponent } from './components/city-types/city-type-modal/city-type-modal.component';
import { CountryModalComponent } from './components/countries/country-modal/country-modal.component';
import { GroupModalComponent } from './components/groups/group-modal/group-modal.component';
import { SchoolTypeModalComponent } from './components/school-types/school-type-modal/school-type-modal.component';
import { DepartmentModalComponent } from './components/departments/department-modal/department-modal.component';

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
        CountriesComponent,
        SubjectModalComponent,
        AcademicProgramModalComponent,
	    CityTypeModalComponent,
	    CountryModalComponent,
	    GroupModalComponent,
        SchoolTypeModalComponent,
        DepartmentModalComponent,
	],
    exports: [
	]
})
export class ManagementModule { }