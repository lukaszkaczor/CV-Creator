import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ICvTemplate } from "src/app/Interfaces/ICvTemplate";
import { ModalComponent } from "../modal/modal.component";
import { HorizontalSelectStatus } from "../horizontal-select/horizontal-select.component";

@Component({
  selector: "app-template-list",
  templateUrl: "./template-list.component.html",
  styleUrls: ["./template-list.component.scss"],
})
export class TemplateListComponent implements OnInit {
  HorizontalSelectStatus = HorizontalSelectStatus;
  @ViewChild(ModalComponent) modal: ModalComponent;
  form: FormGroup;

  templates: ICvTemplate[] = [];
  action: string;
  filter: HorizontalSelectStatus = HorizontalSelectStatus.All;

  constructor(private http: HttpClient, private builder: FormBuilder) {
    this.form = builder.group({
      id: [],
      name: ["", Validators.required],
      htmlContent: [""],
      styles: [""],
      isActive: [false],
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  save() {
    if (this.form.value.id === null) {
      this.post();
      return;
    }
    this.put();
  }

  post() {
    this.http.post("https://localhost:7184/CvTemplate/", this.form.value).subscribe(
      (response) => {
        // this.templates.push(response as ICvTemplate);
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.getData();
        this.modal.hide();
        this.resetForm();
      }
    );
  }

  put() {
    this.http.put("https://localhost:7184/CvTemplate/" + this.form.value.id, this.form.value).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => console.log(error),
      () => {
        console.log("complete");
        this.modal.hide();
        this.resetForm();
        this.getData();
      }
    );
  }

  delete(id: string) {
    this.http.delete("https://localhost:7184/CvTemplate/" + id).subscribe(
      (response) => {},
      (error) => {
        console.log(error);
        this.getData();
      },
      () => {
        this.getData();
      }
    );
  }

  resetForm() {
    this.form.reset();
  }

  createNewTemplate() {
    this.action = "Dodaj nowy szablon";
    this.modal.show();
  }

  fill(id: string) {
    this.action = "Edytuj szablon";
    const template = this.templates.find((template) => template.id === id);

    this.form.patchValue(template as ICvTemplate);
    this.modal.toggle();
  }

  getData(status: HorizontalSelectStatus = this.filter) {
    this.http.get("https://localhost:7184/CvTemplate").subscribe((data) => {
      const list = data as ICvTemplate[];
      this.filter = status;

      switch (status) {
        case HorizontalSelectStatus.All:
          this.templates = list;
          break;

        case HorizontalSelectStatus.Active:
          this.templates = list.filter((template) => template.isActive);
          break;

        case HorizontalSelectStatus.Inactive:
          this.templates = list.filter((template) => !template.isActive);
          break;
      }
    });
  }
}
