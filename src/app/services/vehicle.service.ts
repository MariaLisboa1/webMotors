import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import IVehicle from "../interfaces/Vehicle";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class VehicleService {
  constructor(private http: HttpClient) {}

  get AuthToken() {
    const token = localStorage.getItem("token");
    return new HttpHeaders().set("Authorization", "Bearer " + token);
  }

  getVehicle(): Observable<IVehicle> {
    return this.http.get<IVehicle>(`${environment.herokuApi}/vehicles`);
  }

  getVehicleById(id: number): Observable<IVehicle> {
    return this.http.get<IVehicle>(`${environment.herokuApi}/vehicles/${id}`);
  }

  createVehicle(vehicle: IVehicle) {
    return this.http.post(`${environment.herokuApi}/vehicles/`, vehicle, {
      headers: this.AuthToken,
    });
  }

  deleteVehicle(id: number) {
    return this.http.delete(`${environment.herokuApi}/vehicles/${id}`, {
      headers: this.AuthToken,
    });
  }

  sendImage(image, id: number) {
    return this.http.put(
      `${environment.herokuApi}/vehicles/image/${id}`,
      image,
      {
        headers: this.AuthToken,
      }
    );
  }
}
