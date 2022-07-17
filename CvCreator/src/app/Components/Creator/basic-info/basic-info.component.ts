import { PersonalData } from './../../../Models/PersonalData';
import { CurriculumVitaeService } from './../../../Services/curriculum-vitae.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CurriculumVitae } from 'src/app/Models/CurriculumVitae';
import { PersonalDataComponent } from '../personal-data/personal-data.component';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss'],
})
export class BasicInfoComponent {
  constructor(
    private route: ActivatedRoute,
    private cvService: CurriculumVitaeService,
    private router: Router
  ) {}

  curriculumVitaeId: string;
  personalData: PersonalData;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.curriculumVitaeId = params['id'];
    });

    this.cvService.get(this.curriculumVitaeId).subscribe({
      next: (data) => {
        if (data == null) this.router.navigate(['/404']);
        console.log(data);

        this.personalData = data.personalData as PersonalData;
      },
      error: (err) => {
        this.router.navigate(['/404']);
      },
    });
  }
}
