import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewChildren } from "@angular/core";
import { TimeInterval } from "rxjs";

@Component({
  selector: "app-toast",
  templateUrl: "./toast.component.html",
  styleUrls: ["./toast.component.scss"],
})
export class ToastComponent implements AfterViewInit {
  @ViewChild("btn") button: ElementRef;
  @Input() message: string;
  interval: any;
  visible = true;

  // text = `conic-gradient(rgb(106, 106, 235) {{value}}%, whitesmoke 0 100%)`;
  value = 100;

  constructor() {}
  ngAfterViewInit(): void {
    // const value = getComputedStyle(this.button.nativeElement);
    // console.log(value.backgroundImage);
    this.countdown();
  }

  close() {
    clearInterval(this.interval);
    this.visible = false;
  }

  countdown() {
    this.interval = setInterval(() => {
      this.value -= 0.1;
      const value = getComputedStyle(this.button.nativeElement);

      // console.log(value.backgroundImage);

      if (this.value <= 0) {
        this.close();
      }
    }, 10);
  }

  getVal() {
    return `conic-gradient(rgb(106, 106, 235) ${this.value}%, whitesmoke 0 100%)`;
  }
}
