import { Component, OnInit } from "@angular/core";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
	formShown: "login" | "signup" = "login";

	onSignupPageRequested(): void {
		this.formShown = "signup";
	}

	onLoginPageRequested(): void {
		this.formShown = "login";
	}
}
