import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { GroupModel } from "src/app/models/group.model";
import { PlayerModel } from "src/app/models/player.model";
import { Optional } from "src/app/models/types";
import { AuthService } from "src/app/providers/auth.service";
import { GroupService } from "../../providers/group.service";
import { CreateGroupComponent } from "./create-group/create-group.component";
import { JoinGroupComponent } from "./join-group/join-group.component";

@Component({
	selector: "app-group-list",
	templateUrl: "./group-list.component.html",
	styleUrls: ["./group-list.component.scss"],
})
export class GroupListComponent implements OnInit {
	// LOADER: Loading management in UI
	// ERROR: Error management in UI
	currentUser: PlayerModel | null = null;
	selectedGroup: Optional<GroupModel> = null;
	groups: GroupModel[] = [];
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
		this.service.getUserGroups(userId).subscribe({
			next: result => (this.groups = result),
			error: () => {
				this.errorWhileLoading = true;
				this.loading = false;
			},
			complete: () => (this.loading = false),
		});
	}

	isGroupAdmin(group: GroupModel): boolean {
		return group.creatorId === this.authService.currentUser?.id;
	}

	openGroupDetails = (group: GroupModel) => (this.selectedGroup = group);
	closeGroupDetails = () => (this.selectedGroup = null);

	joinGroup(): void {
		const matDialogRef = this.matDialog.open(JoinGroupComponent, { data: {}, hasBackdrop: true });
		matDialogRef.afterClosed().subscribe(refresh => refresh && this.getUserGroups());
	}

	createGroup(): void {
		const matDialogRef = this.matDialog.open(CreateGroupComponent, { data: {}, hasBackdrop: true });
		matDialogRef.afterClosed().subscribe(refresh => refresh && this.getUserGroups());
	}
}
