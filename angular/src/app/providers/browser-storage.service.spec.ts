import { TestBed } from "@angular/core/testing";
import { BrowserStorageService } from "./browser-storage.service";
import { AuthenticatedUserModel } from "../models/auth.model";
import { PlayerModel } from "../models/player.model";

describe("BrowserStorageService", () => {
	let service: BrowserStorageService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(BrowserStorageService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	describe("getFromStorage", () => {
		it("should return null if no data is stored", () => {
			spyOn(localStorage, "getItem").and.returnValue(null);

			const result = service.getFromStorage();

			expect(result).toBeNull();
		});

		it("should return null if stored data has expired", () => {
			const expiredData = {
				accessToken: "expiredToken",
				userData: { id: "id", name: "username", groups: [] },
				expirationDate: new Date().getTime() - 1000,
			};
			spyOn(localStorage, "getItem").and.returnValue(JSON.stringify(expiredData));

			const result = service.getFromStorage();
			expect(result).toBeNull();
		});

		it("should return stored data if not expired", () => {
			const futureDate = new Date().getTime() + 1000;
			const validData = {
				accessToken: "validToken",
				userData: { id: "id", name: "username", groups: [] },
				expirationDate: futureDate,
			};
			spyOn(localStorage, "getItem").and.returnValue(JSON.stringify(validData));

			const result = service.getFromStorage();

			expect(result).toEqual({
				accessToken: "validToken",
				userData: { id: "id", name: "username", groups: [] },
			});
		});
	});

	describe("setToStorage", () => {
		it("should set data to localStorage", () => {
			spyOn(localStorage, "setItem");

			const newData: AuthenticatedUserModel = {
				accessToken: "newToken",
				userData: { id: "id", name: "username", groups: [] },
			};

			service.setToStorage(newData);

			expect(localStorage.setItem).toHaveBeenCalledWith(
				"ScoreSheetStorageKey",
				jasmine.stringContaining(
					// TODO: We assume that expiringDate is included after the userData
					'{"accessToken":"newToken","userData":{"id":"id","name":"username","groups":[]},'
				)
			);
		});
	});

	describe("clearStorage", () => {
		it("should remove data from localStorage", () => {
			spyOn(localStorage, "removeItem");

			service.clearStorage();

			expect(localStorage.removeItem).toHaveBeenCalledWith("ScoreSheetStorageKey");
		});
	});

	describe("updateAccessToken", () => {
		it("should update the access token in storage", () => {
			const storedData = {
				accessToken: "oldToken",
				userData: {} as PlayerModel,
			};
			spyOn(service, "getFromStorage").and.returnValue(storedData);
			spyOn(service, "setToStorage");

			service.updateAccessToken("newToken");

			expect(service.setToStorage).toHaveBeenCalledWith({
				accessToken: "newToken",
				userData: {} as PlayerModel,
			});
		});

		it("should throw an error if no data is stored", () => {
			spyOn(service, "getFromStorage").and.returnValue(null);

			expect(() => service.updateAccessToken("newToken")).toThrowError(
				"Impossible to update AccessToken: data from storage are empty!"
			);
		});
	});

	describe("updateUserData", () => {
		it("should update the user data in storage", () => {
			const storedData = {
				accessToken: "oldToken",
				userData: {} as PlayerModel,
			};
			spyOn(service, "getFromStorage").and.returnValue(storedData);
			spyOn(service, "setToStorage");

			const newUserData: PlayerModel = { id: "id", name: "username", groups: [] };
			service.updateUserData(newUserData);

			expect(service.setToStorage).toHaveBeenCalledWith({
				accessToken: "oldToken",
				userData: newUserData,
			});
		});

		it("should throw an error if no data is stored", () => {
			spyOn(service, "getFromStorage").and.returnValue(null);

			const newUserData: PlayerModel = { id: "id", name: "username", groups: [] };
			expect(() => service.updateUserData(newUserData)).toThrowError(
				"Impossible to update UserData: data from storage are empty!"
			);
		});
	});
});
