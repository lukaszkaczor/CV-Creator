import { CvDataManager } from './CvDataManager';
import { ICvDataManager } from './Interfaces/ICvDataManager';
import { ITemplateEditor } from './Interfaces/ITemplateEditor';
import { ITemplateService } from './Interfaces/ITemplateService';
import { TemplateService } from './TemplateService';

export class CvBuilder {
  private template: HTMLElement;
  private templateBackup: HTMLElement;
  private cvElement: HTMLElement;
  private pages: HTMLElement[] = [];
  private dataToInsert = [];

  constructor(
    private cvDataManager: ICvDataManager,
    private templateService: ITemplateService,
    private templateEditor: ITemplateEditor
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

    const mergedElements = this.cvDataManager
      .insertDataToMarkers(allElements, this.dataToInsert)
      .merge();

    // console.log(mergedElements);

    let { page, pageContent } = this.getPageAndPageContent(firstPageTemplate);

    this.addPageToCV(page);

    mergedElements.forEach((element) => {
      let elementClone = this.templateEditor.createClone(element) as HTMLElement;
      // console.log(element);
      // let ss = element.cloneNode(true);
      // console.log(ss);

      // console.log(elementClone.);

      pageContent.appendChild(elementClone);
      // console.log(elementClone);

      // pageContent.appendChild(element);

      if (this.templateEditor.contentHeightLowerThanPageHeight(page)) return;

      let { itemForNextPage, cutWords } = this.templateEditor.deleteReduntantDataFromLastPage(
        page,
        elementClone
      );

      const pageWithContent = this.getPageAndPageContent(secondPageTemplate);

      page = pageWithContent.page;
      pageContent = pageWithContent.pageContent;

      this.addPageToCV(page);
      // itemForNextPage.textContent = this.joinCutWords(cutWords); //
      // console.log(itemForNextPage);

      pageContent.appendChild(itemForNextPage);
    });
  }

  private addPageToCV(page: HTMLElement) {
    this.cvElement.appendChild(page);
    this.pages.push(page);
  }

  private getPageAndPageContent(secondPageTemplate: HTMLElement) {
    let page = this.templateEditor.createClone(secondPageTemplate) as HTMLElement;
    let pageContent = this.templateService.getPageContent(page);

    return { page, pageContent };
  }

  joinCutWords(words: string[]) {
    return words.reverse().join(' ');
  }
}
