import { Injectable } from "@angular/core";
import { AuthenticatedUserModel } from "../models/auth.model";
import { PlayerModel } from "../models/player.model";

type StorageData = AuthenticatedUserModel & { expirationDate: number };

@Injectable({ providedIn: "root" })
export class BrowserStorageService {
	private readonly STORAGE_KEY = "ScoreSheetStorageKey";

	getFromStorage(): AuthenticatedUserModel | null {
		const storedDataStringified = localStorage.getItem(this.STORAGE_KEY);
		const storedData: StorageData = JSON.parse(storedDataStringified || "null");

		if (!storedData || storedData.expirationDate < new Date().getTime()) {
			return null;
		} else {
			const result = {
				accessToken: storedData.accessToken,
				userData: storedData.userData,
			};

			this.setToStorage(result);
			return result;
		}
	}

	setToStorage(newData: AuthenticatedUserModel): void {
		localStorage.setItem(
			this.STORAGE_KEY,
			JSON.stringify({
				accessToken: newData.accessToken,
				userData: newData.userData,
				expirationDate: new Date().getTime() + 30 * 60000,
			})
		);
	}

	clearStorage(): void {
		localStorage.removeItem(this.STORAGE_KEY);
	}

	updateAccessToken(accessToken: string): void {
		const storedData = this.getFromStorage();
		if (!storedData) throw new Error("Impossible to update AccessToken: data from storage are empty!");
		storedData.accessToken = accessToken;
		this.setToStorage(storedData);
	}

	updateUserData(userData: PlayerModel): void {
		const storedData = this.getFromStorage();
		if (!storedData) throw new Error("Impossible to update UserData: data from storage are empty!");
		storedData.userData = userData;
		this.setToStorage(storedData);
	}
}
