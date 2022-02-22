import {Role} from './Role';
import {Shift} from './Shift';

export interface User {
  firstName: string;
  lastName: string;
  userId: string;
  role?: Role;
  workShifts?: Shift[];
}
