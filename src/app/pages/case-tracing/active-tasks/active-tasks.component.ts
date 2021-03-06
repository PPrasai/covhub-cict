import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { ActiveTasksService } from '../active-tasks.service';
import { NewCaseFormeta } from '../new-case/new-case.formeta';

import { FormAComponent } from '../../forms/form-a/form-a.component';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { TranslationServiceEn } from '../../../services/i18n/translation-gen.service';

import { v1, v3, v4, v5 } from 'uuid';

@Component({
  selector: 'cov-active-tasks',
  templateUrl: './active-tasks.component.html',
  styleUrls: ['./active-tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveTasksComponent implements OnInit {

  displayedColumns = ['case', 'assignedTo', 'time'];

  constructor(
    public activeTasksService: ActiveTasksService,
    private t: TranslationServiceEn,
    private translationService: TranslateService,
    public dialog: MatDialog) {}

  ngOnInit(): void { }

  createNewTask(task: NewCaseFormeta) {
    this.activeTasksService.addOne(task);
  }

  showFormAWindow(event, case_id) {
    console.log(case_id);
    const dialogRef = this.dialog.open(FormAComponent,
      {
        width: '80vw',
        height: '90vh',
        data: {
          title: this.translationService.get(this.t.fb.addNewCase),
          newId: case_id
        }
      }
    );

    return false;
  }
}
