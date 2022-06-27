import { Component, EventEmitter, Output } from "@angular/core";
import { AuthService } from "../../../providers/auth.service";

@Component({
	selector: "app-login-form",
	templateUrl: "./login-form.component.html",
	styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent {
	username: string = "";
	password: string = "";

	@Output() signupPageRequested = new EventEmitter<void>();

	constructor(private readonly authService: AuthService) {}

	changeToSignupPage(): void {
		this.signupPageRequested.emit();
	}

	canLogin(): boolean {
		return !!this.username && this.password?.length > 6;
	}

	login(): void {
		this.authService
			.login({
				username: this.username,
				password: this.password,
			})
			.subscribe
			// TODO: Route to home in case of success
			// TODO: Handle error
			();
	}
}
