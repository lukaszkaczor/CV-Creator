import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent{
  @Input() header: string;
  @Output() onSave = new EventEmitter();
  @Output() onShow = new EventEmitter();
  @Output() onHide = new EventEmitter();
  @Output() onToggle = new EventEmitter();
  visible = false;


  save(){
    this.onSave.emit();
  }

  show(){
    this.visible = true;
    this.onShow.emit(this.visible);
    document.body.style.overflow = "hidden"
  }

  hide(){
    this.visible = false;
    this.onHide.emit(this.visible);
    document.body.style.overflow = "auto"
  }

  toggle(){
    this.visible = !this.visible;
    this.onToggle.emit(this.visible);
    this.visible ?  document.body.style.overflow = "hidden" :  document.body.style.overflow = "auto"
  }
}
