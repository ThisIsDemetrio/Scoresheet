import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { GroupModel } from "src/app/models/group.model";
import { OperationReasonCode } from "src/app/models/operation-response.model";
import { Optional } from "src/app/models/types";
import { AuthService } from "src/app/providers/auth.service";
import { GroupService } from "src/app/providers/group.service";

@Component({
	selector: "app-group-info",
	templateUrl: "./group-info.component.html",
	styleUrls: ["./group-info.component.scss"],
})
export class GroupInfoComponent implements OnInit {
	@Input() group: Optional<GroupModel>;
	@Output() goBackClick = new EventEmitter();

	userId: string = "";
	canDeleteGroup = false;
	isLoading = false;
	isAdmin = false;

	constructor(
		private readonly authService: AuthService,
		private readonly groupService: GroupService,
		private readonly matSnackBar: MatSnackBar
	) {}

	ngOnInit(): void {
		this.userId = this.authService.currentUser?.id || "";
		this.isAdmin = this.userId === this.group?.creatorId;
		this.canDeleteGroup = this.isAdmin && (this.group?.participants.length || 0) > 1;
	}

	goBack = (): void => this.goBackClick.emit();

	leaveGroup(): void {
		this.groupService.leaveGroup(this.group?.id || "", this.userId).subscribe({
			next: () => {
				this.matSnackBar.open("Hai lasciato il gruppo", "", { panelClass: "snack-success" });
				this.goBack();
			},
			error: () => this.matSnackBar.open("Errore nella richiesta.", "", { panelClass: "snack-error" }),
		});
	}

	deleteGroup(): void {
		this.groupService.deleteGroup(this.group?.id || "", this.userId).subscribe({
			next: result => {
				if (result.reasonCode === OperationReasonCode.GroupNotEmpty) {
					this.matSnackBar.open("Il gruppo non è vuoto. Verifica che non ci siano partecipanti.", "", {
						panelClass: "snack-error",
					});
				} else {
					this.matSnackBar.open("Hai cancellato il gruppo", "", { panelClass: "snack-success" });
					this.goBack();
				}
			},
			error: () => this.matSnackBar.open("Errore nella richiesta.", "", { panelClass: "snack-error" }),
		});
	}
}
