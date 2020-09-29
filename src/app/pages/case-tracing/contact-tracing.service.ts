import { Injectable } from '@angular/core';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { ContactTracingInfo } from '../../@core/data/contact-tracing';
import { FormACTData } from '../../@models/cict/forms/form-a-ct-model';


@Injectable({
  providedIn: 'root'
})
export class ContactTracingService {
  private contactTracingInfoData: ContactTracingInfo[] = [
    // {
    //   contact: 'Ram Thapa', assignedTo: 'Mrs. Y', case: 'Ram Thapa', followup: 'Mr. Z',
    //   followupDate1: '2020-09-05', followupDate2: '2020-09-08', followupDate3: '2020-09-11',
    //   followupDate4: '2020-09-15', followupDate5: '2020-09-20'
    // },
    // {
    //   contact: 'Hari Bahadur', assignedTo: 'Mrs. Y', case: 'Ram Thapa', followup: 'Mr. Z',
    //   followupDate1: '2020-09-05', followupDate2: '2020-09-08', followupDate3: '2020-09-11',
    //   followupDate4: '2020-09-15', followupDate5: '2020-09-20'
    // },
    // {
    //   contact: 'Hari Bahadur', assignedTo: 'Mrs. Y', case: 'Ram Thapa', followup: 'Mr. Z',
    //   followupDate1: '2020-09-05', followupDate2: '2020-09-08', followupDate3: '2020-09-11',
    //   followupDate4: '2020-09-15', followupDate5: '2020-09-20'
    // },
    // {
    //   contact: 'Hari Bahadur', assignedTo: 'Mrs. Y', case: 'Ram Thapa', followup: 'Mr. Z',
    //   followupDate1: '2020-09-05', followupDate2: '2020-09-08', followupDate3: '2020-09-11',
    //   followupDate4: '2020-09-15', followupDate5: '2020-09-20'
    // },
    // {
    //   contact: 'Hari Bahadur', assignedTo: 'Mrs. Y', case: 'Ram Thapa', followup: 'Mr. Z',
    //   followupDate1: '2020-09-05', followupDate2: '2020-09-08', followupDate3: '2020-09-11',
    //   followupDate4: '2020-09-15', followupDate5: '2020-09-20'
    // },
    // {
    //   contact: 'Hari Bahadur', assignedTo: 'Mrs. Y', case: 'Ram Thapa', followup: 'Mr. Z',
    //   followupDate1: '2020-09-05', followupDate2: '2020-09-08', followupDate3: '2020-09-11',
    //   followupDate4: '2020-09-15', followupDate5: '2020-09-20'
    // }
  ];

  private contactTracingInfoData$: BehaviorSubject<ContactTracingInfo[]>

  constructor() {
    this.contactTracingInfoData$ = new BehaviorSubject(this.contactTracingInfoData)
  }

  getContactTracingData(): Observable<ContactTracingInfo[]> {
    return this.contactTracingInfoData$.asObservable();
  }

  addOne(contact: FormACTData[]) {

    contact.forEach(c => {
      this.contactTracingInfoData$.next([...this.contactTracingInfoData$.getValue(), ...[{
        contact: c.fname + ' ' + c.lname,
        assignedTo: "Some investigator",
        case: "The case",
        followup: "Mr Follow up guy",
        followupDate1: "some date",
        followupDate2: "some date",
        followupDate3: "some date",
        followupDate4: "some date",
        followupDate5: "some date"
      }]]);
    });
  }
}
