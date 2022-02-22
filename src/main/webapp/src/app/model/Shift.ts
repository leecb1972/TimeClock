export interface Shift {
  startTime: string;
  endTime: string;

  breaks?: Shift[];
  lunchBreaks?: Shift[];
}
