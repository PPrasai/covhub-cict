import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

import { TranslationServiceEn } from '../../../../services/i18n/translation-gen.service';

import { FormACTData, FormACTDataMeetLocation, FormACTDataContactIntimacy } from '../../../../@models/cict/forms/form-a-ct-model';
import { FormAService } from '../form-a.service';
import { FormGroup } from '@angular/forms';

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

  constructor(public t: TranslationServiceEn,
    public formAService: FormAService) {
      this.formAService.newFormFlag$.subscribe(flag => {
        if (flag) {
          console.log('STEP 9: prepare data instruction received');
          this.formAService.aggregateFormData(new FormGroup({}));
        }
      });
    }

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
  }

  saveFormA(event): void {
    this.saveFormAEvent.emit(this.contacts);
  }


}
