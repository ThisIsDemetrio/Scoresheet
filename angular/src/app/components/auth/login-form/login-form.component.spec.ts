import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { LoginFormComponent } from "./login-form.component";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { AuthMockService } from "src/app/providers/auth.service.mock";
import { AuthService } from "src/app/providers/auth.service";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe("LoginFormComponent", () => {
	let component: LoginFormComponent;
	let fixture: ComponentFixture<LoginFormComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [MatSnackBarModule, NoopAnimationsModule, RouterTestingModule],
			declarations: [LoginFormComponent],
			providers: [{ provide: AuthService, useFactory: () => new AuthMockService() }],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();

		fixture = TestBed.createComponent(LoginFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
