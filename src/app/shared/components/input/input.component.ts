import {
  Component,
  OnInit,
  ContentChild,
  Input,
  AfterContentInit,
} from "@angular/core";
import { FormControlName } from "@angular/forms";

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.scss"],
})
export class InputComponent implements OnInit, AfterContentInit {
  @Input() errorMessage: string;

  input: any;
  @ContentChild(FormControlName) control: FormControlName;

  constructor() {}

  ngOnInit() {}

  ngAfterContentInit() {
    this.input = this.control;
    if (this.input === undefined) {
      throw new Error(
        "Esse componente precisa ser usado com uma diretiva ngModel ou formControlName"
      );
    }
  }

  hasSuccess(): boolean {
    const input = this.input;
    return input.valid && (input.dirty || input.touched);
  }

  hasError(): boolean {
    const input = this.input;
    return input.invalid && (input.dirty || input.touched);
  }
}
