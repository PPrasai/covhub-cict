import { Observable } from 'rxjs';
export interface DialogData {
  newId: string;
  title: Observable<string | any>;
}

export interface ActiveTasksInfo {
  case: string;
  caseInvestigator: string;
  time: string;
}
