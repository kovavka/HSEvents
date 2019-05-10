import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AbstractComponent } from '../../utilities/abstract.component';
import { AttendeeDto, AttendeeType, SexType } from '../../models/user.models';
import { SchoolService } from '../management/components/schools/schools.service';
import { CityService } from '../management/components/cities/cities.service';
import { City } from '../../models/address.models';
import { School } from '../../models/school.models';
import { AcademicProgram } from '../../models/dictionaries.models';
import { AcademicProgramService } from '../management/components/academic-programs/academic-programs.service';
import { GetTypeList, ListItem } from '../../utilities/enum-helper';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'sign-up.component.html',
    providers: [SchoolService, CityService, AcademicProgramService ]

})
export class SignUpComponent extends AbstractComponent implements OnInit {

    login: string;
    password: string;
    type: AttendeeType;
    fullName: string;
    phoneNumber: string;
    email: string;
    sex: SexType;
    yearOfGraduation: string;
    interestingProgramIds: number[];
    
    allCities: City[];
    city: City;
    allSchools: School[];
    school: School;
    allPrograms: AcademicProgram[] = [];
    selectedPrograms: AcademicProgram[] = [];
    sexTypes: ListItem[];
    attendeeTypes: ListItem[];

    constructor(protected router: Router,
        protected cityService: CityService,
        protected schoolService: SchoolService,
        protected academicProgramService: AcademicProgramService,
        protected authService: AuthService,
        protected changeDetectorRef: ChangeDetectorRef) {
        super(changeDetectorRef, authService);
    }

    ngOnInit() {
        this.cityService.getAll()
            .subscribe(data => {
                this.allCities = data;
                var possible = data.find(x => x.name == 'Пермь');

                if (possible)
                    this.city = possible;

                var cityId = this.city && this.city.id;

                this.getSchools(cityId);
            });

        this.academicProgramService.getAll()
            .subscribe(data => {
                this.allPrograms = data;
            });


        this.sexTypes = GetTypeList.sex();
        this.attendeeTypes = GetTypeList.attendee();
    }

    getSchools(cityId: number) {
        this.schoolService.getAll(cityId)
            .subscribe(data => {
                this.allSchools = data;
                this.school = data[0];
            });
    }

    getPrograms(program: AcademicProgram): AcademicProgram[] {
        var selected = this.selectedPrograms.map(x => x.id);

        if (program)
            selected = selected.filter(x => x !== program.id);

        if (selected.length == 0)
            return this.allPrograms;

        return this.allPrograms.filter(x => selected.indexOf(x.id) === -1);
    }

    cityDisplayFunc(city: City) {
        return `${city.cityType.shortName} ${city.name} (${city.region.country.name}, ${city.region.name})`;
    }

    schoolDisplayFunc(school: School) {
        return school.name;
    }

    programDisplayFunc(program: AcademicProgram) {
        return program.name;
    }

    cityChange(city: City) {
        this.city = city;
        this.getSchools(city.id);
    }

    schoolChange(school: School) {
        this.school = school;
    }

    programChange(program: AcademicProgram, index: number) {
        this.selectedPrograms[index] = program;
    }

    addProgram() {
        var possible = this.getPrograms(null);
        this.selectedPrograms.push(possible[0]);
    }

    onSignUpClick() {
        var attendee = <AttendeeDto> {
            login: this.login,
            password: this.password,
            type: this.type,
            fullName: this.fullName,
            phoneNumber: this.phoneNumber,
            email: this.email,
            sex: this.sex,
            yearOfGraduation: this.yearOfGraduation,
            interestingProgramIds: this.selectedPrograms.map(x => x.id),
            schoolId: this.school.id,
        }

        this.authService.signUp(attendee)
            .subscribe(x => {
                this.router.navigate(['/events']);
            });
    }
}
