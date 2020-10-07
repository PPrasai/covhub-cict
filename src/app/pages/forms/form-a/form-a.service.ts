import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { FormADataService } from '../../../services/db/form-a-data.service';
import { ContactTracingDataSerivce } from '../../../services/db/contact-tracing-data.service';
import { Doc } from '../../../@models/domain.model';

@Injectable({
  providedIn: 'root'
})
export class FormAService {
  private newFormFlag = false;
  public newFormFlag$: BehaviorSubject<Boolean>;
  private formsResponded = 0;
  private fullDataObject = {};
  private contacts: Object[];

  constructor(
    private formDataService: FormADataService,
    private contactDataSerivice: ContactTracingDataSerivce
  ) {
    this.newFormFlag$ = new BehaviorSubject(this.newFormFlag);
  }

  prepareAllFormData() {
    this.newFormFlag$.next(true);
  }

  aggregateFormData(formGroup: FormGroup) {
    this.formsResponded += 1;
    this.fullDataObject = {...this.fullDataObject, ...formGroup.value};

    if (this.formsResponded == 11) {
      this.formDataService.addAll(
        [this.fullDataObject]).then(result => {
        this.formsResponded = 0;

        if (result[0].id) {
          this.createContactTracingEntry(result[0].id);
        }
      })
    }
  }

  prepareContactTracingData(formGroups: FormGroup[]) {
    this.contacts = formGroups.map(formGroup => {
      return formGroup.value;
    });
  }

  createContactTracingEntry(_id: string) {
    console.log('new contact tracing stuff!');
    this.contactDataSerivice.addAll([{
      form_id: _id,
      creationDate: new Date(),
      contacts: this.contacts
    }] as Doc[]).then(result => {
      console.log('Contact data saved.');
      console.log('New resource ID: ', result[0].id);
    })
  }
}
