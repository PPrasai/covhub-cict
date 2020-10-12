import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslationServiceEn } from '../../../../services/i18n/translation-gen.service';
import { FormAService } from '../form-a.service';

@Component({
  selector: 'cov-form-a-step-ten',
  templateUrl: './form-a-step-ten.component.html',
  styleUrls: ['./form-a-step-ten.component.scss']
})
export class FormAStepTenComponent implements OnInit {

  form = new FormGroup({
    reportResendDate: new FormControl(''),
    rbPreDischargeOrDeathSymptomatic: new FormControl(''),
    ifYesSymptomDate: new FormControl(''),
    rbHospitalized: new FormControl(''),
    ifHospitalizedDate: new FormControl(''),
    rbCaseInICU: new FormControl(''),
    rbCaseInVentilation: new FormControl(''),
    rbCaseHaveMembraneOxy: new FormControl(''),

    rbHealthResult: new FormControl(''),
    ifOtherLetKnow: new FormControl(''),

    dischargeDate: new FormControl(''),
    ifDischargedLastTestDate: new FormControl(''),
    rbLabTestResult: new FormControl('')
  });

  constructor(
    public t: TranslationServiceEn,
    public formAService: FormAService
  ) {
    this.formAService.newFormFlag$.subscribe(flag => {
      if (flag) {
        console.log('STEP LAST: prepare data instruction received');
        this.formAService.aggregateFormData(this.form);
      }
    })
  }

  ngOnInit(): void {
  }
}
