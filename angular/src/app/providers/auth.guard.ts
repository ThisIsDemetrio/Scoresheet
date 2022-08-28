import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
	providedIn: "root",
})
export class AuthGuard implements CanActivate {
	constructor(private _authService: AuthService, private _router: Router) {}
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		if (this._authService.accessToken) {
			return true;
		}
		// navigate to login page
		this._router.navigate(["/login"]);
		// you can save redirect url so after authing we can move them back to the page they requested
		return false;
	}
}
