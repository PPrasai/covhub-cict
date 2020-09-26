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
  contactPhone: number
}
