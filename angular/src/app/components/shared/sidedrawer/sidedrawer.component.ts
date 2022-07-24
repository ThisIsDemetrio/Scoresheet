import { Component, Optional } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";

@Component({
	selector: "app-sidedrawer",
	templateUrl: "./sidedrawer.component.html",
	styleUrls: ["./sidedrawer.component.scss"],
})
export class SideDrawerComponent {
	constructor(
		@Optional() private readonly matDialogRef: MatDialogRef<SideDrawerComponent>,
		private readonly router: Router
	) {}

	navigateTo(route: string): void {
		this.router.navigate([route]);
		typeof this.matDialogRef.close === "function" && this.matDialogRef.close();
	}
}
