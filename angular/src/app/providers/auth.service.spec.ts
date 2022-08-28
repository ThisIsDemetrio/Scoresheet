import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { AuthService } from "./auth.service";
import { ENDPOINT_URL } from "./tokens";

describe("AuthService", () => {
	let service: AuthService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, RouterTestingModule],
			providers: [{ provide: ENDPOINT_URL, useValue: "./" }],
		});
		service = TestBed.inject(AuthService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
