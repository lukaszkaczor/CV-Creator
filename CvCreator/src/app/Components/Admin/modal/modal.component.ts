import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() header: string;
  @Output() close = new EventEmitter();

  
  constructor() { }
  ngOnInit(): void {
  }

  hide(data:any){
    this.close.emit(false);
  }
}
