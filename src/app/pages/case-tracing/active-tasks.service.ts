import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActiveTasksInfo } from './case.model';
import { CaseService } from './new-case/case.service';
import { NewCaseFormeta } from './new-case/new-case.formeta';

@Injectable({
  providedIn: 'root'
})
export class ActiveTasksService {


  private activeTasksInfoArr: ActiveTasksInfo[] = [
    // {
    //   case: 'Ram Thapa',
    //   caseInvestigator: 'Dr. Hari Bahadur',
    //   time: '3 Hr.'
    // },
    // {case
    //   time: '2 Hr.'
    // },
    // {
    //   case: 'Bipin Sitaula',
    //   caseInvestigator: 'Dr. Nirmala KC',
    //   time: '1 Hr.'
    // },
    // {
    //   case: 'Jiwan Bista',
    //   caseInvestigator: 'Dr. Ram Krishna Dhakal',
    //   time: '6 Hr.'
    // }
  ];

  private activeTasksInfoData$: BehaviorSubject<ActiveTasksInfo[]>;

  constructor(
    private caseService: CaseService
  ) {
    this.activeTasksInfoData$ = new BehaviorSubject(this.activeTasksInfoArr);
    this.caseService.getAll().then(data => {
      data.rows.forEach(row => {
        console.log('************')
        console.log(row.doc);
        this.activeTasksInfoData$.next([...this.activeTasksInfoData$.getValue(), ... [row.doc as unknown as ActiveTasksInfo]]);
      });
    })
  }

  getActiveTasksData(): Observable<ActiveTasksInfo[]> {
    return this.activeTasksInfoData$.asObservable();
  }

  addOne(task: NewCaseFormeta) {
    this.activeTasksInfoData$.next([...this.activeTasksInfoData$.getValue(), ...[{
      case: task.case,
      caseInvestigator: task.caseInvestigator,
      time: Math.round((new Date().getTime() - task.reportedDate.getTime()) / 1000 / 60 / 60).toString() + ' Hr.'
    }]]);

    this.caseService.addAll(task);  }
}
