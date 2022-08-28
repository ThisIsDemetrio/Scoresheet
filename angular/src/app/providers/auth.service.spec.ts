import { Location } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { fakeAsync, TestBed, tick, waitForAsync } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { LoginComponent } from "../components/auth/login/login.component";
import { LoginModel, SignupModel } from "../models/auth.model";

import { AuthService } from "./auth.service";
import { ENDPOINT_URL } from "./tokens";

describe("AuthService", () => {
	let service: AuthService;
	let httpMock: HttpTestingController;
	let location: Location;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientTestingModule,
				RouterTestingModule.withRoutes([{ path: "./login", component: LoginComponent }]),
			],
			providers: [{ provide: ENDPOINT_URL, useValue: "." }],
		});

		service = TestBed.inject(AuthService);
		httpMock = TestBed.inject(HttpTestingController);
		location = TestBed.inject(Location);
	});

	it("should execute the Login request", () => {
		const login: LoginModel = {
			username: "username",
			password: "password",
		};

		service.login(login).subscribe();

		const req = httpMock.expectOne("./Auth/Login");
		expect(req.request.method).toBe("POST");
		expect(req.request.body["username"]).toBe("username");
		expect(req.request.body["password"]).toBe("password");
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

		service.signup(signup).subscribe();

		const req = httpMock.expectOne("./Auth/Signup");
		expect(req.request.method).toBe("POST");
		expect(req.request.body.signupData["username"]).toBe("username");
		expect(req.request.body.signupData["password"]).toBe("password");
		expect(req.request.body.player).toBeDefined();
	});

	it("should execute the IsUsernameAvailable request", () => {
		service.isUsernameAvailable("username").subscribe();

		const req = httpMock.expectOne("./Auth/IsUsernameAvailable/username");
		expect(req.request.method).toBe("GET");
	});

	it("logout should clear up the storage", () => {
		localStorage.setItem("ScoreSheetStorageKey", "Value");
		service.logout();

		expect(localStorage.getItem("ScoreSheetStorageKey")).toBeNull();
		// TODO: Routing doesn't work properly, find why
	});
});
