import { Component, OnInit } from '@angular/core';
import { TranslationServiceEn } from '../../../../services/i18n/translation-gen.service';
import { FormControl, FormGroup } from '@angular/forms';
import { FormAService } from '../form-a.service';

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

  constructor(public t: TranslationServiceEn,
    public formAService: FormAService) {
      this.formAService.newFormFlag$.subscribe(flag => {
        if (flag) {
          console.log('STEP 4: prepare data instruction received');
          this.formAService.aggregateFormData(this.form);
        }
      });
    }

  ngOnInit(): void {
  }

  changeCaseStatus(event: any) {
    this.caseStatus = event as string;
  }


}
