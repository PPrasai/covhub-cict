export enum FormACTDataMeetLocation {
  HOME = "HOME",
  TRANSPORT = "TRANSPORT",
  HOSPITAL = "HOSPITAL",
  SCHOOL = "SCHOOL",
  OFFICE = "OFFICE",
  CROWD = "CROWD",
  OTHER = "OTHER"
}

export enum FormACTDataContactIntimacy {
  CLOSE = "CLOSE",
  CASUAL = "CASUAL"
}

export interface FormACTData {
  caseId?: string,
  caseName: string,
  sno: string,
  fname: string,
  lname: string,
  gender: string,
  age: string,
  caseRelation: string,
  contactMeetLocation: FormACTDataMeetLocation,
  lastContactDate: Date,
  contactType: FormACTDataContactIntimacy,
  contactAddress: string,
  contactPhone: number,
  creationDate: Date,
  fuDate1?: Date,
  fuDate2?: Date,
  fuDate3?: Date,
  fuDate4?: Date,
  fuDate5?: Date,
}
