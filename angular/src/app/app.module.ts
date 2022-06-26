import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
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
import { HttpClientModule } from "@angular/common/http";

@NgModule({
	bootstrap: [AppComponent],
	imports: [
		AppRoutingModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpClientModule,
		MatButtonModule,
		MatInputModule,
	],
	declarations: [AppComponent, HomeComponent, LoginComponent, LoginFormComponent, SignupFormComponent],
	providers: [
		{ provide: ENDPOINT_URL, useValue: "./" },
		{ provide: MOCK_MODE, useValue: true },
	],
})
export class AppModule {}
