import { ComponentType } from "@angular/cdk/portal";
import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { SideDrawerComponent } from "../components/shared/sidedrawer/sidedrawer.component";

@Injectable({ providedIn: "root" })
export class SideDrawerService {
	private sideDrawerRef: MatDialogRef<SideDrawerComponent> | null = null;

	constructor(private readonly matDialog: MatDialog) {}

	openSidedrawer(): void {
		this.sideDrawerRef = this.matDialog.open(SideDrawerComponent, {
			hasBackdrop: true,
			position: { left: "0", top: "0" },
			height: "100vh",
			width: "50vw",
			data: null,
		});

		this.sideDrawerRef.afterClosed().subscribe(() => (this.sideDrawerRef = null));
	}

	closeSidedrawer(): void {
		this.sideDrawerRef?.close();
		this.sideDrawerRef = null;
	}
}
