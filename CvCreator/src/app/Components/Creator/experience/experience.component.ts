import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'src/app/Models/Address';
import { ContactData } from 'src/app/Models/ContactData';
import { Education } from 'src/app/Models/Education';
import { Language } from 'src/app/Models/Language';
import { PersonalData } from 'src/app/Models/PersonalData';
import { WorkExperience } from 'src/app/Models/WorkExperience';
import { CurriculumVitaeService } from 'src/app/Services/curriculum-vitae.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private cvService: CurriculumVitaeService,
    private router: Router
  ) {}

  curriculumVitaeId: string;
  personalData: PersonalData;
  cvAddress: Address;
  contactData: ContactData;
  experience: WorkExperience[];
  education: Education[];
  languages: Language[];

  ngOnInit(): void {    
    this.route.params.subscribe((params) => {
      this.curriculumVitaeId = params['id'];
    });

    this.cvService.get(this.curriculumVitaeId).subscribe({
      next: (data) => {
        if (data == null) this.router.navigate(['/404']);
        console.log(data);

        this.personalData = data.personalData as PersonalData;
        this.cvAddress = data.cvAddress as unknown as Address;
        this.contactData = data.contactData as ContactData;
        this.experience = data.workExperience as WorkExperience[];
        this.education = data.education  as Education[];
        this.languages = data.languages as Language[]

        console.log(data)
      },
      error: (err) => {
        this.router.navigate(['/404']);
      },
    });
  }
}
