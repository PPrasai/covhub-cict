import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContactTracingInfo } from '../../../@core/data/contact-tracing';
import { takeWhile } from 'rxjs/operators';
import { ContactTracingService } from '../contact-tracing.service';
import { MatDialog } from '@angular/material/dialog';
import { FormB1Component } from '../../forms/form-b1/form-b1.component';
import { TranslateService } from '@ngx-translate/core';
import { TranslationServiceEn } from '../../../services/i18n/translation-gen.service';
import { Observable, Subscription } from 'rxjs';
import { FormACTData } from '../../../@models/cict/forms/form-a-ct-model';

@Component({
  selector: 'cov-contact-tracing',
  templateUrl: './contact-tracing.component.html',
  styleUrls: ['./contact-tracing.component.scss']
})
export class ContactTracingComponent implements OnInit, OnDestroy {

  displayedColumns = [];
  data: FormACTData[];
  dataSource$: Observable<FormACTData[]>;

  constructor(
    public contactTracingService: ContactTracingService,
    private t: TranslationServiceEn,
    private translationService: TranslateService,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource$ = this.contactTracingService.getContactTracingData();

    this.dataSource$.subscribe(data => {
      if (data.length > 0) {
        this.data = data;
        console.log(data);
      }
    });
  }

  ngOnDestroy(): void {
    // this.dataSub$.unsubscribe();
  }

  showFormB1Window(event) {
    const dialogRef = this.dialog.open(FormB1Component,
      {
        width: '80vw',
        height: '90vh',
        data: {
          title: this.translationService.get(this.t.fb.addNewCase),
          newId: '12345'
        }
      }
    );

    return false;
  }
}
