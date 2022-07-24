import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Group } from "src/app/models/group.model";
import { PlayerModel } from "src/app/models/player.model";
import { AuthService } from "src/app/providers/auth.service";
import { GroupService } from "../../providers/group.service";
import { JoinGroupComponent } from "./join-group/join-group.component";

@Component({
	selector: "app-group-list",
	templateUrl: "./group-list.component.html",
	styleUrls: ["./group-list.component.scss"],
})
export class GroupListComponent implements OnInit {
	// TODO: Styling missing

	currentUser: PlayerModel | null = null;
	groups: Group[] = [];
	loading: boolean = false;
	errorWhileLoading = false;

	constructor(
		private readonly authService: AuthService,
		private readonly matDialog: MatDialog,
		private readonly service: GroupService
	) {}

	ngOnInit(): void {
		if (this.authService.currentUser) this.currentUser = { ...this.authService.currentUser };

		this.getUserGroups();
	}

	getUserGroups(): void {
		this.errorWhileLoading = true;
		this.loading = false;

		const userId = this.authService.currentUser?.id || "";
		this.service.getUserGroup(userId).subscribe({
			next: result => (this.groups = result),
			error: () => {
				this.errorWhileLoading = true;
				this.loading = false;
			},
			complete: () => (this.loading = false),
		});
	}

	isGroupAdmin(group: Group): boolean {
		return group.creatorId === this.authService.currentUser?.id;
	}

	joinGroup(): void {
		this.matDialog.open(JoinGroupComponent, { data: {}, hasBackdrop: true });
	}

	createGroup(): void {
		// TODO: Create the CreateGroupComponent
	}
}