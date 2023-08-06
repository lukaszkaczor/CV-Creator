import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-toast-box',
  templateUrl: './toast-box.component.html',
  styleUrls: ['./toast-box.component.scss']
})
export class ToastBoxComponent implements OnInit {
  @Input() message: string;

  @ViewChild("toastBox", {read: ViewContainerRef}) toastBox: ViewContainerRef;
  constructor() { }

  ngOnInit(): void {
  }

  createComponent(text: string){
    this.toastBox.clear();
    this.toastBox.createComponent(ToastComponent).instance.message = text;
  }

}
