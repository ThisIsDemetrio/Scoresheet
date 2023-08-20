import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { fakeAsync, TestBed, tick, waitForAsync } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { LoginComponent } from "../components/auth/login/login.component";
import { LoginModel, SignupModel } from "../models/auth.model";

import { AuthService } from "./auth.service";
import { ENDPOINT_URL } from "./tokens";
import { PlayerModel } from "../models/player.model";
import { BrowserStorageService } from "./browser-storage.service";
import { BrowserStorageMockService } from "./browser-storage.service.mock";

describe("AuthService", () => {
	let service: AuthService;
	let httpMock: HttpTestingController;
	let browserStorage: BrowserStorageMockService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientTestingModule,
				RouterTestingModule.withRoutes([{ path: "login", component: LoginComponent }]),
			],
			providers: [
				{ provide: BrowserStorageService, useFactory: () => new BrowserStorageMockService() },
				{ provide: ENDPOINT_URL, useValue: "." },
			],
		});

		service = TestBed.inject(AuthService);
		httpMock = TestBed.inject(HttpTestingController);
		// NOTE: Cast needed to execute operation to the mocked storage
		browserStorage = TestBed.inject(BrowserStorageService) as unknown as BrowserStorageMockService;
	});

	it("should return valid information regarding the current state of authentication", () => {
		expect(service.currentUser).toBeUndefined();
		expect(service.accessToken).toBeUndefined();
		expect(service.isLoggedIn).toBeFalse();

		const accessToken = "231";
		const userData = {
			id: "id",
			name: "username",
			groups: [],
		};

		browserStorage.setToStorage({ accessToken, userData });

		expect(service.currentUser).toEqual(userData);
		expect(accessToken).toBe(accessToken);
		expect(service.isLoggedIn).toBeTrue();
	});

	it("should execute the Login request", () => {
		const login: LoginModel = {
			username: "username",
			password: "password",
		};

		service.login(login).subscribe(res => expect(res.accessToken).toBe("123"));

		const req = httpMock.expectOne("./Auth/Login");
		expect(req.request.method).toBe("POST");
		expect(req.request.body["username"]).toBe("username");
		expect(req.request.body["password"]).toBe("password");

		req.flush({ accessToken: "123" });
	});

	it("should execute the Signup request", () => {
		const signup: SignupModel = {
			signupData: {
				username: "username",
				password: "password",
			},
			player: {
				id: "id",
				name: "username",
				groups: ["group_1", "group_2"],
				avatar: "cat",
			},
		};

		service.signup(signup).subscribe(res => expect(res.accessToken).toBe("191"));

		const req = httpMock.expectOne("./Auth/Signup");
		expect(req.request.method).toBe("POST");
		expect(req.request.body.signupData["username"]).toBe("username");
		expect(req.request.body.signupData["password"]).toBe("password");
		expect(req.request.body.player).toBeDefined();

		req.flush({ accessToken: "191" });
	});

	it("should execute the IsUsernameAvailable request", () => {
		service.isUsernameAvailable("username").subscribe();

		const req = httpMock.expectOne("./Auth/IsUsernameAvailable/username");
		expect(req.request.method).toBe("GET");
	});

	it("logout should clear up the storage", () => {
		browserStorage.setToStorage({
			accessToken: "123",
			userData: {
				id: "id",
				name: "username",
				groups: [],
			},
		});
		service.logout();

		expect(browserStorage.getFromStorage()).toBeNull();
	});

	it("should execute the password change request", () => {
		service.changePassword("playerId", "oldPassword", "newPassword").subscribe();

		const req = httpMock.expectOne("./Auth/ChangePassword/playerId");
		expect(req.request.method).toBe("POST");
		expect(req.request.body["oldPassword"]).toBe("oldPassword");
		expect(req.request.body["newPassword"]).toBe("newPassword");
	});

	it("should execute to request an update of the player configuration", () => {
		browserStorage.setToStorage({
			accessToken: "092",
			userData: {
				id: "id",
				name: "updatedUsername",
				groups: ["group_1", "group_2"],
				avatar: "cat",
			},
		});

		const updatedPlayer: PlayerModel = {
			id: "id",
			name: "updatedUsername",
			groups: ["group_1", "group_2"],
			avatar: "dog",
		};

		service.update(updatedPlayer).subscribe(() => {
			expect(browserStorage.getFromStorage()?.userData).toEqual(updatedPlayer);
		});

		const req = httpMock.expectOne("./Auth/Update/id");
		expect(req.request.method).toBe("POST");
		expect(req.request.body["id"]).toBe("id");
		expect(req.request.body["name"]).toBe("updatedUsername");
		expect(req.request.body["groups"]).toEqual(["group_1", "group_2"]);
		expect(req.request.body["avatar"]).toBe("dog");

		req.flush(true);
	});
});
