import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import {
  IMake,
  IModel,
  IVehicle,
  IVersion,
} from "src/app/interfaces/interfaces";

@Injectable({
  providedIn: "root",
})
export class WebmotorsService {
  constructor(private http: HttpClient) {}

  getMake(): Observable<IMake[]> {
    return this.http.get<IMake[]>(`${environment.url}/Make`);
  }

  getVehicles(page: number): Observable<IVehicle[]> {
    return this.http.get<IVehicle[]>(
      `${environment.url}/Vehicles?Page=${page}`
    );
  }

  getVersion(modelId: number): Observable<IVersion[]> {
    return this.http.get<IVersion[]>(
      `${environment.url}/Version?ModelID=${modelId}`
    );
  }

  getModel(makeId: number): Observable<IModel[]> {
    return this.http.get<IModel[]>(`${environment.url}/Model?MakeID=${makeId}`);
  }
}
