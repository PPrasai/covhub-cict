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
  public formAAggregateData = [];
  private fullDataObject = {};

  constructor(private dataService: FormADataService) {
    this.newFormFlag$ = new BehaviorSubject(this.newFormFlag);

    this.dataService.getAll().then(data => {
      console.log(data);
    });
  }

  prepareAllFormData() {
    this.newFormFlag$.next(true);
  }

  aggregateFormData(formGroup: FormGroup) {
    this.formAAggregateData.push(formGroup.value);
    this.fullDataObject = {...this.fullDataObject, ...formGroup.value};

    if (this.formAAggregateData.length == 12) {
      console.log(this.formAAggregateData.slice(0,3));
      this.formAAggregateData = [this.fullDataObject];
      console.log(this.formAAggregateData);
      this.dataService.addAll(
        this.formAAggregateData.slice(0,3)).then(_ => {
        console.log(this.formAAggregateData.slice(0,3));
        this.formAAggregateData = [];
      })
    }
  }
}
