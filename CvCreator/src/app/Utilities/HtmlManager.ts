import { ElementRef } from '@angular/core';
export class HtmlManager {
  elements: [];
  getHtmlTree(node: ElementRef<HTMLElement>) {
    // node.nativeElement.
    let children = this.getChildren(node);
    console.log(children);
    while (true) {
      //   children = this.getChildren(children);
      // for(let i = 0; i< children.length; i++)
      // {

      // }
      //   let child = this.getChildren(node);
      //   console.log(child);

      // if(child.length == 0)
      break;
    }
    // console.log(this.getChildren(node));
  }

  allDescendants(node: any) {
    for (var i = 0; i < node.childNodes.length; i++) {
      var child = node.childNodes[i];
      console.log(child);

      this.allDescendants(child);
      //   doSomethingToNode(child);
    }
  }

  getChildren(node: ElementRef<HTMLElement>) {
    return node.nativeElement.children;
  }

  hasChildren(node: ElementRef<HTMLElement>) {
    return node.nativeElement.children.length > 0;
  }
}
