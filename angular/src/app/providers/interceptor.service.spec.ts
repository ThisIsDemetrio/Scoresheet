import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { HTTP_INTERCEPTORS, HttpClient } from "@angular/common/http";
import { InterceptorService } from "./interceptor.service";
import { AuthService } from "./auth.service";
import { Optional } from "../models/types";
import { Router } from "@angular/router";

class AuthServiceWithMockedAccessToken {
	accessToken: Optional<string>;
}

describe("InterceptorService", () => {
	let http: HttpClient;
	let authService: AuthServiceWithMockedAccessToken;
	let httpMock: HttpTestingController;
	let router: Router;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, RouterTestingModule],
			providers: [
				{
					provide: HTTP_INTERCEPTORS,
					useClass: InterceptorService,
					multi: true,
				},
				{ provide: AuthService, useClass: AuthServiceWithMockedAccessToken },
			],
		});

		authService = TestBed.inject(AuthService);
		http = TestBed.inject(HttpClient);
		httpMock = TestBed.inject(HttpTestingController);
		router = TestBed.inject(Router);
	});

	afterEach(() => {
		httpMock.verify();
	});

	it("should add Content-Type header if not present", () => {
		authService.accessToken = "212";

		http.get("/dummy").subscribe();

		const req = httpMock.expectOne("/dummy");
		expect(req.request.headers.has("Content-Type")).toBe(true);
		expect(req.request.headers.get("Content-Type")).toBe("application/json");
	});

	it("should add Authorization header with Bearer token if accessToken exists", () => {
		authService.accessToken = "414";

		http.get("/dummy").subscribe();

		const req = httpMock.expectOne("/dummy");
		expect(req.request.headers.has("Authorization")).toBe(true);
		expect(req.request.headers.get("Authorization")).toBe("Bearer 414");
	});

	it("should navigate to login page if accessToken doesn't exist", () => {
		authService.accessToken = null;

		spyOn(router, "navigate");
		http.get("/dummy").subscribe();
		expect(router.navigate).toHaveBeenCalledWith(["login"]);

		const req = httpMock.expectOne("/dummy");
		req.flush(null); // Simulate completing the request
	});
});
