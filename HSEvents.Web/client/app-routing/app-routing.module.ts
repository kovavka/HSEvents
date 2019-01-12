import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopMenuComponent } from '../menus/top-menu.component';
import { HomeComponent } from '../pages/home/home.component';
import { EventsComponent } from '../pages/events/events.component';
import { ManagementComponent } from '../pages/management/management.component';
import { SubjectsComponent } from '../pages/management/components/subjects/subjects.component';
import { DepartmentsComponent } from '../pages/management/components/departments/departments.component';
import { VolunteersComponent } from '../pages/management/components/volunteers/volunteers.component';
import { GroupsComponent } from '../pages/management/components/groups/groups.component';
import { AcademicProgramsComponent } from '../pages/management/components/academic-programs/academic-programs.component';
import { SchoolsComponent } from '../pages/management/components/schools/schools.component';
import { SchoolTypesComponent } from '../pages/management/components/school-types/school-types.component';
import { AddressesComponent } from '../pages/management/components/addresses/addresses.component';
import { StreetsComponent } from '../pages/management/components/streets/streets.component';
import { CitiesComponent } from '../pages/management/components/cities/cities.component';
import { CityTypesComponent } from '../pages/management/components/city-types/city-types.component';
import { RegionsComponent } from '../pages/management/components/regions/regions.component';
import { CountriesComponent } from '../pages/management/components/countries/countries.component';

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