import { AuthenticatedUserModel } from "../models/auth.model";
import { PlayerModel } from "../models/player.model";
import { Variables } from "../models/types";
import { BrowserStorageService } from "./browser-storage.service";

export class BrowserStorageMockService implements Variables<BrowserStorageService> {
	private storedData: (AuthenticatedUserModel & { expirationDate: number }) | null = null;

	getFromStorage(): AuthenticatedUserModel | null {
		if (!this.storedData || this.storedData.expirationDate < new Date().getTime()) {
			return null;
		} else {
			const result = {
				accessToken: this.storedData.accessToken,
				userData: this.storedData.userData,
			};

			this.setToStorage(result);
			return result;
		}
	}
	setToStorage(newData: AuthenticatedUserModel): void {
		this.storedData = {
			...newData,
			expirationDate: new Date().getTime(),
		};
	}

	clearStorage(): void {
		this.storedData = null;
	}

	updateAccessToken(accessToken: string): void {
		if (this.storedData) this.storedData.accessToken = accessToken;
	}

	updateUserData(userData: PlayerModel): void {
		if (!this.storedData) throw new Error("Impossible to update UserData: data from storage are empty!");
		this.storedData.userData = userData;
	}
}
