import { Component, EventEmitter, OnInit } from "@angular/core";
import { AuthService } from "src/app/providers/auth.service";

@Component({
	selector: "app-signup-form",
	templateUrl: "./signup-form.component.html",
	styleUrls: ["./signup-form.component.scss"],
})
export class SignupFormComponent {
	username: string = "";
	password: string = "";
	repeatedPassword: string = "";

	loginPageRequested = new EventEmitter<void>();

	constructor(private readonly authService: AuthService) {}

	changeToSignupPage(): void {
		this.loginPageRequested.emit();
	}

	canSignup(): boolean {
		return !!this.username && this.password?.length > 6 && this.password === this.repeatedPassword;
	}

	signup(): void {
		// TODO: login
	}
}
