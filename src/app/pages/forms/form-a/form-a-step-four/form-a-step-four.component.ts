import { Component, OnInit } from '@angular/core';
import { TranslationServiceEn } from '../../../../services/i18n/translation-gen.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'cov-form-a-step-four',
  templateUrl: './form-a-step-four.component.html',
  styleUrls: ['./form-a-step-four.component.scss']
})
export class FormAStepFourComponent implements OnInit {

  caseStatus: string;

  form = new FormGroup({
    $key: new FormControl(null),

    cboxStudent: new FormControl(false),
    cboxLabTech: new FormControl(false),
    cboxHealthWorker: new FormControl(false),
    cboxVet: new FormControl(false),
    cboxHospitality: new FormControl(false),
    cboxSanitation: new FormControl(false),
    cboxSecurity: new FormControl(false),
    cboxOther: new FormControl(false),
    cboxOtherSpecification: new FormControl(''),

    rbTravelBefore: new FormControl(''),
    country: new FormControl(''),
    city: new FormControl(''),
    departureDate: new FormControl(''),
    arrivalDate: new FormControl('')
  });

  constructor(public t: TranslationServiceEn) { }

  ngOnInit(): void {
  }

  changeCaseStatus(event: any) {
    this.caseStatus = event as string;
  }


}
