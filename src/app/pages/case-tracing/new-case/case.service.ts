import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CaseDataService } from '../../../services/db/case-data.service';
import { NewCaseFormeta } from './new-case.formeta';


@Injectable({
  providedIn: 'root'
})
export class CaseService {
  private newCaseFlag = false;
  public newCaseFlag$: BehaviorSubject<Boolean>;
  private allCases = {};
  constructor(private dataService: CaseDataService) {
    this.newCaseFlag$ = new BehaviorSubject(this.newCaseFlag);

    this.dataService.getAll().then(data => {
      this.allCases = data;
    });
  }

  getAll() {
    return this.dataService.getAll();
  }

  addAll(newCase: NewCaseFormeta) {
    this.dataService.addAll([newCase]).then(result => {
      console.log(result);
    })
  }
}
