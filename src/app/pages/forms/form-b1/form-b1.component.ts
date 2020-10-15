import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';


import { TranslationServiceEn } from '../../../services/i18n/translation-gen.service';
import { FormACTData } from '../../../@models/cict/forms/form-a-ct-model';

@Component({
  selector: 'ngx-form-b1',
  templateUrl: './form-b1.component.html',
  styleUrls: ['./form-b1.component.scss']
})
export class FormB1Component implements OnInit {

  caseInfo: FormACTData;

  form = new FormGroup({
    caseName: new FormControl(this.data.caseName),
    caseId: new FormControl(this.data.caseId),

    contactName: new FormControl(this.data.fname + ' ' + this.data.lname),
    caseRelation: new FormControl(this.data.caseRelation),
    contactAge: new FormControl(this.data.age),
    contactGender: new FormControl(this.data.gender),

    contactReligion: new FormControl(''),
    contactCaste: new FormControl(''),

    country: new FormControl(''),
    province: new FormControl(''),
    district: new FormControl(''),
    municipality: new FormControl(''),
    wardNum: new FormControl(''),
    tole: new FormControl(''),

    currentLocationName: new FormControl(''),
    currentLocationPhone: new FormControl(''),
    alternativePhone: new FormControl(''),
    email: new FormControl(''),
    nationality: new FormControl(''),
  });

  constructor(
    private translator: TranslateService,
    public t: TranslationServiceEn,
    @Inject(MAT_DIALOG_DATA) public data: FormACTData
    ) {
    translator.use('en');
  }

  ngOnInit(): void { }

}
