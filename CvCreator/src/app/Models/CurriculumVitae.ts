import { Address } from './Address';
import { PersonalData } from './PersonalData';
export class CurriculumVitae {
  id: string;
  name: string;
  creationDate: string;
  creationTime: string;

  personalData?: PersonalData;
  cvAddress?: Address;
}
