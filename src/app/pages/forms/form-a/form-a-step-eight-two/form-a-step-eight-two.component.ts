import { Component, OnInit } from '@angular/core';
import { TranslationServiceEn } from '../../../../services/i18n/translation-gen.service';
import { FormControl, FormGroup } from '@angular/forms';
import { TbodyCreateCancelComponent } from 'ng2-smart-table/lib/components/tbody/cells/create-cancel.component';
import { FormAService } from '../form-a.service';

@Component({
  selector: 'cov-form-a-step-eight-two',
  templateUrl: './form-a-step-eight-two.component.html',
  styleUrls: ['./form-a-step-eight-two.component.scss']
})
export class FormAStepEightTwoComponent implements OnInit {

  today = new Date()
  todayString: string;
  form: FormGroup;

  constructor(public t: TranslationServiceEn, public formAService: FormAService) {
    this.todayString = this.today.getFullYear().toString() + '/';
    this.todayString += (this.today.getMonth() + 1).toString() + '/';
    this.todayString += this.today.getDate().toString();

    this.createFormGroup();

    this.formAService.newFormFlag$.subscribe(flag => {
      if (flag) {
        console.log('STEP 8: prepare data instruction received');
        this.formAService.aggregateFormData(this.form);
      }
    });
  }

  createFormGroup() {
    this.form = new FormGroup({
      $key: new FormControl(null),
      name: new FormControl(''),
      phone: new FormControl(''),
      organization: new FormControl(''),
      email: new FormControl(''),
      completeDate: new FormControl(this.todayString)
    });
  }

  ngOnInit(): void {
  }

}
