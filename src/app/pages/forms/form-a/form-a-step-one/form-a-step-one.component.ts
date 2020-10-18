import { Component, OnInit } from '@angular/core';
import { COUNTRIES, NEARBY_COUNTRIES } from '../../../../@core/data/countries.geo';
import { TranslationServiceEn } from '../../../../services/i18n/translation-gen.service';
import { FormControl, FormGroup } from '@angular/forms';
import { FormAService } from '../form-a.service';

@Component({
  selector: 'cov-form-a-step-one',
  templateUrl: './form-a-step-one.component.html',
  styleUrls: ['./form-a-step-one.component.scss']
})
export class FormAStepOneComponent implements OnInit {

  countries: string[];

  constructor(
    public t: TranslationServiceEn,
    public formAService: FormAService) {
      this.formAService.newFormFlag$.subscribe(flag => {
        if (flag) {
          console.log('STEP 1: prepare data instruction received');
          this.formAService.aggregateFormData(this.form, this.form.value.name);
        }
      });
    }

  form = new FormGroup({
    $key: new FormControl(null),
    uniqueIdentifier: new FormControl(''),
    name: new FormControl(''),
    kinName: new FormControl(''),
    age: new FormControl(''),
    gender: new FormControl(''),
    nationality: new FormControl(''),
    phone1: new FormControl(0),
    phone2: new FormControl(0)
  });

  ngOnInit(): void {
    this.countries = COUNTRIES;
  }

  changeCountry(event: any) {

  }


}
