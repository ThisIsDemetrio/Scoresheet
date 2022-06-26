import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { ENDPOINT_URL, MOCK_MODE } from "./providers/tokens";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	bootstrap: [AppComponent],
	imports: [AppRoutingModule, BrowserAnimationsModule],
	declarations: [AppComponent, HomeComponent],
	providers: [
		{ provide: ENDPOINT_URL, useValue: "./" },
		{ provide: MOCK_MODE, useValue: true },
	],
})
export class AppModule {}
