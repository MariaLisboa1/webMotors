import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-card-filter",
  templateUrl: "./card-filter.component.html",
  styleUrls: ["./card-filter.component.scss"],
})
export class CardFilterComponent implements OnInit {
  @Input() list;
  @Input() title;
  @Input() withSlice;
  @Input() img;
  @Output() loadData = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  load(event) {
    this.loadData.emit(event);
  }
}
