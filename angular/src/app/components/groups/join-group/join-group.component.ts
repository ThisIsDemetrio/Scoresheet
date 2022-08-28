import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { JoinGroupData } from "src/app/models/group.model";
import { OperationReasonCode } from "src/app/models/operation-response.model";
import { OperationResponseHandlerMap } from "src/app/models/types";
import { AuthService } from "src/app/providers/auth.service";
import { GroupService } from "src/app/providers/group.service";

@Component({
	selector: "app-join-group",
	templateUrl: "./join-group.component.html",
	styleUrls: ["./join-group.component.scss"],
})
export class JoinGroupComponent {
	// REACTIVE: Just for fun, transform it in a Reactive Form
	groupId: string = "";
	password: string = "";

	// LOADER: Handle loading
	isLoading = false;

	operationResponseHandler: OperationResponseHandlerMap = {
		[OperationReasonCode.Success]: () => {
			this.snackBar.open("Ti sei unito al gruppo!", "", { panelClass: "snack-success" });
			this.matDialogRef.close(true);
		},
		[OperationReasonCode.UnhandledFailure]: () => {
			this.snackBar.open("Errore nella richiesta. Riprovare o verificare la connessione.", "", {
				panelClass: "snack-error",
			});
			this.isLoading = false;
		},
		[OperationReasonCode.PasswordNotValid]: () => {
			this.snackBar.open("Password errata", "", { panelClass: "snack-error" });
			this.isLoading = false;
		},
		[OperationReasonCode.GroupNotFound]: () => {
			this.snackBar.open("Questo gruppo non esiste", "", { panelClass: "snack-error" });
		},
	};

	constructor(
		private readonly authService: AuthService,
		private readonly matDialogRef: MatDialogRef<JoinGroupComponent>,
		private readonly service: GroupService,
		private readonly snackBar: MatSnackBar
	) {}

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
			next: result => this.operationResponseHandler[result.reasonCode]!(),
			error: this.operationResponseHandler[OperationReasonCode.UnhandledFailure],
		});
	}
}
