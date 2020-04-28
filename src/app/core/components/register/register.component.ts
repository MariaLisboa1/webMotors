import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  personSrc = "../../../../assets/images/person.png";
  imageSrc;
  selectFile: File = null;
  registerForm: FormGroup;

  visibleLoading = false;
  visibleError = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: this.fb.control("", [Validators.required]),
      email: this.fb.control("", [Validators.required]),
      password: this.fb.control("", [
        Validators.required,
        Validators.minLength(5),
      ]),
      photo: this.fb.control(""),
    });
  }

  createUser(): void {
    this.visibleLoading = true;
    const form = this.registerForm.value;

    const user = {
      name: form.name,
      email: form.email,
      password: form.password,
    };

    this.userService.createUser(user).subscribe(
      (user) => this.sendPhoto(user),
      () => (this.visibleError = true)
    );
  }

  readURL(event): void {
    this.selectFile = <File>event.target.files[0];

    if (<File>event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();

      reader.onload = (e) => (this.imageSrc = reader.result);

      reader.readAsDataURL(file);
    }
  }

  sendPhoto(user): void {
    const photo = new FormData();
    const { _id } = user;

    if (this.selectFile) {
      Object.defineProperty(this.selectFile, "avatar", {
        writable: true,
        value: _id + ".png",
      });

      photo.append("avatar", this.selectFile, this.selectFile.name);

      this.userService.sendImage(photo, _id).subscribe(
        () => {
          this.visibleError = false;
          this.visibleLoading = false;
          this.goLogin();
        },
        () => {
          this.visibleError = true;
          this.visibleLoading = false;
        }
      );
    } else {
      this.visibleLoading = false;
      this.goLogin();
    }
  }

  goLogin(): void {
    this.route.navigate(["/login"]);
  }
}
