import { ILogger } from '../ILogger';
import { CvMarkers } from './CvMarkers';
import { CvOutputElementType } from './CvOutputElementType';
import { ICvDataManager } from './Interfaces/ICvDataService';
import { IDataMerger } from './Interfaces/IDataMerger';
import { IElementDataManager } from './Interfaces/IElementDataManager';
import { IElementService } from './Interfaces/IElementService';
import { ITemplateEditor } from './Interfaces/ITemplateEditor';
import { ITemplateService } from './Interfaces/ITemplateService';
import { ListDataManager } from './ListDataManager';
import { SingleElementDataManager } from './SingleElementDataManager';

export class CvBuilder {
  private template: HTMLElement;
  private templateBackup: HTMLElement;
  private cvElement: HTMLElement;
  private pages: HTMLElement[] = [];
  private dataToInsert = [];

  constructor(
    private templateService: ITemplateService,
    private templateEditor: ITemplateEditor,
    private dataMerger: IDataMerger,
    private elementService: IElementService,
    private logger: ILogger,
    private dataServices: IElementDataManager[]
  ) {}

  setTemplate(template: HTMLElement) {
    this.template = template;
    return this;
  }

  setTemplateBackup(templateBackup: HTMLElement) {
    this.templateBackup = templateBackup;
    return this;
  }

  setCvElement(cvElement: HTMLElement) {
    this.cvElement = cvElement;
    return this;
  }

  setDataToInsert(data: any) {
    this.dataToInsert = data;
    return this;
  }

  build() {
    const firstPageTemplate = this.templateService.getFirstPage(this.templateBackup);
    const secondPageTemplate = this.templateService.getSecondPage(this.templateBackup);

    const allElements = this.templateService.getAllElements(this.template);
    const elementsWithData = this.prepareData(allElements, this.dataToInsert);

    let { page, pageContent } = this.getPageAndPageContent(firstPageTemplate);

    this.addPageToCV(page);

    elementsWithData.forEach((element) => {
      const elementClone = this.templateService.createClone(element);
      pageContent.appendChild(elementClone);

      if (this.templateService.contentHeightLowerThanPageHeight(page)) return;

      const itemForNextPage = this.templateEditor.deleteReduntantDataFromPage(page, elementClone);
      const pageWithContent = this.getPageAndPageContent(secondPageTemplate);
      page = pageWithContent.page;
      pageContent = pageWithContent.pageContent;

      this.addPageToCV(page);
      pageContent.appendChild(itemForNextPage);
    });
  }

  private prepareData(elements: HTMLElement[], data: any[]) {
    elements.forEach((element) => {
      let dataManager;
      switch (this.elementService.getElementType(element)) {
        case CvOutputElementType.SingleElement:
          // dataManager = this.getElementManager(CvOutputElementType.SingleElement);
          dataManager = new ListDataManager(this.templateService);
          break;

        case CvOutputElementType.List:
          dataManager = this.getElementManager(CvOutputElementType.List);
          break;

        default:
          break;
      }

      if (dataManager) dataManager.insertDataToElement(element, data);
    });

    return this.dataMerger.merge(elements);
  }

  private getElementManager(elementType: CvOutputElementType): IElementDataManager {
    return this.dataServices.filter((element) => element.type == elementType)[0];
  }

  private addPageToCV(page: HTMLElement) {
    this.cvElement.appendChild(page);
    this.pages.push(page);
  }

  private getPageAndPageContent(pageTemplate: HTMLElement) {
    const page = this.templateService.createClone(pageTemplate) as HTMLElement;
    const pageContent = this.templateService.getPageContent(page);

    return { page, pageContent };
  }
}
