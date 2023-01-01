import { CvBuilder } from '../../Utilities/CvCreator/CvBuilder';
import { Sample } from './../../Utilities/Sample';
import { AfterViewInit, Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements AfterViewInit {
  // @ViewChild('c1') c1: ElementRef<HTMLElement>;
  // @ViewChild('content') content: ElementRef<HTMLElement>;
  // @ViewChild('c2') c2: ElementRef<HTMLElement>;
  @ViewChild('template') template: ElementRef<HTMLElement>;
  @ViewChild('cv') cv: ElementRef<HTMLElement>;
  @ViewChild('temp') temp: ElementRef<HTMLElement>;
  cutWords: string[] = [];

  ngAfterViewInit(): void {
    // const builder = new CvBuilder(
    //   this.template.nativeElement,
    //   this.cv.nativeElement,
    //   this.temp.nativeElement
    // );
    // builder.build();
  }

  // WWWWWW

  // var trigger = Template.text;
  // // regexp = new RegExp(`<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>`),
  // // let regexp = new RegExp(`<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>`, 'gm'),
  // let regexp = new RegExp(`<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>`, 'gm'),
  //   test = regexp.test(trigger);
  // // console.log(regexp.exec(trigger));

  // // console.log(test + ''); // will display true

  // console.log(trigger.match(regexp));
  // let de = trigger.match(regexp);

  // WWWWW
  // ngAfterViewInit(): void {
  //   let c1Height = this.c1.nativeElement.clientHeight;
  //   var elementList = this.c1.nativeElement.getElementsByTagName('*');
  //   const contentHeight = this.content.nativeElement.clientHeight;
  //   console.log(elementList);
  //   let lastElement = this.getLastElementOfTheList(Array.from(elementList));
  //   console.log(lastElement);

  //   var first = document.getElementById('first');
  //   var second = document.getElementById('second');
  //   var third = document.getElementById('third');

  //   // var ss = this.c1.nativeElement;
  //   // console.log(first?.htm);

  //   let elements = [first, second, third];
  //   let texts = [Sample.text1, Sample.text2, Sample.text3];
  //   console.log(c1Height, contentHeight);

  //   for (let k = 0; k < elements.length; k++) {
  //     elements[k]!.textContent = texts[k];

  //     if (this.c1.nativeElement.clientHeight > contentHeight) {
  //       while (this.c1.nativeElement.clientHeight > contentHeight) {
  //         elements[k]!.textContent = this.cutLastWord(elements[k]!.textContent);
  //       }

  //       console.log(this.c1.nativeElement.clientHeight);
  //       break;
  //     }
  //   }
  //   // elements.forEach((element) => {
  //   //   element?.textContent =
  //   // });

  //   let i = 0;

  //   let nextPageElements = [];

  //   let lastTemp = lastElement;
  //   // console.log(lastTempp);

  //   // let lastTemp = JSON.parse(lastTempp);
  //   console.log(lastElement);
  //   // let p = document.createElement('<h1>bebe</h1>');
  //   let d = document.createElement('h1');
  //   this.c1.nativeElement.append(d);

  //   // let cutWords = [];

  //   while (this.c1.nativeElement.clientHeight > contentHeight) {
  //     // break;
  //     // console.log(lastELement.textContent);
  //     // console.log(lastTemp.textContent);

  //     lastElement.textContent = this.cutLastWord(lastElement.textContent);
  //     i++;

  //     if (lastElement.textContent == '') {
  //       nextPageElements.push(lastTemp);
  //       // console.log(lastTemp.textContent);

  //       // console.log(nextPageElements);

  //       lastElement = elementList[elementList.length - 2];
  //     }

  //     if (i == 1000) break;
  //   }
  //   console.log(this.cutWords.reverse().join(''));
  //   this.c2.nativeElement.textContent = this.cutWords.join('');
  // }

  getLastElementOfTheList(list: any): Element {
    return list[list.length - 1];
  }

  click() {
    // const builder = new CvBuilder(this.cv.nativeElement);
    // builder.build();
    // var ss = Array.from(this.c1.nativeElement.children);
    // console.log(ss);
    // const elHeight = 476;
    // while
    // while (this.c1.nativeElement.clientHeight > elHeight) {
    //   this.cutLastWord();
    // }
    // const manager = new HtmlManager();
    // manager.getHtmlTree(this.c1);
  }

  cutLastWord(text: string | null): string {
    if (text == null) return '';

    var str = text;
    var lastIndex = str.lastIndexOf(' ');
    this.cutWords.push(str.substring(lastIndex));

    return str.substring(0, lastIndex);
    // this.c1.nativeElement.innerText
  }
}
