import { Component, OnInit } from '@angular/core';
import { TranslationServiceEn } from '../../../../services/i18n/translation-gen.service';

@Component({
  selector: 'cov-form-a-step-ten',
  templateUrl: './form-a-step-ten.component.html',
  styleUrls: ['./form-a-step-ten.component.scss']
})
export class FormAStepTenComponent implements OnInit {

  constructor(public t: TranslationServiceEn) { }

  ngOnInit(): void {
  }

  newFormAData() {
    console.log('new form a step 10');
  }

}
