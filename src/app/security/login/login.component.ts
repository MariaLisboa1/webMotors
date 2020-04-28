import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from "src/app/services/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  visibleError = false;
  visibleLoading = false;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control("", [Validators.required, Validators.email]),
      password: this.fb.control("", [Validators.required]),
    });
  }

  login() {
    this.visibleLoading = true;

    const user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.authenticationService.login(user).subscribe(
      (user) => {
        this.visibleError = false;
        this.visibleLoading = false;
        localStorage.setItem("token", user.token);
        this.router.navigate(["/home"]);
      },
      () => {
        this.visibleError = true;
        this.visibleLoading = false;
      }
    );
  }
}
