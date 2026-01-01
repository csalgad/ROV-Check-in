
export enum CheckInStatus {
  Active = 'Active',
  Pending = 'Pending',
  Cancelled = 'Cancelled'
}

export interface VoterRecord {
  id: string;
  visitorId: string;
  checkInDate: string;
  checkInTime: string;
  checkInId: string;
  status: CheckInStatus;
}

export type ViewType = 'dashboard' | 'live-feed';
