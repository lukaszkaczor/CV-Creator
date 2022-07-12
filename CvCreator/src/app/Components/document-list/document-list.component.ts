import { CurriculumVitaeService } from '../../Services/curriculum-vitae.service';
import { CurriculumVitae } from './../../Models/CurriculumVitae';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss'],
})
export class DocumentListComponent implements OnInit {
  constructor(private data: CurriculumVitaeService) {}
  documents: CurriculumVitae[];

  async ngOnInit(): Promise<void> {
    this.documents = await this.data.getAll();

    console.log(await this.data.getAll());
    // console.log(await this.data.get('9dc71780-47f0-4ec7-5cc9-08da6286644c'));
    var ss = await this.data.get('9dc71780-47f0-4ec7-5cc9-08da6286644c');

    console.log(ss);

    var item = {
      name: 'nazwacv',
      // creationDate: '2022/12/12',
      // creationTime: '18:20',
      // id: ss.id,
    };

    // console.log(item);

    var ssd = await this.data.put(ss.id, item);
    // console.log(ssd);
    // console.log('name: ' + ssd.name);
  }

  // ngAfterViewInit(){ ready = true; }

  async create() {
    var ss = await this.data.post();

    console.log(ss);
  }

  async deleteItem(cv: CurriculumVitae) {
    var response = await this.data.delete(cv.id);
    const index = this.documents.indexOf(cv);

    console.log(response);
    this.documents.splice(index, 1);
  }
}
