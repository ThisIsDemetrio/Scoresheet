import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { OperationReasonCode } from "src/app/models/operation-response.model";
import { PlayerModel } from "src/app/models/player.model";
import { AuthService } from "src/app/providers/auth.service";
import { SideDrawerService } from "src/app/providers/side-drawer.service";

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
	// TODO: Just for fun, transform it in two Reactive Forms

	originalUser: PlayerModel = getEmptyPlayer();
	currentUser: PlayerModel = getEmptyPlayer();

	oldPassword = "";
	password = "";
	repeatedPassword = "";

	constructor(
		private readonly authService: AuthService,
		private readonly matSnackBar: MatSnackBar,
		private readonly sidedrawerService: SideDrawerService
	) {}

	ngOnInit(): void {
		if (!!this.authService.currentUser) {
			this.currentUser = { ...this.authService.currentUser };
			this.originalUser = { ...this.currentUser };
		}
	}

	openSidedrawer(): void {
		this.sidedrawerService.openSidedrawer();
	}

	canChangeUserInfo(): boolean {
		return (
			!!this.currentUser.name &&
			!!this.currentUser.avatar &&
			(this.currentUser.name !== this.originalUser.name || this.currentUser.avatar !== this.originalUser.avatar)
		);
	}

	canChangePassword(): boolean {
		return (
			this.oldPassword.length > 6 &&
			this.password.length > 6 &&
			this.password === this.repeatedPassword &&
			this.oldPassword !== this.password
		);
	}

	updateUserInfo(): void {
		if (!this.canChangeUserInfo) return;

		this.authService.update(this.currentUser).subscribe({
			next: () => this.matSnackBar.open("Utente aggiornato", "", { panelClass: "snack-success" }),
			error: () => this.matSnackBar.open("Impossibile aggiornare l'utente", "", { panelClass: "snack-error" }),
		});
	}

	changePassword(): void {
		if (!this.canChangePassword) return;

		this.authService.changePassword(this.currentUser.id!, this.oldPassword, this.password).subscribe({
			next: result => {
				switch (result.reasonCode) {
					case OperationReasonCode.Success:
						this.matSnackBar.open("Password aggiornata", "", { panelClass: "snack-success" });
						break;
					default:
						this.matSnackBar.open("Password precedente non valida", "", { panelClass: "snack-error" });
						break;
				}
			},
			error: () => this.matSnackBar.open("Impossibile cambiare la password", "", { panelClass: "snack-error" }),
		});
	}
}
