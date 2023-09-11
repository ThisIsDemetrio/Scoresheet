import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";

class AuthServiceWithMockedIsLoggedIn {
	isLoggedIn: boolean = false;
}

describe("AuthGuard", () => {
	let guard: AuthGuard;
	let authService: AuthServiceWithMockedIsLoggedIn;
	let router: Router;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			providers: [AuthGuard, { provide: AuthService, useClass: AuthServiceWithMockedIsLoggedIn }],
		});

		guard = TestBed.inject(AuthGuard);
		authService = TestBed.inject(AuthService);
		router = TestBed.inject(Router);
	});

	it("should be created", () => {
		expect(guard).toBeTruthy();
	});

	describe("canActivate", () => {
		it("should return true if user is logged in", () => {
			authService.isLoggedIn = true;

			const canActivateResult = guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);

			expect(canActivateResult).toBe(true);
		});

		it("should navigate to login page and return false if user is not logged in", () => {
			const navigateSpy = spyOn(router, "navigate");
			authService.isLoggedIn = false;

			const canActivateResult = guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);

			expect(navigateSpy).toHaveBeenCalledWith(["/login"]);
			expect(canActivateResult).toBe(false);
		});
	});
});
