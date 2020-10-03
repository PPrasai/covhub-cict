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
    this.formAAggregateData.push(formGroup);
    console.log(this.formAAggregateData.length);

    if (this.formAAggregateData.length == 12) {
      this.dataService.addAll([this.formAAggregateData[0].value]).then(_ => {
        this.formAAggregateData = [];
      })
    }
  }
}
