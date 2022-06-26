import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
	providedIn: "root",
})
export class InterceptorService implements HttpInterceptor {
	constructor(private router: Router, private _auth: AuthService) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (!request.headers.has("Content-Type")) {
			request = request.clone({ headers: request.headers.set("Content-Type", "application/json") });
		}
		request = request.clone({ headers: request.headers.set("Accept", "application/json") }).clone({
			setHeaders: {
				Authorization: `Bearer ${this._auth.accessToken}`,
			},
		});

		return next.handle(request);
	}
}