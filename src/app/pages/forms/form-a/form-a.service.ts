import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormAService {
  private newFormFlag = false;
  public newFormFlag$: BehaviorSubject<Boolean>;
  public formAAggregateData = [];

  constructor() {
    this.newFormFlag$ = new BehaviorSubject(this.newFormFlag);
  }

  prepareAllFormData() {
    this.newFormFlag$.next(true);
  }

  aggregateFormData(formGroup: FormGroup) {
    this.formAAggregateData.push(formGroup);
    if (this.formAAggregateData.length == 12) {
      console.log('All forms sent data');
      console.log(this.formAAggregateData);
    }
  }
}
