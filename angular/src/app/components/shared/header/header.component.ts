import { Component, EventEmitter, Input, Output } from "@angular/core";
import { SideDrawerService } from "../../../providers/side-drawer.service";

export type HeaderIconType = "menu" | "back";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
	@Input() name: string = "";
	@Input() icon: HeaderIconType = "menu";
	@Output() iconClick = new EventEmitter<never>();

	constructor(private readonly sidedrawerService: SideDrawerService) {}

	openSidedrawer(): void {
		this.sidedrawerService.openSidedrawer();
	}

	onIconClick(): void {
		this.iconClick.emit();
	}
}
