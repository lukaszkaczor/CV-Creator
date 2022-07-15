import { Router } from '@angular/router';
import { CurriculumVitaeService } from '../../Services/curriculum-vitae.service';
import { CurriculumVitae } from './../../Models/CurriculumVitae';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss'],
})
export class DocumentListComponent implements OnInit {
  constructor(private data: CurriculumVitaeService, private router: Router) {}
  documents: CurriculumVitae[];

  async ngOnInit(): Promise<void> {
    // this.documents = await this.data.getAll();
    this.data.getAll().subscribe((data) => {
      this.documents = data;
    });
    // console.log(await this.data.getAll());
    // // console.log(await this.data.get('9dc71780-47f0-4ec7-5cc9-08da6286644c'));
    // var ss = await this.data.get('9dc71780-47f0-4ec7-5cc9-08da6286644c');
    // console.log(ss);
    // var item = {
    //   name: 'nazwacsv',
    //   // creationDate: '2022/12/12',
    //   // creationTime: '18:20',
    //   // id: ss.id,
    // };
    // // console.log(item);
    // var ssd = await this.data.put('9dc71780-47f0-4ec7-5cc9-08da6286644c', item);
    // console.log(ssd);
    // // console.log('name: ' + ssd.name);
  }

  // ngAfterViewInit(){ ready = true; }

  async create() {
    this.data.post().subscribe((data) => {
      this.router.navigate([`basic/${data.id}`]);
    });
    // console.log(ss);
  }

  async deleteItem(cv: CurriculumVitae) {
    // this.data.delete(cv.id).subscribe({
    //   next: (response) => {
    //     const index = this.documents.indexOf(cv);
    //     console.log(response);
    //     this.documents.splice(index, 1);
    //   },
    //   error: (error) => console.log(error),
    // });
    // const index = this.documents.indexOf(cv);
    // console.log(response);
    // this.documents.splice(index, 1);
  }
}
