import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	constructor() {}

	getUserDetails() {
		const userInfo = localStorage.getItem("userInfo") ?? "";
		return JSON.parse(userInfo);
	}

	setDataInLocalStorage(variableName: string, data: any) {
		localStorage.setItem(variableName, data);
	}

	getToken() {
		return localStorage.getItem("token");
	}

	clearStorage() {
		localStorage.clear();
	}
}
