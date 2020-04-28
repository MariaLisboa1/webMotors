import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
})
export class ButtonComponent implements OnInit {
  @Input() title;
  @Input() disabled;
  @Input() width;
  @Input() height;
  @Input() fontSize;
  @Input() margin;
  @Output() button = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  getClick() {
    this.button.emit();
  }
}
