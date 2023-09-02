import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Language } from 'src/app/Models/Language';
import { LanguageService } from 'src/app/Services/language.service';
import { FormManager } from 'src/app/Utilities/FormManager';

@Component({
  selector: 'app-language-form',
  templateUrl: './language-form.component.html',
  styleUrls: ['./language-form.component.scss']
})
export class LanguageFormComponent
extends FormManager<Language>
implements OnInit, OnChanges{
  @Input() curriculumVitaeId: string;
  @Input() languages: Language[];

  constructor(service: LanguageService, builder: FormBuilder) {
    super(service, builder);
  }


  ngOnInit(): void {
    this.initializeForm({
      id: [''],
      languageName: [''],
      level: [''],
      curriculumVitaeId: [this.curriculumVitaeId],
    });
    console.log(this.curriculumVitaeId)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.languages) return;
    // this.initFormData(this.education);
  }

}
