import { Component, EventEmitter, Output } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { LoginModel } from "src/app/models/auth.model";
import { PlayerModel } from "src/app/models/player.model";
import { AuthService } from "../../../providers/auth.service";

@Component({
	selector: "app-signup-form",
	templateUrl: "./signup-form.component.html",
	styleUrls: ["./signup-form.component.scss"],
})
export class SignupFormComponent {
	// TODO: Just for fun, transform it in a Reactive Form
	// TODO: Handle loading
	username: string = "";
	password: string = "";
	repeatedPassword: string = "";

	onPendingRequest = false;

	@Output() loginPageRequested = new EventEmitter<void>();

	constructor(
		private readonly authService: AuthService,
		private readonly router: Router,
		private readonly snackBar: MatSnackBar
	) {}

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

		const player: PlayerModel = {
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
			.subscribe({
				next: () => this.router.navigate(["/home"]),
				error: () => {
					this.onPendingRequest = false;
					this.snackBar.open("Creazione utente fallita", "", { panelClass: "snack-error" });
				},
			});
	}
}
