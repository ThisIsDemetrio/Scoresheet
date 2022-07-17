import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
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

	constructor(private readonly authService: AuthService, private readonly matSnackBar: MatSnackBar) {}

	ngOnInit(): void {
		if (!!this.authService.currentUser) this.currentUser = { ...this.authService.currentUser };
	}

	canChangeUserInfo(): boolean {
		return !!this.currentUser.name && !!this.currentUser.avatarUrl;
	}

	canChangePassword(): boolean {
		return this.oldPassword.length > 6 && this.password.length > 6 && this.password === this.repeatedPassword;
	}

	updateUserInfo(): void {
		if (!this.canChangeUserInfo) return;

		this.authService.update(this.currentUser).subscribe({
			next: () => this.matSnackBar.open("Utente aggiornato", "", { panelClass: "mat-primary" }),
			error: () => this.matSnackBar.open("Impossibile aggiornare l'utente", "", { panelClass: "mat-warn" }),
		});
	}

	changePassword(): void {
		if (!this.canChangePassword) return;

		this.authService.changePassword(this.oldPassword, this.password).subscribe({
			next: () => this.matSnackBar.open("Password aggiornata", "", { panelClass: "mat-primary" }),
			error: () => this.matSnackBar.open("Impossibile cambiare la password", "", { panelClass: "mat-warn" }),
		});
	}
}
