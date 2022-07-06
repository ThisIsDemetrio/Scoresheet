import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";
import { AuthenticatedUserModel, LoginModel, SignupModel } from "../models/auth.model";
import { Player } from "../models/player.model";
import { ENDPOINT_URL } from "./tokens";

const CURRENT_USER = "ScoreSheetCurrentUser";
const ACCESS_TOKEN = "ScoreSheetAccessToken";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	private _accessToken: string = "";
	set accessToken(value: string) {
		localStorage.setItem(ACCESS_TOKEN, value ?? "");
		this._accessToken = value;
	}

	get accessToken(): string {
		return (this._accessToken || localStorage.getItem(ACCESS_TOKEN)) ?? "";
	}

	get isLoggedIn(): boolean {
		return !!this._accessToken;
	}

	private _currentUser: Player | null = null;
	set currentUser(value: Player | null) {
		localStorage.setItem(CURRENT_USER, JSON.stringify(value ?? {}));
		this._currentUser = !!value ? { ...value } : null;
	}

	get currentUser(): Player | null {
		if (this._currentUser) return this._currentUser;

		const storedCurrentUserData = localStorage.getItem(CURRENT_USER);
		if (!storedCurrentUserData) return null;

		return JSON.parse(storedCurrentUserData);
	}

	private get endpoint(): string {
		return `${this.baseUrl}/Auth`;
	}
	constructor(
		@Inject(ENDPOINT_URL) private readonly baseUrl: string,
		private readonly httpClient: HttpClient,
		private readonly router: Router
	) {}

	login(loginData: LoginModel): Observable<AuthenticatedUserModel> {
		return this.httpClient
			.post<AuthenticatedUserModel>(`${this.endpoint}/Login`, loginData)
			.pipe(tap(res => (this.accessToken = res.accessToken)));
	}

	signup(signupData: SignupModel): Observable<AuthenticatedUserModel> {
		return this.httpClient
			.post<AuthenticatedUserModel>(`${this.endpoint}/Signup`, signupData)
			.pipe(tap(res => (this.accessToken = res.accessToken)));
	}

	isUsernameAvailable(username: string): Observable<boolean> {
		return this.httpClient.get<boolean>(`${this.endpoint}/IsUsernameAvailable/${username}`);
	}

	logout(): void {
		this.accessToken = "";
		this.router.navigate(["./login"]);
	}

	// TODO: Logout?

	clearStorage() {
		localStorage.clear();
	}
}
