import { Router, CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    const getToken = localStorage.getItem("token");

    if (getToken != null && getToken != undefined) {
      return true;
    } else {
      this.router.navigate(["/login"]);
    }
  }
}
