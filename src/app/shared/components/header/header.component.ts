import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @Output() clear = new EventEmitter();
  @Input() visibleMenu;

  constructor() {}

  ngOnInit() {}

  reset() {
    this.clear.emit();
  }
}
