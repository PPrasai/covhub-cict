import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

import { COUNTRIES } from '../../../@core/data/countries.geo';
import { PROVINCES } from '../../../@core/data/province-districts.geo';
import { DISTRICTS } from '../../../@core/data/district-municipals.geo';
import { MUNICIPALITIES } from '../../../@core/data/municipal-wards.geo';

import { TranslationServiceEn } from '../../../services/i18n/translation-gen.service';
import { FormACTData } from '../../../@models/cict/forms/form-a-ct-model';
import { FormB1DataService } from '../../../services/db/form-b1-data.service';

@Component({
  selector: 'ngx-form-b1',
  templateUrl: './form-b1.component.html',
  styleUrls: ['./form-b1.component.scss']
})
export class FormB1Component implements OnInit {

  caseInfo: FormACTData;

  countries: string[];
  countryProvinces: string[];
  districts: any[];
  municipals: any[];
  wards: any[];

  form = new FormGroup({
    caseName: new FormControl(this.data.caseName),
    caseId: new FormControl(this.data.caseId),

    contactName: new FormControl(this.data.fname + ' ' + this.data.lname),
    caseRelation: new FormControl(this.data.caseRelation),
    contactAge: new FormControl(this.data.age),
    contactGender: new FormControl(this.data.gender),

    contactReligion: new FormControl(''),
    contactCaste: new FormControl(''),

    province: new FormControl(''),
    district: new FormControl(''),
    municipality: new FormControl(''),
    wardNum: new FormControl(''),
    tole: new FormControl(''),

    permCountry: new FormControl(''),
    permProvince: new FormControl(''),
    permDistrict: new FormControl(''),
    permMunicipality: new FormControl(''),
    permWardNum: new FormControl(''),
    permTole: new FormControl(''),

    currentLocationName: new FormControl(''),
    currentLocationPhone: new FormControl(''),
    alternativePhone: new FormControl(''),
    email: new FormControl(''),
    nationality: new FormControl(''),

    thirdPersonName: new FormControl(''),
    thirdPersonAge: new FormControl(''),
    thirdPersonAddress: new FormControl(''),
    thirdPersonCaseRelation: new FormControl(''),
    thirdPersonGender: new FormControl(''),
    thirdPersonPhone: new FormControl(''),

    contactTravelDuringQuarantine: new FormControl(''),
    contactTravelFromDate: new FormControl(''),
    contactTravelToDate: new FormControl(''),
    contactTravelRegion: new FormControl(''),
    contactTravelCities: new FormControl(''),

    contactWithCoronaPositive: new FormControl(''),
    contactWithCoronaPositiveDate: new FormControl(''),

    cboxStudent: new FormControl(false),
    cboxLabTech: new FormControl(false),
    cboxHealthWorker: new FormControl(false),
    cboxVet: new FormControl(false),
    cboxHospitality: new FormControl(false),
    cboxSanitation: new FormControl(false),
    cboxSecurity: new FormControl(false),
    cboxOther: new FormControl(false),
    cboxOtherSpecification: new FormControl(''),

    workPlaceName: new FormControl(''),
    workPlaceAddress: new FormControl(''),
    workPlacePhone: new FormControl(''),

    hwPost: new FormControl(''),
    hwOrgName: new FormControl(''),
    hwStation: new FormControl(''),
    hwUsePPE: new FormControl(''),
    hwUsePPEExplain: new FormControl(''),
    hwFirstContactDate: new FormControl(''),
    hwLastContactDate: new FormControl(''),
    hwAnyRelatedInfo: new FormControl(''),
    hwContactRelation: new FormControl(''),
    hwTypeOfExposure: new FormControl(''),

    cboxContactHome: new FormControl(false),
    cboxContactTransport: new FormControl(false),
    cboxContactSchool: new FormControl(false),
    cboxContactAamSabha: new FormControl(false),
    cboxContactOther: new FormControl(false),
    cboxContactOtherSpecification: new FormControl(''),
    nhwFirstContactDate: new FormControl(''),
    nhwLastContactDate: new FormControl(''),
    nhwAnyRelatedInfo: new FormControl(''),
    nhwTypeOfExposure: new FormControl(''),

    clinicalInfoSymptomatic: new FormControl(''),
    clinicalInfoSymptomaticAfterExposure: new FormControl(''),

    cboxPregnant: new FormControl(false),
    cboxRecentMother: new FormControl(false),
    cboxHeartDisease: new FormControl(false),
    cboxDiabetes: new FormControl(false),
    cboxLiverDisease: new FormControl(false),
    cboxNerveDisease: new FormControl(false),
    cboxKidneyDisease: new FormControl(false),
    cboxImmuneDisease: new FormControl(false),
    cboxHIV: new FormControl(false),
    cboxUnclear: new FormControl(false),
    cboxMalignancy: new FormControl(false),
    cboxLungDisease: new FormControl(false),
    cboxNoneDisease: new FormControl(false),
    cboxOtherDisease: new FormControl(false),

    cboxOtherDiseaseSpecification: new FormControl(''),
  });

  constructor(
    private translator: TranslateService,
    public t: TranslationServiceEn,
    @Inject(MAT_DIALOG_DATA) public data: FormACTData,
    private formService: FormB1DataService
    ) {
      this.caseInfo = this.data;
    translator.use('en');
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

  saveFormB1() {
    console.log('Saving Form B1');
    this.formService.addAll([this.form.value]).then(response => {
      console.log('CREATE FormB1 response received.');
      console.log(response);
    })
  }
}
