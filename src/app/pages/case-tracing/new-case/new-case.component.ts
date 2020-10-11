import { Component, Inject, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ReplaySubject } from 'rxjs';

import { PROVINCES } from '../../../@core/data/province-districts.geo';
import { TranslationServiceEn } from '../../../services/i18n/translation-gen.service';
import { DialogData } from '../case.model';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { makeNewCaseFormModel, NewCaseFormeta, makeNewCaseFormGroup } from './new-case.formeta';
import { CaseService } from './case.service';

import { v1 } from 'uuid';



const OnDestroySubject = Symbol('OnDestroySubject');

@Component({
  selector: 'cov-new-case',
  templateUrl: './new-case.component.html',
  styleUrls: ['./new-case.component.scss']
})
export class NewCaseComponent implements OnInit, OnDestroy {


  provinces: string[];
  destinationOpts: string[] | undefined;
  addressOpts: string[] | undefined;
  finalDestProvince: string = '';
  districts = { destinationOpts: null, addressOpts: null };

  saveToCache = true;
  newTask: NewCaseFormeta = makeNewCaseFormModel();

  @Output() newCaseEvent = new EventEmitter<NewCaseFormeta>();

  private [OnDestroySubject] = new ReplaySubject<true>(1);

  showOtherOccupation = false;

  newCaseFormGroup: FormGroup;

  form: FormGroup = new FormGroup({
    _id: new FormControl(v1()),
    reportedDate: new FormControl(''),
    reportedInstitution: new FormControl(''),
    case: new FormControl(''),
    phoneNum: new FormControl(0),
    province: new FormControl(''),
    district: new FormControl(''),
    municipality: new FormControl(''),
    wardNumber: new FormControl(0),
    ward: new FormControl(0),
    tole: new FormControl(''),
    assignedTo: new FormControl(''),
    caseInvestigator: new FormControl('')
  })

  constructor(
    public t: TranslationServiceEn,
    private translator: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private newCaseService: CaseService
  ) {
      this.translator.use('en');
      this.createNewCaseForm();
  }

  ngOnInit() {
    this.provinces = PROVINCES?.map(province => province.name);
    this.createNewCaseForm();
  }

  ngOnDestroy(): void {
    this[OnDestroySubject].next(true);
    this[OnDestroySubject].complete();
  }

  get onDestroy$() {
    return this[OnDestroySubject].asObservable();
  }

  addNewTask(_: any) {
    this.saveToCache = false;
    this.newCaseEvent.emit(this.form.value);
    console.log('saving new case with _id: ', this.form.get('_id'));
  }

  changeDestProvince(event: string) {
    this.finalDestProvince = event;
    this.districts.destinationOpts = PROVINCES?.find(province => province.name === this.finalDestProvince)?.districts;
  }

  createNewCaseForm() {
    this.newCaseFormGroup = makeNewCaseFormGroup();
  }

}
