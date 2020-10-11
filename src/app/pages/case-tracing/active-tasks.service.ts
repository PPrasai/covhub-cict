import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActiveTasksInfo } from './case.model';
import { CaseService } from './new-case/case.service';
import { NewCaseFormeta } from './new-case/new-case.formeta';

@Injectable({
  providedIn: 'root'
})
export class ActiveTasksService {


  private activeTasksInfoArr: ActiveTasksInfo[] = [];

  private activeTasksInfoData$: BehaviorSubject<ActiveTasksInfo[]>;

  constructor(
    private caseService: CaseService
  ) {
    this.activeTasksInfoData$ = new BehaviorSubject(this.activeTasksInfoArr);

    this.caseService.getAll().then(data => {
      data.rows.forEach(row => {
        // console.log(row);
        this.activeTasksInfoData$.next([...this.activeTasksInfoData$.getValue(), ... [row.doc as unknown as ActiveTasksInfo]]);
      });
    })

    this.caseService.getChangeListener().subscribe(change => {
      let noItem = this.activeTasksInfoData$.getValue().filter(value => {
        return change.change.docs[0]._id != value['_id']
      });

      this.activeTasksInfoData$.next([change.change.docs[0]].concat(noItem) as ActiveTasksInfo[]);
    })
  }

  getActiveTasksData(): Observable<ActiveTasksInfo[]> {
    return this.activeTasksInfoData$.asObservable();
  }

  addOne(task: NewCaseFormeta) {
    this.activeTasksInfoData$.next([...this.activeTasksInfoData$.getValue(), ...[{
      case: task.case,
      caseInvestigator: task.caseInvestigator,
      time: Math.round((new Date().getTime() - task.reportedDate.getTime()) / 1000 / 60 / 60).toString() + ' Hr.',
      caseId: task._id,
      formId: task.formId
    }]]);

    this.caseService.addAll(task);
  }
}
