import { Component, EventEmitter, Output } from "@angular/core";
import { LoginModel } from "src/app/models/auth.model";
import { Player } from "src/app/models/player.model";
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

	@Output() loginPageRequested = new EventEmitter<void>();

	constructor(private readonly authService: AuthService) {}

	changeToLoginPage(): void {
		this.loginPageRequested.emit();
	}

	canSignup(): boolean {
		return !!this.username && this.password?.length > 6 && this.password === this.repeatedPassword;
	}

	signup(): void {
		const signupData: LoginModel = {
			username: this.username,
			password: this.password,
		};

		const player: Player = {
			id: "",
			groups: [],
			// TODO: Allow user to select the name and the avatar
			name: this.username,
		};

		this.authService
			.signup({
				signupData,
				player,
			})
			.subscribe
			// TODO: Route to home in case of success
			// TODO: Handle error
			();
	}
}
