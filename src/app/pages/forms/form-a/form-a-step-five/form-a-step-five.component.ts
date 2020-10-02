import { Component, OnInit } from '@angular/core';
import { TranslationServiceEn } from '../../../../services/i18n/translation-gen.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'cov-form-a-step-five',
  templateUrl: './form-a-step-five.component.html',
  styleUrls: ['./form-a-step-five.component.scss']
})
export class FormAStepFiveComponent implements OnInit {

  form = new FormGroup({
    $key: new FormControl(null),
    rbHospitalizedOrIsolated: new FormControl(''),
    ifYesHospitalizationDate: new FormControl(''),
    ifYesHospiralName: new FormControl(''),

    rbIsolationLocation: new FormControl(''),
    isolationLocation: new FormControl(''),
    isolatedDate: new FormControl(''),

    rbPatientInVentilator: new FormControl('')
  });

  constructor(public t: TranslationServiceEn) { }

  ngOnInit(): void {
  }

}


