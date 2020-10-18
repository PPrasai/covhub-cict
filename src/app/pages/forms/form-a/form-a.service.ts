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
  private caseName: string;
  private caseId: string;

  constructor(
    private formDataService: FormADataService,
    private contactDataSerivice: ContactTracingDataSerivce
  ) {
    this.newFormFlag$ = new BehaviorSubject(this.newFormFlag);
  }

  prepareAllFormData() {
    this.newFormFlag$.next(true);
  }

  aggregateFormData(formGroup: FormGroup, caseName?: string, caseId?: string) {
    this.formsResponded += 1;
    this.fullDataObject = {...this.fullDataObject, ...formGroup.value};

    // console.log(formGroup);

    // console.log(this.fullDataObject);
    if (caseName != undefined) this.caseName = caseName;
    if (caseId != undefined) this.caseId = caseId;

    if (this.formsResponded == 12) {
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

  createContactTracingEntry(formId: string) {
    console.log('new contact tracing stuff!');
    let addData = [];
    console.log(this.caseId, this.caseName);
    this.contacts.map(contact => {
      addData.push({
        ...contact,
        form_id: formId,
        caseId: this.caseId,
        caseName: this.caseName,
        creationDate: new Date(),
      })
    });

    console.log(addData);

    this.contactDataSerivice.addAll(addData as Doc[]).then(result => {
      console.log('Contact data saved.');
      console.log('New resource ID: ', result[0].id);
    })
  }
}
