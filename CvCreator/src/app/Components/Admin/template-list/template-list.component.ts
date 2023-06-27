import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ICvTemplate } from 'src/app/Interfaces/ICvTemplate';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss']
})
export class TemplateListComponent implements OnInit {

  // showModal = false;
  bgrLeft = "translateX(0)";
  currentId = -1;

  @ViewChild(ModalComponent) modal: ModalComponent;

  action: string = "Dodaj nowy szablon"

  templates: ICvTemplate[] = [];
  form:FormGroup;



  constructor(private  http: HttpClient, private builder: FormBuilder) {
   
    this.form = builder.group(
      {
        id: [""],
        name: [""],
        htmlContent: [""],
        styles: [""],
      }
    )

  }

  ngOnInit(): void {
   this.getData();
  }


  save(){
    if(this.form.value.id === null){
      this.post()
      return;
    }
    this.put();
  }

  post(){
    this.http.post("https://localhost:7184/CvTemplate/", this.form.value).subscribe(
      response=>{
        this.templates.push(response as ICvTemplate);
      },error=>{
        console.log(error);
      },
      ()=>{
        this.modal.hide();
        this.form.reset();
      }
    )
  }


  put(){
    this.http.put("https://localhost:7184/CvTemplate/"+ this.form.value.id, this.form.value).subscribe(
      response=>{
        console.log(response)
      },
      error=> console.log(error),
      ()=> {
        console.log("complete")
        this.modal.hide();
        this.form.reset();
        this.getData();
      }
    )
  }

  delete(id: string){
    this.http.delete("https://localhost:7184/CvTemplate/"+ id).subscribe(
      response=>{},
      error=>{
          console.log(error)
          this.getData();
        },
      ()=>{
        this.getData();
      }
    )
  }

  resetForm(){
    this.form.reset();
  }

  fill(id: string){
    const template = this.templates.find(d=>d.id === id);

    this.form.setValue(template as ICvTemplate);
    this.modal.toggle();
  }

  getData(){
    this.http.get("https://localhost:7184/CvTemplate").subscribe(data=>{
      this.templates = data as ICvTemplate[];
  })
  }
}
