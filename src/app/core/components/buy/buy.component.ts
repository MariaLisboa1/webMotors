import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import IVehicle from "src/app/interfaces/Vehicle";
import { UserService } from "src/app/services/user.service";
import IUser from "src/app/interfaces/User";
import { VehicleService } from "src/app/services/vehicle.service";
import { AuthTokenService } from "src/app/shared/services/auth-token.service";

@Component({
  selector: "app-buy",
  templateUrl: "./buy.component.html",
  styleUrls: ["./buy.component.scss"],
})
export class BuyComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private vehicleService: VehicleService,
    private authTokenService: AuthTokenService
  ) {}

  vehicle: IVehicle[];
  user: IUser;

  visibleErrorServer = false;
  visibleLoading = false;

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams: any) => {
      this.vehicle = JSON.parse(queryParams["vehicle"]);
    });

    this.getUser();
  }

  getUser() {
    const { id } = this.authTokenService.decodePayloadJWT();
    this.userService.getUserById(id).subscribe((user) => {
      this.user = user;
    });
  }

  deleteVehicle(vehicleId) {
    this.visibleLoading = true;
    this.vehicleService.deleteVehicle(vehicleId).subscribe(
      () => {
        this.visibleErrorServer = false;
        this.visibleLoading = false;

        this.router.navigate(["/home"]);
      },
      () => {
        this.visibleErrorServer = true;
        this.visibleLoading = false;
      }
    );
  }
}
