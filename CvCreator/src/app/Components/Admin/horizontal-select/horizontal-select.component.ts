import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-horizontal-select",
  templateUrl: "./horizontal-select.component.html",
  styleUrls: ["./horizontal-select.component.scss"],
})
export class HorizontalSelectComponent implements OnInit {
  HorizontalSelectStatus = HorizontalSelectStatus;
  transform = "translateX(0)";

  @Output() onAll = new EventEmitter();
  @Output() onActive = new EventEmitter();
  @Output() onInactive = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  setStatus(status: HorizontalSelectStatus) {
    switch (status) {
      case HorizontalSelectStatus.All:
        this.transform = "translateX(0)";
        this.onAll.emit(HorizontalSelectStatus.All);
        break;

      case HorizontalSelectStatus.Active:
        this.transform = "translateX(101%)";
        this.onActive.emit(HorizontalSelectStatus.Active);
        break;

      case HorizontalSelectStatus.Inactive:
        this.transform = "translateX(203%)";
        this.onInactive.emit(HorizontalSelectStatus.Inactive);
        break;
    }
  }
}

export enum HorizontalSelectStatus {
  All = 0,
  Active = 1,
  Inactive = 2,
}
