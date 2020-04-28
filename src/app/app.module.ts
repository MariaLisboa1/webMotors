import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { LOCALE_ID } from "@angular/core";
import { AppComponent } from "./app.component";
import { WebmotorsService } from "./services/webmotors.service";

import { CoreModule } from "./core/core.module";
import { registerLocaleData } from "@angular/common";
import ptBr from "@angular/common/locales/pt";
import { LoggedInGuard } from "./security/loggedin.guard";
registerLocaleData(ptBr);

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CoreModule],
  providers: [
    WebmotorsService,
    { provide: LOCALE_ID, useValue: "pt-PT" },
    LoggedInGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
