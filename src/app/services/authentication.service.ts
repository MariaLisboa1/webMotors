import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import IAuthentication from "../interfaces/Authentication";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }

  login(user): Observable<IAuthentication> {
    return this.http.post<IAuthentication>(
      `${environment.herokuApi}/login`,
      user
    );
  }

  logout(): void {
    this.http.get(`${environment.herokuApi}/logout`).subscribe(() => {
      localStorage.clear();
      this.router.navigate(["/login"]);
    });
  }
}
