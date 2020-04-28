import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { IUser } from "../interfaces/interfaces";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  get AuthToken() {
    const token = localStorage.getItem("token");
    return new HttpHeaders().set("Authorization", "Bearer " + token);
  }

  getUserById(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${environment.herokuApi}/users/${id}`, {
      headers: this.AuthToken,
    });
  }

  createUser(user): Observable<IUser> {
    return this.http.post<IUser>(`${environment.herokuApi}/users/`, user);
  }

  sendImage(avatar, id: string) {
    return this.http.put(`${environment.herokuApi}/users/avatar/${id}`, avatar);
  }
}
