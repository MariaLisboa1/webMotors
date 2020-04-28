import { Component, OnInit } from "@angular/core";
import { WebmotorsService } from "src/app/services/webmotors.service";
import { FormGroup, FormBuilder } from "@angular/forms";
import {
  IVehicle,
  IMake,
  IModel,
  IVersion,
  IUser,
} from "src/app/interfaces/interfaces";
import { VehicleService } from "src/app/services/vehicle.service";

import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";
import { AuthTokenService } from "src/app/shared/services/auth-token.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  MAKE_LOGOS = {
    Ford: "../../../../assets/images/ford-logo.jpg",
    Honda: "../../../../assets/images/honda-logo.jpg",
    Chevrolet: "../../../../assets/images/chevrolet-logo.jpg",
  };

  IMAGES_CATEGORY = [
    "../../../../assets/images/car-eletrico.jpg",
    "../../../../assets/images/car-frontier-2020.jpg",
    "../../../../assets/images/car-mitsubishi-l200.jpg",
    "../../../../assets/images/car-mitsubishi.jpeg",
  ];

  IMAGES_MOST_WANTED = [
    "../../../../assets/images/car-honda-civic.png",
    "../../../../assets/images/car-toyota.jpg",
    "../../../../assets/images/car-honda-fit.jpg",
    "../../../../assets/images/car-gol.jpg",
  ];

  BOX_TITLES = [
    "Financiamento",
    "Venda seu veículo",
    "Catálogo de 0KM",
    "Seguro",
    "Tabela Fipe",
  ];

  formSearch: FormGroup;

  activeCar = true;
  activeMoto = false;
  activeSell = false;
  activeFinance = false;
  activeStock = false;
  visibleLoading = true;
  visibleError = false;
  visibleErrorServer = false;
  visibleCard = true;

  filteredVehicles: IVehicle[];
  vehicles: IVehicle[] = [];
  foundVehicles: IVehicle[] = [];
  makes: IMake[];
  models: IModel[];
  versions: IVersion[];

  VehicleExternal: IVehicle[] = [];

  user: IUser;

  placeholder = "Digite a marca ou modelo do carro";

  dataBox = {
    width: "244px",
    height: "91px",
    borderRadius: "8px",
    background: "#f3123c",
    color: "white",
    marginBottom: "10px",
    marginLeft: "15px",
    marginTop: "40px",
  };

  constructor(
    private webmotorsService: WebmotorsService,
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private userService: UserService,
    private router: Router,
    private authTokenService: AuthTokenService
  ) {}

  ngOnInit() {
    this.formSearch = this.fb.group({
      search: this.fb.control(""),
    });
    this.inicializer();
  }

  inicializer(): void {
    this.getMake();
    this.getVehicle(1);
    this.getUser();
  }

  getVehicle(page: number): void {
    this.webmotorsService.getVehicles(page).subscribe((vehicle) => {
      if (vehicle.length === 0) return this.getVehicleExternalApi();

      this.vehicles = this.vehicles.concat(vehicle);
      this.getVehicle(page + 1);
    });
  }

  getMake(): void {
    this.webmotorsService.getMake().subscribe(
      (makes) => {
        this.visibleLoading = false;
        this.makes = makes;
      },
      () => this.showErrorServer()
    );
  }

  getModel(id: number): void {
    this.webmotorsService.getModel(id).subscribe(
      (models) => {
        this.models = models;
      },
      () => this.showErrorServer()
    );
  }

  getVersions(modelId: number): void {
    this.webmotorsService.getVersion(modelId).subscribe(
      (versions) => {
        this.versions = versions;
      },
      () => this.showErrorServer()
    );
  }

  getVehicleExternalApi() {
    this.vehicleService.getVehicle().subscribe((vehicle) => {
      this.VehicleExternal = this.VehicleExternal.concat(vehicle);
      this.vehicles = this.vehicles.concat(this.VehicleExternal);
    });
  }

  changeBuy(name: string): void {
    this.placeholder = `Digite a marca ou modelo do ${name}`;
    if (name === "moto") {
      this.activeCar = false;
      this.activeMoto = true;
    } else {
      this.activeCar = true;
      this.activeMoto = false;
    }
  }

  showOffers(): void {
    let searchQuery = this.formSearch.value.search
      .toLowerCase()
      .replace(/(?:^|\s)\S/g, function (a) {
        return a.toUpperCase();
      });

    this.visibleCard = false;
    this.filterVehicle(searchQuery);
  }

  filterVehicle(searchQuery: string): void {
    this.visibleLoading = true;
    this.activeStock = false;
    this.visibleError = false;

    this.filteredVehicles = this.vehicles.filter(
      ({ Make, Model }) => Make === searchQuery || Model === searchQuery
    );

    if (this.filteredVehicles.length !== 0) {
      this.activeStock = true;
      this.visibleLoading = false;
    } else {
      this.visibleLoading = false;
      this.visibleError = true;
    }

    this.getModelByMakeName(searchQuery);
    this.getMakeByModelName(searchQuery);
    this.getVersionsByModelName(searchQuery);
  }

  getModelByMakeName(makeName: string): void {
    const foundMake = this.makes.find(({ Name }) => Name === makeName);
    if (foundMake) this.getModel(foundMake.ID);
  }

  getByMakeName(name: string): void {
    this.versions = [];
    this.formSearch.value.search = name;
    this.showOffers();
  }

  getVersionsByModelName(modelName: string): void {
    if (this.models) {
      const foundModel = this.models.find(({ Name }) => Name === modelName);
      if (foundModel) this.getVersions(foundModel.ID);
    }
  }

  getMakeByModelName(modelName: string): void {
    const foundModel = this.vehicles.find(({ Model }) => Model === modelName);
    if (foundModel) this.getModelByMakeName(foundModel.Make);
  }

  filterVersionByModelName(modelName: string): void {
    this.filteredVehicles = this.vehicles.filter(
      ({ Version }) => Version === modelName
    );

    if (this.filteredVehicles.length !== 0) {
      this.activeStock = true;
      this.visibleError = false;
    } else {
      this.visibleError = true;
    }

    this.visibleLoading = false;
  }

  getUser(): void {
    if (this.authTokenService.decodePayloadJWT()) {
      const { id } = this.authTokenService.decodePayloadJWT();
      this.userService.getUserById(id).subscribe((user) => (this.user = user));
    }
  }

  buy(vehicle): void {
    vehicle = JSON.stringify(vehicle);
    this.router.navigate(["/buy"], { queryParams: { vehicle } });
  }

  showErrorServer(status = true): void {
    this.visibleErrorServer = status;
  }

  reset(): void {
    this.visibleCard = true;
    this.visibleError = false;
    this.showErrorServer(false);
    this.filteredVehicles = [];
    this.versions = [];
    this.models = [];
  }
}
