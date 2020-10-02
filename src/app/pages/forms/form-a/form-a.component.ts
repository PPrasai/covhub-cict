import { Component, OnDestroy, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs/operators';
import { FormACTData } from '../../../@models/cict/forms/form-a-ct-model';

import { TranslationServiceEn } from '../../../services/i18n/translation-gen.service';
import { ContactTracingService } from '../../case-tracing/contact-tracing.service';
import { StepState } from '../form.model';
import { FormAService } from './form-a.service';

@Component({
  selector: 'ngx-form-a',
  templateUrl: './form-a.component.html',
  styleUrls: ['./form-a.component.scss']
})
export class FormAComponent implements OnInit, OnDestroy {

  aForm: FormGroup;
  caseStatus: string;
  linearMode = true;
  formAOneTwo: StepState;
  formathree: StepState;

  @Output() formASaveEvent = new EventEmitter<FormACTData[]>();

  // TODO put all the translatable labels in the en.json file for now
  constructor(
    private fb: FormBuilder,
    private translator: TranslateService,
    public t: TranslationServiceEn,
    public formAService: FormAService,
    private contactTracingService: ContactTracingService
    ) {
    translator.use('en');
    translator.get(t.fab.thahaChhaina)
      .pipe(take(1))
      .subscribe((chhaina: string) => {
        this.caseStatus = chhaina;
      });


    this.formAOneTwo = this.deepState();
    this.formathree = this.deepState();

  }

  deepState: () => StepState = () => ({
    valid: true,
    reset: () => null
  })

  updateStep(input: any) {
    this.formAOneTwo.valid = false;
    console.log('step updated.\nreceived data:');
    console.log(input);
  }

  prevStep(_: any) {
    this.formathree.valid = true;
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {

    this.aForm = this.fb.group({
      name: '',
    });

    this.aForm.valueChanges.subscribe(this.formValueChanged);
  }

  changeCaseStatus(event: any) {
    this.caseStatus = event as string;
  }

  formValueChanged(formValue: any) {}

  newFormAData(data: FormACTData[]) {
    this.contactTracingService.addOne(data);
    this.formAService.prepareAllFormData();
  }

}
