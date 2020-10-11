import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

import { TranslationServiceEn } from '../../../../services/i18n/translation-gen.service';

import { FormACTDataMeetLocation, FormACTDataContactIntimacy } from '../../../../@models/cict/forms/form-a-ct-model';
import { FormACTData } from '../../../../@models/cict/forms/form-a-ct-model';
import { FormAService } from '../form-a.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'cov-form-a-step-nine',
  templateUrl: './form-a-step-nine.component.html',
  styleUrls: ['./form-a-step-nine.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('.5s ease-in', style( {
          opacity: '1',
          transform: 'translateY(0%)'
        })),
      ]),
    ]),
  ],
})
export class FormAStepNineComponent implements OnInit {

  meetLocation = FormACTDataMeetLocation;
  contactIntimacy = FormACTDataContactIntimacy;

  @Output() saveFormAEvent = new EventEmitter<FormACTData[]>();

  contacts: FormACTData[] = [{
    caseId: "none",
    sno: "",
    fname: "",
    lname: "",
    gender: "",
    age: "",
    caseRelation: "",
    contactMeetLocation: null,
    lastContactDate: null,
    contactType: null,
    contactAddress: "",
    contactPhone: 0
  }];

  contactsFG: FormGroup[];

  constructor(public t: TranslationServiceEn,
    public formAService: FormAService) {
      this.formAService.newFormFlag$.subscribe(flag => {
        if (flag) {

          this.contactsFG = this.contacts.map(contact => {
            return new FormGroup({
              caseId: new FormControl(contact.caseId),
              sno: new FormControl(contact.sno),
              fname: new FormControl(contact.fname),
              lname: new FormControl(contact.lname),
              gender: new FormControl(contact.gender),
              age: new FormControl(contact.age),
              caseRelation: new FormControl(contact.caseRelation),
              contactMeetLocation: new FormControl(contact.contactMeetLocation),
              lastContactDate: new FormControl(contact.lastContactDate),
              contactType: new FormControl(contact.contactType),
              contactAddress: new FormControl(contact.contactAddress),
              contactPhone: new FormControl(contact.contactPhone),
            });
          });

          console.log('STEP 9: prepare data instruction received. DIFFERENTLY.');
          // this.formAService.aggregateFormData(new FormGroup({}));
          this.formAService.prepareContactTracingData(this.contactsFG);
        }
      });
    }

  ngOnInit(): void {
  }

  addContact(event): void {
    this.contacts.unshift({
      caseId: "none",
      sno: "",
      fname: "",
      lname: "",
      gender: "",
      age: "",
      caseRelation: "",
      contactMeetLocation: null,
      lastContactDate: null,
      contactType: null,
      contactAddress: "",
      contactPhone: 0
    });
  }

  saveFormA(event): void {
    this.saveFormAEvent.emit(this.contacts);
  }


}
