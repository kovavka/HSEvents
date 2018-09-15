import { Component } from '@angular/core';

@Component({
    moduleId: module.id.toString(),
    selector: 'top-menu',
	templateUrl: 'top-menu.component.html'
})
export class TopMenuComponent {


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