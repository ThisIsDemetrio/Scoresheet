import { Component, OnInit } from "@angular/core";
import { PlayerModel } from "src/app/models/player.model";
import { AuthService } from "src/app/providers/auth.service";

@Component({
	selector: "app-user-options",
	templateUrl: "./user-options.component.html",
	styleUrls: ["./user-options.component.scss"],
})
export class UserOptionsComponent implements OnInit {
	currentUser: PlayerModel | null = null;

	constructor(private readonly authService: AuthService) {}

	ngOnInit(): void {
		this.currentUser = this.authService.currentUser;
	}
}
