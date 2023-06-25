import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ICvTemplate } from 'src/app/Interfaces/ICvTemplate';

@Component({
  selector: 'app-templates-list',
  templateUrl: './templates-list.component.html',
  styleUrls: ['./templates-list.component.scss']
})
export class TemplatesListComponent implements OnInit {

  templates: ICvTemplate[] = [];

  constructor(private http: HttpClient) { }


  ngOnInit(): void {
    this.http.get("https://localhost:7184/cvtemplate",).subscribe(res => {
    this.templates = res as ICvTemplate[];  
    console.log(res);});
  }

}
