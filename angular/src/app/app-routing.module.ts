import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/auth/login/login.component";
import { GroupListComponent } from "./components/groups/group-list.component";

import { HomeComponent } from "./components/home/home.component";
import { UserOptionsComponent } from "./components/user/user-options/user-options.component";
import { AuthGuard } from "./providers/auth.guard";

const routes: Routes = [
	{ path: "", redirectTo: "/home", pathMatch: "full" },
	{ path: "login", component: LoginComponent },
	{ path: "home", component: HomeComponent, canActivate: [AuthGuard] },
	{ path: "options", component: UserOptionsComponent, canActivate: [AuthGuard] },
	{ path: "groups", component: GroupListComponent, canActivate: [AuthGuard] },
	{ path: "game", component: HomeComponent, canActivate: [AuthGuard] },
	{ path: "history", component: HomeComponent, canActivate: [AuthGuard] },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
