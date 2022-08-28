import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthService } from "./auth.service";
import { AuthMockService } from "./auth.service.mock";

import { InterceptorService } from "./interceptor.service";

describe("InterceptorService", () => {
	let service: InterceptorService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			providers: [{ provide: AuthService, useClass: AuthMockService }],
		});
		service = TestBed.inject(InterceptorService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
