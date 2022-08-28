import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed, waitForAsync } from "@angular/core/testing";
import { AppComponent } from "./app.component";

describe("AppComponent", () => {
	let appComponent: AppComponent;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			imports: [],
			declarations: [AppComponent],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();
	}));

	beforeEach(() => {
		const fixture = TestBed.createComponent(AppComponent);
		appComponent = fixture.debugElement.componentInstance;
	});

	it("should create the app", () => expect(appComponent).toBeTruthy());
});
