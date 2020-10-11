import { Injectable } from '@angular/core';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { ContactTracingInfo } from '../../@core/data/contact-tracing';
import { ContactTracingDataSerivce } from '../../services/db/contact-tracing-data.service';
import { FormACTData } from '../../@models/cict/forms/form-a-ct-model';


@Injectable({
  providedIn: 'root'
})
export class ContactTracingService {
  private contactTracingInfoData: FormACTData[] = [];

  private contactTracingInfoData$: BehaviorSubject<FormACTData[]>

  constructor(private dataService: ContactTracingDataSerivce) {
    this.contactTracingInfoData$ = new BehaviorSubject(this.contactTracingInfoData)
    this.dataService.getAll().then(data => {
      if (data.rows.length > 0) {
        data.rows.forEach(row  => {
          this.contactTracingInfoData$.next([...this.contactTracingInfoData$.getValue(), ... [this.flatten(row.doc) as unknown as FormACTData]]);
        });
      }
    })
  }

  flatten(obj: any) {
    return Object.keys(obj).reduce((acc, current) => {
      const key = `${current}`;
      const currentValue = obj[current];
      if (Array.isArray(currentValue) || Object(currentValue) === currentValue) {
        Object.assign(acc, this.flatten(currentValue));
      } else {
        acc[key] = currentValue;
      }
      return acc;
    }, {});
  };

  getContactTracingData(): Observable<FormACTData[]> {
    return this.contactTracingInfoData$.asObservable();
  }

  addOne(contact: FormACTData[]) {

    if (contact.length > 0){
      contact.forEach(c => {
        this.contactTracingInfoData$.next([...this.contactTracingInfoData$.getValue(), ...[{
          caseId: c.caseId || null,
          sno: c.sno,
          fname: c.fname,
          lname: c.lname,
          gender: c.gender,
          age: c.age,
          caseRelation: c.caseRelation,
          contactMeetLocation: c.contactMeetLocation,
          lastContactDate: c.lastContactDate,
          contactType: c.contactType,
          contactAddress: c.contactAddress,
          contactPhone: c.contactPhone
        }] as FormACTData[] ]);
      });
    }
  }
}
