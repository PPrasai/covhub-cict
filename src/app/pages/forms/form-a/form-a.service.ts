import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { FormADataService } from '../../../services/db/form-a-data.service';

@Injectable({
  providedIn: 'root'
})
export class FormAService {
  private newFormFlag = false;
  public newFormFlag$: BehaviorSubject<Boolean>;
  private formsResponded = 0;
  private fullDataObject = {};

  constructor(private dataService: FormADataService) {
    this.newFormFlag$ = new BehaviorSubject(this.newFormFlag);
  }

  prepareAllFormData() {
    this.newFormFlag$.next(true);
  }

  aggregateFormData(formGroup: FormGroup) {
    this.formsResponded += 1;
    this.fullDataObject = {...this.fullDataObject, ...formGroup.value};

    if (this.formsResponded == 12) {
      this.dataService.addAll(
        [this.fullDataObject]).then(_ => {
        this.formsResponded = 0;
      })
    }
  }
}
