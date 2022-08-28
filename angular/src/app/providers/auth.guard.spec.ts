import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { AuthMockService } from "./auth.service.mock";

describe("AuthGuardService", () => {
	let service: AuthGuard;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			providers: [{ provide: AuthService, useFactory: () => new AuthMockService() }],
		});
		service = TestBed.inject(AuthGuard);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
