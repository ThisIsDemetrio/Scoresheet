import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/providers/auth.service";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
	formShown: "login" | "signup" = "login";

	constructor(private readonly authService: AuthService, private readonly router: Router) {}

	ngOnInit(): void {
		if (this.authService.isLoggedIn) {
			this.router.navigate(["./home"]);
		}
	}

	onSignupPageRequested(): void {
		this.formShown = "signup";
	}

	onLoginPageRequested(): void {
		this.formShown = "login";
	}
}
