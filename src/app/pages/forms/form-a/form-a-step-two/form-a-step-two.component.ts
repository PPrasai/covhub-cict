import { Component, OnInit } from '@angular/core';
import { TranslationServiceEn } from '../../../../services/i18n/translation-gen.service';
import { FormControl, FormGroup } from '@angular/forms';
import { FormAService } from '../form-a.service';

@Component({
  selector: 'cov-form-a-step-two',
  templateUrl: './form-a-step-two.component.html',
  styleUrls: ['./form-a-step-two.component.scss']
})
export class FormAStepTwoComponent implements OnInit {

  form = new FormGroup({
    $key: new FormControl(null),
    symptomatic: new FormControl(false),
    ifNot4WeeksEarlier: new FormControl(false),
    ifNotWhyTest: new FormControl(''),
    ifYesWhen: new FormControl(''),

    cboxHistoryOfFeverChills: new FormControl(false),
    cboxGeneralWeakness: new FormControl(false),
    cboxCough: new FormControl(false),
    cboxSoreThroat: new FormControl(false),
    cboxRunnyNose: new FormControl(false),
    cboxShortnessOfBreath: new FormControl(false),
    cboxDiarrhea: new FormControl(false),
    cboxNauseaVomiting: new FormControl(false),
    cboxHeadache: new FormControl(false),
    cboxIrritabilityConfusion: new FormControl(false),
    cboxLossOfTaste: new FormControl(false),
    cboxLossOfSmell: new FormControl(false),
    cboxPainMuscular: new FormControl(false),
    cboxPainChest: new FormControl(false),
    cboxPainAbdominal: new FormControl(false),
    cboxPainJoint: new FormControl(false),
    cboxPainOther: new FormControl(false),

    cboxPainOtherSpecification: new FormControl(''),

    cboxPharyngealExudate: new FormControl(false),
    cboxConjunctivalInjection: new FormControl(false),
    cboxSeizure: new FormControl(false),
    cboxDyspneaTachypnea: new FormControl(false),
    cboxAbnormalLongAuscultation: new FormControl(false),
    cboxComa: new FormControl(false),
    cboxAbnormalLungRadiography: new FormControl(false),
    cboxNone: new FormControl(false),
    cboxOther: new FormControl(false),

    cboxOtherSpecification: new FormControl(''),

    cboxPregnant: new FormControl(false),
    cboxDiabetes: new FormControl(false),
    cboxRecentMother: new FormControl(false),
    cboxHeartDisease: new FormControl(false),
    cboxLiverDisease: new FormControl(false),
    cboxNerveDisease: new FormControl(false),
    cboxKidneyDisease: new FormControl(false),
    cboxImmuneDisease: new FormControl(false),
    cboxHIV: new FormControl(false),
//.............Unclear
    cboxUnclear: new FormControl(false),
    cboxMalignancy: new FormControl(false),
    cboxLungDisease: new FormControl(false),
    cboxOtherDisease: new FormControl(false),
    cboxNoneDisease: new FormControl(false),

    cboxOtherDiseaseSpecification: new FormControl('')

  });

  constructor(public t: TranslationServiceEn,
    public formAService: FormAService) {
      this.formAService.newFormFlag$.subscribe(flag => {
        if (flag) {
          console.log('STEP 2 prepare data instruction received');
          this.formAService.aggregateFormData(this.form);
        }
      });
    }

  ngOnInit(): void {
  }


}
