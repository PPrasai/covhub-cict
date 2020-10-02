import { Component, OnInit } from '@angular/core';
import { TranslationServiceEn } from '../../../../services/i18n/translation-gen.service';
import { FormControl, FormGroup } from '@angular/forms';
import { FormAService } from '../form-a.service';

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

  constructor(public t: TranslationServiceEn,
    public formAService: FormAService) {
      this.formAService.newFormFlag$.subscribe(flag => {
        if (flag) {
          console.log('STEP 5: prepare data instruction received');
          this.formAService.aggregateFormData(this.form);
        }
      });
    }

  ngOnInit(): void {
  }

}


