import { Component, OnInit, Input } from '@angular/core';
import { TranslationServiceEn } from '../../../../services/i18n/translation-gen.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'cov-form-a-step-three',
  templateUrl: './form-a-step-three.component.html',
  styleUrls: ['./form-a-step-three.component.scss']
})
export class FormAStepThreeComponent implements OnInit {

  constructor(public t: TranslationServiceEn) { }

  form = new FormGroup({
    $key: new FormControl(null),
    rbNasopharyngeal: new FormControl(''),
    sampleCollectionDate: new FormControl(''),
    sampleDispatchDate: new FormControl(''),
    labTestResultDate: new FormControl(''),
    labTestResult: new FormControl(''),

    rbOropharyngeal: new FormControl(''),
    oropharyngealSampleCollectionDate: new FormControl(''),
    oropharyngealSampleDispatchDate: new FormControl(''),
    oropharyngealLabTestResultDate: new FormControl(''),
    oropharyngealLabTestResult: new FormControl(''),

    rbOther: new FormControl(''),
    otherSampleCollectionDate: new FormControl(''),
    otherSampleDispatchDate: new FormControl(''),
    otherLabTestResultDate: new FormControl(''),
    otherLabTestResult: new FormControl(''),
    otherTestSpecification: new FormControl(''),

    rbLabType: new FormControl(''),
    rbAnyOtherTestLab: new FormControl(''),
    ifYesTestName: new FormControl(''),
    ifYesTestResult: new FormControl('')
  });
  ngOnInit(): void {
  }

}
