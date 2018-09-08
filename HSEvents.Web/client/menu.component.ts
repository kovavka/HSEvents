import { Component } from '@angular/core';

@Component({
    moduleId: module.id.toString(),
    selector: 'menu',
    templateUrl: 'menu.component.html'
})
export class MenuComponent {


	get login():string {
		return "test";
	}

	get isAuthenticated():boolean {
		return this.isAuth;
	}

	isAuth: boolean=true;

	exit() {
		this.isAuth = !this.isAuth;
	}
}