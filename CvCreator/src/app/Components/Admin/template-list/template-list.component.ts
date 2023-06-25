import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ICvTemplate } from 'src/app/Interfaces/ICvTemplate';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss']
})
export class TemplateListComponent implements OnInit {

  templates: ICvTemplate[] = [];


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get("https://localhost:7184/CvTemplate").subscribe(data=>{
        this.templates = data as ICvTemplate[];
        console.log(this.templates);
    })
  }

  del(id:string){
  
    this.http.delete("https://localhost:7184/CvTemplate/"+ id).subscribe(
    val=>{ 
      console.log("val");
      console.log(val); },
    error=>{
      console.log("error");
      console.log(error);
    },
    ()=>{
      console.log("complete");
    }
    )
  }

}
