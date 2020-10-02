import { Component, OnInit } from '@angular/core';
import { TranslationServiceEn } from '../../../../services/i18n/translation-gen.service';
import { COUNTRIES } from '../../../../@core/data/countries.geo';
import { PROVINCES } from '../../../../@core/data/province-districts.geo';
import { DISTRICTS } from '../../../../@core/data/district-municipals.geo';
import { MUNICIPALITIES } from '../../../../@core/data/municipal-wards.geo';

import { FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'cov-form-a-step-one-b',
  templateUrl: './form-a-step-one-b.component.html',
  styleUrls: ['./form-a-step-one-b.component.scss']
})
export class FormAStepOneBComponent implements OnInit {

  countries: string[];
  countryProvinces: string[];
  districts: any [];
  municipals: any [];
  wards: any [];

  constructor(public t: TranslationServiceEn) { }

  ngOnInit(): void {
    this.countries = COUNTRIES;
    this.countryProvinces = PROVINCES?.map(province => province.name);
    this.municipals = DISTRICTS?.map(district => district.name);
    this.wards = MUNICIPALITIES?.map(municip => municip.name);
  }

  changeCountry(event: any) {
    // TODO check and remove
  }

  form = new FormGroup({
    $key: new FormControl(null),
    country: new FormControl(null),
    province: new FormControl(null),
    district: new FormControl(null),
    municipality: new FormControl(null),
    ward: new FormControl(null)
  });

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
}
