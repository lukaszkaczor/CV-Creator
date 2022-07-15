import { CurriculumVitaeService } from './../../../Services/curriculum-vitae.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CurriculumVitae } from 'src/app/Models/CurriculumVitae';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss'],
})
export class BasicInfoComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private cvService: CurriculumVitaeService,
    private router: Router
  ) {}

  curriculumVitaeId: string;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.curriculumVitaeId = params['id'];
    });

    this.cvService.get(this.curriculumVitaeId).subscribe({
      next: (data) => {
        if (data == null) this.router.navigate(['/404']);
      },
      error: (err) => {
        this.router.navigate(['/404']);
      },
    });
  }
}
