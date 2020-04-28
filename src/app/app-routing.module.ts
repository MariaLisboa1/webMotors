import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./core/components/home/home.component";
import { LoginComponent } from "./security/login/login.component";
import { RegisterComponent } from "./core/components/register/register.component";
import { Error404Component } from "./shared/components/error404/error404.component";
import { RegisterVehicleComponent } from "./core/components/register-vehicle/register-vehicle.component";
import { LoggedInGuard } from "./security/loggedin.guard";
import { BuyComponent } from "./core/components/buy/buy.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "home", component: HomeComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "buy", component: BuyComponent, canActivate: [LoggedInGuard] },
  {
    path: "register-vehicle",
    component: RegisterVehicleComponent,
    canActivate: [LoggedInGuard],
  },
  { path: "**", component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
