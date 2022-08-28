import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";
import { AuthenticatedUserModel, LoginModel, SignupModel } from "../models/auth.model";
import { OperationResponseModel } from "../models/operation-response.model";
import { PlayerModel } from "../models/player.model";
import { Nil, Optional } from "../models/types";
import { BrowserStorageService } from "./browser-storage.service";
import { ENDPOINT_URL } from "./tokens";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	get accessToken(): Optional<string> {
		return this.browserStorage.getFromStorage()?.accessToken;
	}

	get isLoggedIn(): boolean {
		return !!this.browserStorage.getFromStorage()?.accessToken;
	}

	get currentUser(): Optional<PlayerModel> {
		return this.browserStorage.getFromStorage()?.userData;
	}

	private get endpoint(): string {
		return `${this.baseUrl}/Auth`;
	}

	constructor(
		@Inject(ENDPOINT_URL) private readonly baseUrl: string,
		private readonly browserStorage: BrowserStorageService,
		private readonly httpClient: HttpClient,
		private readonly router: Router
	) {}

	login(loginData: LoginModel): Observable<AuthenticatedUserModel> {
		return this.httpClient
			.post<AuthenticatedUserModel>(`${this.endpoint}/Login`, loginData)
			.pipe(tap(result => this.browserStorage.setToStorage(result)));
	}

	signup(signupData: SignupModel): Observable<AuthenticatedUserModel> {
		return this.httpClient
			.post<AuthenticatedUserModel>(`${this.endpoint}/Signup`, signupData)
			.pipe(tap(result => this.browserStorage.setToStorage(result)));
	}

	isUsernameAvailable(username: string): Observable<boolean> {
		return this.httpClient.get<boolean>(`${this.endpoint}/IsUsernameAvailable/${username}`);
	}

	logout(): void {
		this.browserStorage.clearStorage();
		this.router.navigate(["./login"]);
	}

	changePassword(playerId: string, oldPassword: string, newPassword: string): Observable<OperationResponseModel> {
		return this.httpClient.post<OperationResponseModel>(`${this.endpoint}/ChangePassword/${playerId}`, {
			oldPassword,
			newPassword,
		});
	}

	update(player: PlayerModel): Observable<boolean> {
		return this.httpClient
			.post<boolean>(`${this.endpoint}/Update/${player.id}`, player)
			.pipe(tap(() => this.browserStorage.updateUserData(player)));
	}
}
