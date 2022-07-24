import { NgModule } from "@angular/core";
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
import { UserOptionsComponent } from "./components/user/user-options/user-options.component";
import { ANGULAR_MATERIAL_IMPORTS } from "./imports";
import { AvatarComponent } from "./components/shared/avatar/avatar.component";
import { FromAssetsPipe } from "./components/pipes/from-assets.pipe";
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from "@angular/material/snack-bar";
import { SideDrawerComponent } from "./components/shared/sidedrawer/sidedrawer.component";
import { MatDialogRef } from "@angular/material/dialog";
import { GroupListComponent } from "./components/groups/group-list.component";
import { JoinGroupComponent } from "./components/groups/join-group/join-group.component";
import { GroupInfoComponent } from "./components/groups/group-info/group-info.component";
import { CreateGroupComponent } from "./components/groups/create-group/create-group.component";
import { HeaderComponent } from "./components/shared/header/header.component";

@NgModule({
	bootstrap: [AppComponent],
	imports: [AppRoutingModule, BrowserAnimationsModule, FormsModule, HttpClientModule, ...ANGULAR_MATERIAL_IMPORTS],
	declarations: [
		AppComponent,
		HomeComponent,
		// Group section
		GroupListComponent,
		JoinGroupComponent,
		GroupInfoComponent,
		CreateGroupComponent,
		// Login section
		LoginComponent,
		LoginFormComponent,
		SignupFormComponent,
		// Options section
		UserOptionsComponent,
		// Shared
		AvatarComponent,
		HeaderComponent,
		SideDrawerComponent,
		// Pipes
		FromAssetsPipe,
	],
	providers: [
		// TODO: This value must be moved to environment.prod.ts and applied only while deploying
		{ provide: ENDPOINT_URL, useValue: environment.endpoint },
		{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
		{ provide: MOCK_MODE, useValue: false },
		{ provide: MatDialogRef, useValue: {} },
		{ provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
	],
})
export class AppModule {}
