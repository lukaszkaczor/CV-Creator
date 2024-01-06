import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
        animate('1s')
      ]),
      transition('close => open', [
        animate('.3s')
      ]),
    ]),
  ]
})
export class AnimatedButtonComponent implements OnInit {
  @Output() myClick = new EventEmitter();
  queue: number[] = [];
  status = FormStatus.WaitingForAction;

  constructor() { }

  statusQueue(){
  
  }

  private delay(ms: number = 2000) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  // statusQueue(){
  //   // this.queueIsEmpty() ? this.setDefaultStatus() : this.setFirstItemInQueueAsStatus();
    
  //   // !this.queueIsEmpty() ? this.setFirstItemInQueueAsStatus() : ; 
  //   if(!this.queueIsEmpty()) this.setFirstItemInQueueAsStatus();

  //   const timeout = setTimeout(()=>{
  //     console.log("Queue:" + this.queue)

  //     if(this.queueIsEmpty())
  //     {
  //       console.log("clear timeout")
  //       clearTimeout(timeout);
  //       this.setDefaultStatus();
  //       return;
  //     }

  //     this.queue.shift();
  //     this.statusQueue();

  //   }, 2000)
  // }

  ngOnInit(): void {
  }

  onClick(){
    this.myClick.emit();
    this.statusQueue();
  }

  pushDataToQueue(status:number)
  {
    this.queue.push(status);
  }

  private queueIsEmpty(){
    return this.queue.length <= 0;
  }

  private setFirstItemInQueueAsStatus(){
    this.status = this.queue[0];
  }

  private setDefaultStatus(){
    this.status = FormStatus.WaitingForAction;
  }
}
