import { Component, EventEmitter } from "@angular/core";
import { AuthService } from "../../../providers/auth.service";

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
		this.authService
			.signup({
				id: this.username,
				password: this.password,
			})
			.subscribe
			// TODO: Route to home in case of success
			// TODO: Handle error
			();
	}
}
