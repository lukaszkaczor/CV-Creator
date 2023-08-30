import { ContactData } from './ContactData';
import { Address } from './Address';
import { PersonalData } from './PersonalData';
import { WorkExperience } from './WorkExperience';
import { Education } from './Education';
export class CurriculumVitae {
  id: string;
  name: string;
  creationDate: string;
  creationTime: string;

  personalData?: PersonalData;
  cvAddress?: Address;
  contactData?: ContactData;
  workExperience?: WorkExperience[]
  education?: Education[]
}
