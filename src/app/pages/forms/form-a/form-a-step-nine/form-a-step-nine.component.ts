import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

import { TranslationServiceEn } from '../../../../services/i18n/translation-gen.service';

import { FormACTData, FormACTDataMeetLocation, FormACTDataContactIntimacy } from '../../../../@models/cict/forms/form-a-ct-model';

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

  contacts: FormACTData[] = [{
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

  constructor(public t: TranslationServiceEn) { }

  ngOnInit(): void {
  }

  addContact(event): void {
    this.contacts.unshift({
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

    console.log(event);
  }


}
