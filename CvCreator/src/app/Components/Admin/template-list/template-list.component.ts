import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ICvTemplate } from 'src/app/Interfaces/ICvTemplate';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss']
})
export class TemplateListComponent implements OnInit {

  showModal = false;
  bgrLeft = "translateX(0)";

  templates: ICvTemplate[] = [];



  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get("https://localhost:7184/CvTemplate").subscribe(data=>{
        this.templates = data as ICvTemplate[];
        console.log(this.templates);
    })
  }

  delete(id:string){
  
    this.http.delete("https://localhost:7184/CvTemplate/"+ id).subscribe(
    response=>{ 
      const template = this.templates.find(t => t.id === id);
      const index = this.templates.indexOf(template as ICvTemplate);
      if(index !== -1)
       this.templates.splice(index, 1);
      
       },
    error=>{
      console.log(error);
    },
 
    )
  }

  toggleModal(event: boolean){
    this.showModal = event
  }

}
