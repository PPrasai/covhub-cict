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
import { FormB2Component } from '../../forms/form-b2/form-b2.component';

@Component({
  selector: 'cov-contact-tracing',
  templateUrl: './contact-tracing.component.html',
  styleUrls: ['./contact-tracing.component.scss']
})
export class ContactTracingComponent implements OnInit, OnDestroy {

  displayedColumns = [];
  data: FormACTData[];
  dataSourceSub: Subscription;
  dataSource$: Observable<FormACTData[]>;

  firstFollowupDay = false;
  secondFollowupDay = false;
  thirdFollowupDay = false;
  forthFollowupDay = false;
  fifthFollowupDay = false;

  constructor(
    public contactTracingService: ContactTracingService,
    private t: TranslationServiceEn,
    private translationService: TranslateService,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource$ = this.contactTracingService.getContactTracingData();

    this.dataSourceSub = this.dataSource$.subscribe(data => {
      if (data.length > 0) {
        data.map(d => {

          let crDate = new Date(d.creationDate).getDate() + 3;

          let isToday = (day: Date) => {
            let today = new Date();
            if (
              today.getDate() == day.getDate() &&
              today.getMonth() == day.getMonth() &&
              today.getFullYear() == day.getFullYear()
            ) return true;

            return false;
          }

          d.fuDate1 = new Date(new Date().setDate(crDate));
          this.firstFollowupDay = isToday(d.fuDate1) ;

          d.fuDate2 = new Date(new Date().setDate(crDate + 2));
          this.secondFollowupDay = isToday(d.fuDate2) ;

          d.fuDate3 = new Date(new Date().setDate(crDate + 4));
          this.thirdFollowupDay = isToday(d.fuDate3) ;

          d.fuDate4 = new Date(new Date().setDate(crDate + 6));
          this.forthFollowupDay = isToday(d.fuDate4) ;

          d.fuDate5 = new Date(new Date().setDate(crDate + 8));
          this.fifthFollowupDay = isToday(d.fuDate5) ;
        });

        this.data = data;
        // this.displayedColumns = Object.keys(data[0]);
        this.displayedColumns = ['contact_name', 'followup', 'fuDate1', 'fuDate2', 'fuDate3', 'fuDate4', 'fuDate5', 'case'];
      }
    });
  }

  ngOnDestroy(): void {
    this.dataSourceSub .unsubscribe();
  }

  showFormB1Window(_, index) {
    const dialogRef = this.dialog.open(FormB1Component,
      {
        width: '80vw',
        height: '90vh',
        data: this.data[index]
      }
    );

    return false;
  }

  showFormB2Window(_, index) {
    const dialogRef = this.dialog.open(FormB2Component,
      {
        width: '80vw',
        height: '90vh',
        data: this.data[index]
      }
    );

    return false;
  }
}
