import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { ButtonComponent } from "./components/button/button.component";
import { UserDetailComponent } from "./components/header/user-detail/user-detail.component";
import { InputComponent } from "./components/input/input.component";
import { AppRoutingModule } from "../app-routing.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AlertComponent } from "./components/alert/alert.component";
import { CardComponent } from "./components/card/card.component";
import { CardFilterComponent } from "./components/card-filter/card-filter.component";
import { Error404Component } from "./components/error404/error404.component";
import { AuthTokenService } from "./services/auth-token.service";

@NgModule({
  imports: [CommonModule, AppRoutingModule],
  declarations: [
    FooterComponent,
    HeaderComponent,
    ButtonComponent,
    UserDetailComponent,
    InputComponent,
    AlertComponent,
    CardComponent,
    CardFilterComponent,
    Error404Component,
  ],
  exports: [
    AppRoutingModule,
    FooterComponent,
    HeaderComponent,
    ButtonComponent,
    UserDetailComponent,
    InputComponent,
    AlertComponent,
    CardComponent,
    CardFilterComponent,
    Error404Component,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthTokenService],
})
export class SharedModule {}
