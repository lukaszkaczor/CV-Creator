import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { FormStatus } from 'src/app/Utilities/FormStatus';

@Component({
  selector: 'app-animated-button',
  templateUrl: './animated-button.component.html',
  styleUrls: ['./animated-button.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1,
      })),
      state('close', style({
        opacity: 0,
      })),
      transition('open => close', [
        animate('.3s')
      ]),
      transition('close => open', [
        animate('.3s')
      ]),
    ]),
  ]
})
export class AnimatedButtonComponent implements OnChanges {
  @Output() myClick = new EventEmitter();
  @Input() status = FormStatus.WaitingForAction;
  private timeout: number = 2000;

  ngOnChanges(changes: any) {
    const currentFormStatus = changes["status"].currentValue;

    if(currentFormStatus == FormStatus.PositiveResponse || currentFormStatus == FormStatus.NegativeResponse)
      setTimeout(() => this.setDefaultFormStatus(), this.timeout);
  }

  onClick(){
    this.myClick.emit();
  }

  private setDefaultFormStatus(){
    this.status = FormStatus.WaitingForAction;
  }
}
