import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthService } from "src/app/providers/auth.service";
import { AuthMockService } from "src/app/providers/auth.service.mock";
import { SignupFormComponent } from "./signup-form.component";

describe("SignupFormComponent", () => {
	let component: SignupFormComponent;
	let fixture: ComponentFixture<SignupFormComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule, MatSnackBarModule, NoopAnimationsModule],
			declarations: [SignupFormComponent],
			providers: [{ provide: AuthService, useFactory: () => new AuthMockService() }],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();

		fixture = TestBed.createComponent(SignupFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
