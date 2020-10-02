import { Component, OnInit } from '@angular/core';
import { COUNTRIES } from '../../../../@core/data/countries.geo';
import { PROVINCES } from '../../../../@core/data/province-districts.geo';
import { DISTRICTS } from '../../../../@core/data/district-municipals.geo';
import { MUNICIPALITIES } from '../../../../@core/data/municipal-wards.geo';
import { TranslationServiceEn } from '../../../../services/i18n/translation-gen.service';

import { FormControl, FormGroup } from '@angular/forms';
import { FormAService } from '../form-a.service';

@Component({
  selector: 'cov-form-a-step-one-a',
  templateUrl: './form-a-step-one-a.component.html',
  styleUrls: ['./form-a-step-one-a.component.scss']
})
export class FormAStepOneAComponent implements OnInit {

  countries: string[];
  countryProvinces: string[];
  districts: any [];
  municipals: any [];
  wards: any [];

  form = new FormGroup({
    $key: new FormControl(null),
    country: new FormControl(null),
    province: new FormControl(null),
    district: new FormControl(null),
    municipality: new FormControl(null),
    ward: new FormControl(null),
    tole: new FormControl('')
  });

  constructor(public t: TranslationServiceEn,
    public formAService: FormAService) {
      this.formAService.newFormFlag$.subscribe(flag => {
        if (flag) {
          console.log('STEP 1a: prepare data instruction received');
          this.formAService.aggregateFormData(this.form);
        }
      });
    }

  ngOnInit(): void {
    this.countries = COUNTRIES;
    this.countryProvinces = PROVINCES?.map(province => province.name);
    this.municipals = DISTRICTS?.map(district => district.name);
    this.wards = MUNICIPALITIES?.map(municip => municip.name);
  }

  changeCountry(event: any) {
    // TODO check and remove
  }


  provinceChanged(event: any) {
    const prov = PROVINCES.filter(obj => {
      return obj.name === event;
    });

    this.districts = prov[0].districts;
  }


  districtChanged(event: any) {
    const dist = DISTRICTS.filter(obj => {
      return obj.name === event;
    });

    this.municipals = dist[0].municipals;
  }


  municipChanged(event: any) {
    const municip = MUNICIPALITIES.filter(obj => {
      return obj.name === event;
    });

    this.wards = municip[0].wards;
  }


  loadProvincesForCountry(countryName: string) {
    // TODO check and remove
  }

}
