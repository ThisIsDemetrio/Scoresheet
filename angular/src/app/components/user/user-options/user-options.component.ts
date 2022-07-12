import { Component, OnInit } from "@angular/core";
import { PlayerModel } from "src/app/models/player.model";
import { AuthService } from "src/app/providers/auth.service";

const getEmptyPlayer = (): PlayerModel => {
	return {
		id: "",
		name: "",
		groups: [],
	};
};
@Component({
	selector: "app-user-options",
	templateUrl: "./user-options.component.html",
	styleUrls: ["./user-options.component.scss"],
})
export class UserOptionsComponent implements OnInit {
	currentUser: PlayerModel = getEmptyPlayer();

	oldPassword = "";
	password = "";
	repeatedPassword = "";

	constructor(private readonly authService: AuthService) {}

	ngOnInit(): void {
		this.currentUser = this.authService.currentUser;
	}

	openAvatarSelector(): void {
		// TODO: Create a modal to select a new avatar (modal should execute the server request)
	}

	canChangePassword(): boolean {
		return this.oldPassword.length > 6 && this.password.length > 6 && this.password === this.repeatedPassword;
	}

	changePassword(): void {
		// TODO: Create service to support the update of a password
	}
}
