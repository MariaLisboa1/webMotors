import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { WebmotorsService } from "src/app/services/webmotors.service";
import IMake from "src/app/interfaces/Make";
import IVersion from "src/app/interfaces/Version";
import IModel from "src/app/interfaces/Model";
import { VehicleService } from "src/app/services/vehicle.service";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { AuthTokenService } from "src/app/shared/services/auth-token.service";

@Component({
  selector: "app-register-vehicle",
  templateUrl: "./register-vehicle.component.html",
  styleUrls: ["./register-vehicle.component.scss"],
})
export class RegisterVehicleComponent implements OnInit {
  registerVehicleForm: FormGroup;

  makes: IMake[];
  models: IModel[];
  versions: IVersion[];

  personSrc = "../../../../assets/images/vehicle.png";
  imageSrc;
  selectFile: File = null;

  visibleError = false;
  visibleLoading = false;
  userId: string;

  constructor(
    private fb: FormBuilder,
    private webMotorsService: WebmotorsService,
    private vehicleService: VehicleService,
    private userService: UserService,
    private router: Router,
    private authTokenService: AuthTokenService
  ) {}

  ngOnInit() {
    this.registerVehicleForm = this.fb.group({
      Make: this.fb.control("Ford", [Validators.required]),
      Model: this.fb.control("Onix", [Validators.required]),
      Version: this.fb.control("1.0 MPI EL 8V FLEX 4P MANUAL", [
        Validators.required,
      ]),
      Image: this.fb.control(""),
      KM: this.fb.control("", [Validators.required]),
      Price: this.fb.control("", [Validators.required]),
      YearModel: this.fb.control("", [Validators.required]),
      YearFab: this.fb.control("", [Validators.required]),
      Color: this.fb.control("", [Validators.required]),
    });

    this.getMake();
    this.getModel(1);
    this.getVersions(1);

    this.getUserId();
  }

  getMake(): void {
    this.webMotorsService.getMake().subscribe((makes) => {
      this.makes = makes;
    });
  }

  getModel(id: number): void {
    this.webMotorsService.getModel(id).subscribe((models) => {
      this.models = models;
    });
  }

  getVersions(modelId: number): void {
    this.webMotorsService.getVersion(modelId).subscribe((versions) => {
      this.versions = versions;
    });
  }

  selectMake() {
    const select = document.getElementById("make") as HTMLSelectElement;
    const makeId = select.options[select.selectedIndex].value;

    this.getModel(parseFloat(makeId));
  }

  selectModel() {
    const select = document.getElementById("model") as HTMLSelectElement;
    const modelId = select.options[select.selectedIndex].value;

    this.getVersions(parseFloat(modelId));
  }

  readURL(event) {
    this.selectFile = <File>event.target.files[0];

    if (<File>event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();

      reader.onload = (e) => (this.imageSrc = reader.result);

      reader.readAsDataURL(file);
    }
  }

  createVehicle(formValue) {
    this.visibleLoading = true;

    const vehicle = {
      Make: formValue.Make,
      Model: formValue.Model,
      Version: formValue.Version,
      KM: formValue.KM,
      Price: formValue.Price,
      YearModel: formValue.YearModel,
      YearFab: formValue.YearFab,
      Color: formValue.Color,
      UserId: this.userId,
    };

    this.vehicleService.createVehicle(vehicle).subscribe(
      (vehicle) => this.sendPhoto(vehicle),
      () => {
        this.visibleError = true;
        this.visibleLoading = false;
      }
    );
  }

  getUserId() {
    const { id } = this.authTokenService.decodePayloadJWT();
    this.userService.getUserById(id).subscribe((user) => {
      this.userId = user._id;
    });
  }

  sendPhoto(vehicle): void {
    const photo = new FormData();
    const { _id } = vehicle;

    if (this.selectFile) {
      Object.defineProperty(this.selectFile, "image", {
        writable: true,
        value: _id + ".png",
      });

      photo.append("image", this.selectFile, this.selectFile.name);

      this.vehicleService.sendImage(photo, _id).subscribe(
        () => {
          this.visibleError = false;
          this.visibleLoading = false;
          this.goHome();
        },
        () => {
          this.visibleError = true;
          this.visibleLoading = false;
        }
      );
    } else {
      this.visibleLoading = false;
      this.goHome();
    }
  }

  goHome(): void {
    this.router.navigate(["/home"]);
  }
}
