import { Template } from './template';
import { Directive, ElementRef, Renderer2, OnInit, Input, Injectable } from '@angular/core';
import { TemplateService } from 'src/app/Utilities/CvCreator/TemplateService';
import { TemplateEditor } from 'src/app/Utilities/CvCreator/TemplateEditor';
import { CvBuilder } from 'src/app/Utilities/CvCreator/CvBuilder';
import { HtmlElementMerger } from 'src/app/Utilities/CvCreator/HtmlElementMerger';
import { ElementService } from 'src/app/Utilities/CvCreator/ElementService';
import { SingleElementDataManager } from 'src/app/Utilities/CvCreator/SingleElementDataManager';
import { ListDataManager } from 'src/app/Utilities/CvCreator/ListDataManager';

@Directive({
  selector: '[appContent]',
})
export class ContentDirective implements OnInit {
  @Input() template: string;
  cvElement: HTMLElement;
  cvTemplate: HTMLElement;
  pages: HTMLElement[] = [];

  private builder: CvBuilder;

  dataToInsert = [
    { marker: '@firstName', data: Template.data.firstName },
    { marker: '@lastName', data: Template.data.lastName },
    { marker: '@description', data: Template.data.description },
    {
      marker: '@list',
      data: [
        { '@first': 'first1', '@second': 'second1', '@third': 'thirdOptionalFirst' },
        { '@first': 'first2', '@second': 'second2', '@third': 'third2' },
        { '@first': 'first3', '@second': 'second3', '@third': 'thirdOptionalMiddle' },
        { '@first': 'first4', '@second': 'second4' },
        { '@first': 'first5', '@second': 'second5', '@third': 'thirdOptionalLast' },
      ],
    },
  ];

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    templateService: TemplateService,
    templateEditor: TemplateEditor,
    dataMerger: HtmlElementMerger,
    elementService: ElementService
  ) {
    this.builder = new CvBuilder(templateService, templateEditor, dataMerger, elementService, [
      new SingleElementDataManager(),
      new ListDataManager(templateService),
    ]);
  }

  ngOnInit(): void {
    const cvTemplateBackup = this.initializeTemplateBox();

    this.builder
      .setTemplate(this.cvTemplate)
      .setTemplateBackup(cvTemplateBackup)
      .setCvElement(this.cvElement)
      .setDataToInsert(this.dataToInsert)
      .build();
  }

  initializeTemplateBox() {
    this.cvElement = this.createNewElement('div', '');
    this.cvTemplate = this.createNewElement('div', '');
    // el == template
    this.renderer.setStyle(this.el.nativeElement, 'border', '1px solid red');
    this.renderer.setStyle(this.el.nativeElement, 'width', '350px');
    this.renderer.setStyle(this.el.nativeElement, 'min-height', '500px');
    this.renderer.setStyle(this.el.nativeElement, 'height', 'auto');
    this.renderer.setStyle(this.el.nativeElement, 'margin-left', '400px');
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');

    this.renderer.setStyle(this.cvElement, 'border', '1px solid blue');
    this.renderer.setStyle(this.cvElement, 'width', '350px');
    // this.renderer.setStyle(this.cvElement, 'min-height', '500px');
    // this.renderer.setStyle(this.cvElement, 'height', 'auto');
    this.renderer.setStyle(this.cvElement, 'margin-left', '-370px');
    this.renderer.setStyle(this.cvElement, 'position', 'absolute');

    this.cvTemplate.innerHTML = this.template;
    // this.cvTemplate.classList.add('container');
    // this.cvElement.classList.add('container');
    let cvTemplateBackup = this.createNewElement('div', '');
    cvTemplateBackup.innerHTML = `<div @firstPage class="page" >
                                  <div @pageContent class="page-content"></div>
                                </div>
                                
                                <div @secondPage class="page" style="margin: 20px 0">
                                  <div @pageContent class="page-content"></div>
                                </div>

                                <div @lastPage class="page" style="position: absolute; top: 1040px">
                                  <div @pageContent class="page-content"></div>
                                </div>
                                
                                `;

    return cvTemplateBackup;
  }

  createNewElement(element: string, content: string) {
    const pNode = this.renderer.createElement(element);
    const txtNode = this.renderer.createText(content);
    this.renderer.appendChild(pNode, txtNode);
    this.renderer.appendChild(this.el.nativeElement, pNode);
    return pNode;
  }
}
