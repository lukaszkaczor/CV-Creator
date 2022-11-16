import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { Template } from './template';

@Component({
  selector: 'app-cv-content',
  templateUrl: './cv-content.component.html',
  styleUrls: ['./cv-content.component.scss'],
})
export class CvContentComponent implements OnInit, AfterViewInit {
  tpl = '';
  @ViewChild('template') template2: ElementRef<HTMLElement>;

  constructor() {}

  ngOnInit(): void {
    this.tpl = Template.htmlPattern;
  }
  ngAfterViewInit(): void {
    // this.template2.nativeElement.innerHTML = Template.text;
  }
}
