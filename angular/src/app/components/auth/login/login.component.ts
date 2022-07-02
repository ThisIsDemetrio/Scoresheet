import { Component, OnInit } from "@angular/core";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
	formShown: "login" | "signup" = "login";

	ngOnInit(): void {
		// TODO: In case I'm already logged, route me to /home
	}

	onSignupPageRequested(): void {
		this.formShown = "signup";
	}

	onLoginPageRequested(): void {
		this.formShown = "login";
	}
}
