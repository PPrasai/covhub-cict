import { Component, OnInit } from '@angular/core';
import { TranslationServiceEn } from '../../../../services/i18n/translation-gen.service';
import { FormControl, FormGroup } from '@angular/forms';
import { FormAService } from '../form-a.service';

@Component({
  selector: 'cov-form-a-step-six',
  templateUrl: './form-a-step-six.component.html',
  styleUrls: ['./form-a-step-six.component.scss']
})
export class FormAStepSixComponent implements OnInit {

  form = new FormGroup({
    $key: new FormControl(null),
    sixWeekRefDate: new FormControl(''),
    rbContactWithCovidHotspot: new FormControl(''),
    rbIfYesLocalOrAbroad: new FormControl(''),
    ifYesName: new FormControl(''),
    ifYesRelation: new FormControl(''),
    ifYesHospitalizationDate: new FormControl(''),
    hotspotCountryName: new FormControl(''),

    rbCaseInCrowdedPlace: new FormControl(''),
    ifYesWhereAndWhen: new FormControl(''),
    rbCaseInContactWithTheSick: new FormControl(''),
    ifYesWhoWhereAndWhen: new FormControl(''),
    rbHasCaseGoneAnywhere: new FormControl(''),
    ifYesWithWhomWhereAndWhen: new FormControl(''),

    additionalInfo: new FormControl('')
  });

  constructor(public t: TranslationServiceEn,
    public formAService: FormAService) {
      this.formAService.newFormFlag$.subscribe(flag => {
        if (flag) {
          console.log('STEP 6: prepare data instruction received');
          this.formAService.aggregateFormData(this.form);
        }
      });
    }

  ngOnInit(): void {
  }


}
