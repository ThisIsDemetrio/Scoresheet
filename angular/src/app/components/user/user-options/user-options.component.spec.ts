import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { AuthService } from "src/app/providers/auth.service";
import { AuthMockService } from "src/app/providers/auth.service.mock";
import { UserOptionsComponent } from "./user-options.component";

describe("UserOptionsComponent", () => {
	let component: UserOptionsComponent;
	let fixture: ComponentFixture<UserOptionsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [MatSnackBarModule, NoopAnimationsModule],
			declarations: [UserOptionsComponent],
			providers: [{ provide: AuthService, useFactory: () => new AuthMockService() }],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();

		fixture = TestBed.createComponent(UserOptionsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
