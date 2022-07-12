import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { ENDPOINT_URL, MOCK_MODE } from "./providers/tokens";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginComponent } from "./components/auth/login/login.component";
import { LoginFormComponent } from "./components/auth/login-form/login-form.component";
import { SignupFormComponent } from "./components/auth/signup-form/signup-form.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { InterceptorService } from "./providers/interceptor.service";
import { environment } from "src/environments/environment";
import { MatSnackBarModule } from "@angular/material/snack-bar";

@NgModule({
	bootstrap: [AppComponent],
	imports: [
		AppRoutingModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpClientModule,
		MatButtonModule,
		MatIconModule,
		MatInputModule,
		MatSnackBarModule,
	],
	declarations: [AppComponent, HomeComponent, LoginComponent, LoginFormComponent, SignupFormComponent],
	providers: [
		// TODO: This value must be moved to environment.prod.ts and applied only while deploying
		{ provide: ENDPOINT_URL, useValue: environment.endpoint },
		{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
		{ provide: MOCK_MODE, useValue: false },
	],
})
export class AppModule {}
