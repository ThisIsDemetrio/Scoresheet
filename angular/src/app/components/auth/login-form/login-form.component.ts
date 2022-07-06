import { Component, EventEmitter, Output } from "@angular/core";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AuthService } from "../../../providers/auth.service";

@Component({
	selector: "app-login-form",
	templateUrl: "./login-form.component.html",
	styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent {
	username: string = "";
	password: string = "";

	onPendingRequest = false;

	@Output() signupPageRequested = new EventEmitter<void>();

	constructor(
		private readonly authService: AuthService,
		private readonly snackBar: MatSnackBar,
		private readonly router: Router
	) {}

	changeToSignupPage(): void {
		this.signupPageRequested.emit();
	}

	canLogin(): boolean {
		return !!this.username && this.password?.length > 6;
	}

	login(): void {
		this.onPendingRequest = true;

		this.authService
			.login({
				username: this.username,
				password: this.password,
			})
			.subscribe({
				next: () => this.router.navigate(["/home"]),
				error: () => {
					this.onPendingRequest = false;
					this.snackBar.open("Creazione utente fallita");
				},
			});
	}
}
