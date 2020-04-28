import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { VehicleService } from "src/app/services/vehicle.service";

@Component({
  selector: "app-stock",
  templateUrl: "./stock.component.html",
  styleUrls: ["./stock.component.scss"],
})
export class StockComponent implements OnInit {
  @Input() vehicles;
  @Input() user;
  @Output() buy = new EventEmitter();
  visibleErrorServer = false;

  constructor(private vehicleService: VehicleService) {}

  ngOnInit() {}

  buyVehicle(vehicle) {
    this.buy.emit(vehicle);
  }

  deleteVehicle(vehicleId) {
    this.vehicles = this.vehicles.filter(
      (vehicle) => vehicleId !== vehicle._id
    );

    this.vehicleService.deleteVehicle(vehicleId).subscribe(
      () => (this.visibleErrorServer = false),
      () => (this.visibleErrorServer = true)
    );
  }
}
