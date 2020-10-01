import { Component, OnInit } from '@angular/core';
import { COUNTRIES, NEARBY_COUNTRIES } from '../../../../@core/data/countries.geo';
import { TranslationServiceEn } from '../../../../services/i18n/translation-gen.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'cov-form-a-step-one',
  templateUrl: './form-a-step-one.component.html',
  styleUrls: ['./form-a-step-one.component.scss']
})
export class FormAStepOneComponent implements OnInit {

  countries: string[];

  constructor(public t: TranslationServiceEn) { }

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
