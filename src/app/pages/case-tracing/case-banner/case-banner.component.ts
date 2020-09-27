import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActiveTasksCacheService } from '../../../@core/data/active-tasks-cache';
import { NewCaseComponent } from '../new-case/new-case.component';
import { TranslationServiceEn } from '../../../services/i18n/translation-gen.service';
import { TranslateService } from '@ngx-translate/core';
import { NewCaseFormeta } from '../new-case/new-case.formeta';


@Component({
  selector: 'cov-case-banner',
  templateUrl: './case-banner.component.html',
  styleUrls: ['./case-banner.component.scss']
})
export class CaseBannerComponent implements OnInit {

  activeTasksCacheService = new ActiveTasksCacheService();
  constructor(
    public dialog: MatDialog,
    private t: TranslationServiceEn,
    private translationService: TranslateService
  ) { }

  @Output() newCaseEvent = new EventEmitter<NewCaseFormeta>();

  ngOnInit(): void { }

  showNewCaseWindow(): boolean {
    const dialogRef = this.dialog.open(NewCaseComponent,
      {
        width: '60vw',
        data: {
          title: this.translationService.get(this.t.fb.addNewCase),
          newId: '12321'
        }
      }
    );

    dialogRef.componentInstance.newCaseEvent.subscribe((receivedEntry) => {
      this.newCaseEvent.emit(receivedEntry);
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
    return false;   // stop event propagation for <a> tag
  }

  showSettingsWindow(): boolean {
    return false;   // stop event propagation for <a> tag
  }

}
