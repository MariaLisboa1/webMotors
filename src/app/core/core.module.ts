import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "../app-routing.module";
import { HomeComponent } from "./components/home/home.component";
import { RegisterComponent } from "./components/register/register.component";
import { RegisterVehicleComponent } from "./components/register-vehicle/register-vehicle.component";
import { StockComponent } from "./components/stock/stock.component";
import { WebmotorsService } from "../services/webmotors.service";
import { LoginComponent } from "../security/login/login.component";
import { SharedModule } from "../shared/shared.module";
import { VehicleService } from "../services/vehicle.service";
import { UserService } from "../services/user.service";
import { AuthenticationService } from "../services/authentication.service";
import { BuyComponent } from "./components/buy/buy.component";

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    HomeComponent,
    RegisterComponent,
    RegisterVehicleComponent,
    StockComponent,
    LoginComponent,
    BuyComponent,
  ],
  exports: [
    HomeComponent,
    RegisterComponent,
    RegisterVehicleComponent,
    LoginComponent,
    StockComponent,
    BuyComponent,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    WebmotorsService,
    VehicleService,
    UserService,
    AuthenticationService,
  ],
})
export class CoreModule {}
