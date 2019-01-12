import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopMenuComponent } from '../menus/top-menu.component';
import { HomeComponent } from '../pages/home/home.component';
import { EventsComponent } from '../pages/events/events.component';
import { ManagementComponent } from '../pages/management/management.component';
import { SubjectsComponent } from '../pages/management/subjects/subjects.component';
import { DepartmentsComponent } from '../pages/management/departments/departments.component';
import { VolunteersComponent } from '../pages/management/volunteers/volunteers.component';
import { GroupsComponent } from '../pages/management/groups/groups.component';
import { AcademicProgramsComponent } from '../pages/management/academic-programs/academic-programs.component';
import { SchoolsComponent } from '../pages/management/schools/schools.component';
import { SchoolTypesComponent } from '../pages/management/school-types/school-types.component';
import { AddressesComponent } from '../pages/management/addresses/addresses.component';
import { StreetsComponent } from '../pages/management/streets/streets.component';
import { CitiesComponent } from '../pages/management/cities/cities.component';
import { CityTypesComponent } from '../pages/management/city-types/city-types.component';
import { RegionsComponent } from '../pages/management/regions/regions.component';
import { CountriesComponent } from '../pages/management/countries/countries.component';

const routes: Routes = [
    {
        path: '',
		component: TopMenuComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'events', component: EventsComponent },
            {
                path: 'management',
                component: ManagementComponent,
                children: [
                    { path: '', component: SubjectsComponent },
                    { path: 'subjects', component: SubjectsComponent },
                    { path: 'departments', component: DepartmentsComponent },
                    { path: 'volunteers', component: VolunteersComponent },
                    { path: 'groups', component: GroupsComponent },
                    { path: 'academicPrograms', component: AcademicProgramsComponent },
                    { path: 'schools', component: SchoolsComponent },
                    { path: 'schoolTypes', component: SchoolTypesComponent },
                    { path: 'addresses', component: AddressesComponent },
                    { path: 'streets', component: StreetsComponent },
                    { path: 'cities', component: CitiesComponent },
                    { path: 'cityTypes', component: CityTypesComponent },
                    { path: 'regions', component: RegionsComponent },
                    { path: 'countries', component: CountriesComponent }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }