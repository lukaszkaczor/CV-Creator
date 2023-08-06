import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastBoxComponent } from '../toast-box/toast-box.component';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  @ViewChild(ToastBoxComponent) toastBox:ToastBoxComponent;
  constructor() { }

  ngOnInit(): void {
  }

  showToastMessage(message: string){
    this.toastBox.createComponent(message)
  }
}
