import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AbstractComponent } from '../../utilities/abstract.component';
import { AttendeeDto } from '../../models/user.models';
import { SchoolService } from '../management/components/schools/schools.service';
import { CityService } from '../management/components/cities/cities.service';
import { City } from '../../models/address.models';
import { School } from '../../models/school.models';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'sign-up.component.html',
    providers: [SchoolService, CityService ]

})
export class SignUpComponent extends AbstractComponent implements OnInit {

    login: string;
    password: string;
    type: number;
    fullName: string;
    phoneNumber: string;
    email: string;
    sex: string;
    yearOfGraduation: string;
    interestingProgramIds: number[];
    
    allCities: City[];
    city: City;
    allSchools: School[];
    school: School;

    constructor(protected router: Router,
        protected cityService: CityService,
        protected schoolService: SchoolService,
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

                this.getStreets(cityId);
            });
    }

    getStreets(cityId: number) {
        this.schoolService.getAll(cityId)
            .subscribe(data => {
                this.allSchools = data;
                this.school = data[0];
            });
    }

    cityDisplayFunc(city: City) {
        return `${city.cityType.shortName} ${city.name} (${city.region.country.name}, ${city.region.name})`;
    }

    schoolDisplayFunc(school: School) {
        return school.name;
    }

    cityChange(city: City) {
        this.city = city;
        this.getStreets(city.id);
    }

    schoolChange(school: School) {
        this.school = school;
    }

    onSignUpClick() {
        var attendee = <AttendeeDto> {
            login: this.login,
            password: this.password,
        }

        this.authService.signUp(attendee)
            .subscribe(x => {
                this.router.navigate(['/events']);
            });
    }
}
