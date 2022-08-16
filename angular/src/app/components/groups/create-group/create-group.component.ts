import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CreateGroupData, JoinGroupData } from "src/app/models/group.model";
import { AuthService } from "src/app/providers/auth.service";
import { GroupService } from "src/app/providers/group.service";
import { JoinGroupComponent } from "../join-group/join-group.component";

@Component({
	selector: "app-create-group",
	templateUrl: "./create-group.component.html",
	styleUrls: ["./create-group.component.scss"],
})
export class CreateGroupComponent {
	// REACTIVE: Just for fun, transform it in a Reactive Form
	groupName: string = "";
	password: string = "";
	repeatedPassword: string = "";

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

	canCreate(): boolean {
		return !!this.groupName && this.password?.length > 6 && this.password === this.repeatedPassword;
	}

	createGroup(): void {
		this.isLoading = false;
		const currentUser = this.authService.currentUser;
		if (!currentUser?.id) {
			this.authService.logout();
			return;
		}

		const data: CreateGroupData = {
			group: {
				id: null,
				creatorId: currentUser.id,
				name: this.groupName,
				participants: [],
			},
			password: this.password,
		};

		this.service.createGroup(data).subscribe({
			next: this.onSuccess,
			error: this.onFailure,
		});
	}
}
