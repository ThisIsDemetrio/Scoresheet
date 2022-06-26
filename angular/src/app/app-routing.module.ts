import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/auth/login/login.component";

import { HomeComponent } from "./components/home/home.component";
import { AuthGuardService } from "./providers/auth-guard.service";

const routes: Routes = [
	{ path: "", redirectTo: "/home", pathMatch: "full" },
	{ path: "login", component: LoginComponent },
	{ path: "home", component: HomeComponent, canActivate: [AuthGuardService] },
	// TODO: The following :D
	{ path: "game", component: HomeComponent },
	{ path: "history", component: HomeComponent },
	{ path: "groups", component: HomeComponent },
	{ path: "options", component: HomeComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
