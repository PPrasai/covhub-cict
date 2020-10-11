import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CaseDataService } from '../../../services/db/case-data.service';
import { NewCaseFormeta } from './new-case.formeta';


@Injectable({
  providedIn: 'root'
})
export class CaseService {
  private newCaseFlag = false;
  private newCaseId: string;

  public newCaseFlag$: BehaviorSubject<Boolean>;
  public newCaseIdFlag$: BehaviorSubject<string>;

  private allCases = {};
  constructor(private dataService: CaseDataService) {
    this.newCaseFlag$ = new BehaviorSubject(this.newCaseFlag);
    this.newCaseIdFlag$ = new BehaviorSubject(this.newCaseId);

    this.dataService.getAll().then(data => {
      this.allCases = data;
    });
  }

  getAll() {
    return this.dataService.getAll();
  }

  getChangeListener(): EventEmitter<any> {
    return this.dataService.getChangeListener();
  }

  addAll(newCase: NewCaseFormeta) {
    this.dataService.addAll([newCase]).then(result => {
      return result[0].id;
    })
  }
}
