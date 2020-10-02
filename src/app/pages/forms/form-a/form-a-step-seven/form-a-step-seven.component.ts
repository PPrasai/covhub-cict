import { Component, OnInit } from '@angular/core';
import { TranslationServiceEn } from '../../../../services/i18n/translation-gen.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'cov-form-a-step-seven',
  templateUrl: './form-a-step-seven.component.html',
  styleUrls: ['./form-a-step-seven.component.scss']
})
export class FormAStepSevenComponent implements OnInit {

  form = new FormGroup({
    $key: new FormControl(null),
    rbCaseHasFamily: new FormControl(''),
    rbCaseServedByAnyone: new FormControl(''),
    ifYesNumberOfMembers: new FormControl(null),

    rbCaseServedByHealthWorker: new FormControl(''),

    rbCaseUsedPublicTransport: new FormControl(''),
    rbIfYesWhatMedium: new FormControl(''),
    ifYesWhen: new FormControl(''),

    route: new FormControl(''),
    vehicleNumber: new FormControl(''),
    seatNumber: new FormControl(''),
    taxiNumber: new FormControl(''),
    taxiEmbarkLocation: new FormControl(''),
    flightNumber: new FormControl(''),
    flightSeatNumber: new FormControl(''),
    travelOrigin: new FormControl(''),
    travelDestination: new FormControl(''),

    rbSchoolOrOffice: new FormControl(''),
    ifYesAddress: new FormControl(''),
    ifYesPhone: new FormControl(''),
    authorityName: new FormControl(''),

    rbInCloseProximity: new FormControl(''),

    rbSocialContact: new FormControl(''),

    rbCaseAttendProgram: new FormControl(''),
    programAddress: new FormControl(''),
    programPhone: new FormControl(''),
    programDate: new FormControl(''),

    helpfulInfoForContactTracing: new FormControl(''),

    rbOneOrMoreContactInPartSix: new FormControl('')
  })

  constructor(public t: TranslationServiceEn) { }

  ngOnInit(): void {
  }

}
