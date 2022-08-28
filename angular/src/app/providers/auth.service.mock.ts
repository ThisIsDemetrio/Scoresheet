import { HttpClient } from "@angular/common/http";
import { Inject } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of, tap } from "rxjs";
import { LoginModel, AuthenticatedUserModel, SignupModel } from "../models/auth.model";
import { OperationReasonCode, OperationResponseModel } from "../models/operation-response.model";
import { PlayerModel } from "../models/player.model";
import { Optional, Variables } from "../models/types";
import { AuthService } from "./auth.service";

export class AuthMockService implements Variables<AuthService> {
	private _currentUser: Optional<PlayerModel> = null;

	get accessToken(): Optional<string> {
		return "access_token";
	}

	get isLoggedIn(): boolean {
		return !!this._currentUser;
	}

	get currentUser(): Optional<PlayerModel> {
		return this._currentUser;
	}

	constructor() {}

	login(loginData: LoginModel): Observable<AuthenticatedUserModel> {
		const currentUser = {
			id: "id",
			groups: ["group_1", "group_2"],
			name: loginData.username,
			avatar: "cat",
		};

		this._currentUser = { ...currentUser };

		return of({
			accessToken: "access_token",
			userData: currentUser,
		});
	}

	signup(signupData: SignupModel): Observable<AuthenticatedUserModel> {
		this._currentUser = signupData.player;

		return of({
			accessToken: "access_token",
			userData: signupData.player,
		});
	}

	isUsernameAvailable(username: string): Observable<boolean> {
		return of(true);
	}

	logout(): void {}

	changePassword(playerId: string, oldPassword: string, newPassword: string): Observable<OperationResponseModel> {
		return of({
			success: true,
			reasonCode: OperationReasonCode.Success,
		});
	}

	update(player: PlayerModel): Observable<boolean> {
		return of(true);
	}
}
