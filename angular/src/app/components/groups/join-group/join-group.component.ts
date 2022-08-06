import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { JoinGroupData } from "src/app/models/group.model";
import { AuthService } from "src/app/providers/auth.service";
import { GroupService } from "src/app/providers/group.service";

@Component({
	selector: "app-join-group",
	templateUrl: "./join-group.component.html",
	styleUrls: ["./join-group.component.scss"],
})
export class JoinGroupComponent {
	// TODO: Just for fun, transform it in a Reactive Form
	groupId: string = "";
	password: string = "";

	// TODO: Handle loading
	isLoading = false;

	constructor(
		private readonly authService: AuthService,
		private readonly matDialogRef: MatDialogRef<JoinGroupComponent>,
		private readonly service: GroupService,
		private readonly snackBar: MatSnackBar
	) {}

	private onSuccess = () => {
		this.snackBar.open("Gruppo creato!", "", { panelClass: "snack-success" });
		this.matDialogRef.close(true);
	};

	private onFailure = () => {
		this.snackBar.open("Errore nella richiesta. Riprovare o verificare la connessione.");
		this.isLoading = false;
	};

	private onWrongPassword = () => {
		this.snackBar.open("Password errata");
		this.isLoading = false;
	};

	joinGroup(): void {
		this.isLoading = false;
		const currentUser = this.authService.currentUser;
		if (!currentUser?.id) {
			this.authService.logout();
			return;
		}

		const data: JoinGroupData = {
			groupId: this.groupId,
			password: this.password,
			playerId: currentUser.id,
		};

		this.service.joinGroup(data).subscribe({
			next: result => (result.success ? this.onSuccess() : this.onWrongPassword()),
			error: this.onFailure,
		});
	}
}
