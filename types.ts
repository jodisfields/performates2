export interface Attendee {
  firstName: string;
  lastName: string;
  email: string;
  agencyOrBrand: string;
  role: string;
}

export enum EventStatus {
  IDLE = 'idle',
  SUBMITTING = 'submitting',
  SUCCESS = 'success',
  ERROR = 'error'
}