import {formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { some } from 'lodash';
import {Shift} from '../model/Shift';
import {User} from '../model/User';
import {UserService} from '../user.service';

@Component({
  selector: `work-shift`,
  styleUrls: ['./work-shift.component.scss'],
  templateUrl: './work-shift.component.html',
})

export class WorkShiftComponent implements OnInit {

  user: User;
  workShiftForm: FormGroup;
  registerTriggered: boolean;
  searchTriggered: boolean;
  allowRegister: boolean;

  ngOnInit(): void {}

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) {
    this.workShiftForm = this.formBuilder.group({
      datePicker: [null, null],
      licenseType: [null, null],
      userId: [null, [Validators.required, Validators.minLength(2)]],
      username: [null, null],
    });
  }

  get userIdCtrl(): AbstractControl { return this.workShiftForm.get('userId'); }

  get hasActiveShift(): boolean {
    return this.user.workShifts !== null && some(this.user.workShifts, (s) => s.endTime === null);
  }

  get hasActiveBreak(): boolean {
    if (this.hasActiveShift) {
      const activeWorkShift: Shift = this.user.workShifts.filter((s) => !s.endTime)[0];
      return activeWorkShift.breaks !== null && some(activeWorkShift.breaks, (b) => b.endTime === null);
    }
    return false;
  }

  get hasActiveLunchBreak(): boolean {
    if (this.hasActiveShift) {
      const activeWorkShift: Shift = this.user.workShifts.filter((s) => !s.endTime)[0];
      return activeWorkShift.lunchBreaks !== null && some(activeWorkShift.lunchBreaks, (b) => b.endTime === null);
    }
    return false;
  }

  get formattedNewDate(): string {
    const startBreakTime = formatDate(new Date(), 'yyyy-MM-ddTHH:mm:ss', 'en-US');
    return startBreakTime.toString().substring(0, 19);
  }

  protected showDateTime(dateTime: string): string {
    return dateTime ? dateTime.substring(0, 19).replace('T', ' ') : 'N/A';
  }

  protected startWorkShift() {
    const newWorkShift: Shift = {
      endTime: null,
      startTime: this.formattedNewDate,
    };

    const workShifts =  this.user.workShifts ? this.user.workShifts : [];
    workShifts.push(newWorkShift);

    this.updateWorkShift(newWorkShift);
  }

  stopWorkShift() {
    let activeWorkShift: Shift = this.user.workShifts.filter((s) => !s.endTime)[0];
    activeWorkShift = {
       ...activeWorkShift,
       endTime: this.formattedNewDate,
       startTime: activeWorkShift.startTime.substring(0, 19),
    };

    this.updateWorkShift(activeWorkShift);
  }

  startBreak() {
    let activeWorkShift: Shift = this.user.workShifts.filter((s) => !s.endTime)[0];

    // Build new break
    const newBreak: Shift = {
      endTime: null,
      startTime: this.formattedNewDate,
    };

    // Update shift
    const breaks: Shift[] = activeWorkShift.breaks ? activeWorkShift.breaks : [];
    breaks.push(newBreak);
    activeWorkShift = {
      ...activeWorkShift,
      breaks,
    };

    this.updateWorkShift(activeWorkShift);
  }

  stopBreak() {
    // Update break
    let activeWorkShift: Shift = this.user.workShifts.filter((s) => !s.endTime)[0];
    let currentBreak: Shift = activeWorkShift.breaks.filter((b) => !b.endTime)[0];
    currentBreak = {
      endTime: this.formattedNewDate,
      startTime: currentBreak.startTime.substring(0, 19),
    };

    // Update shift
    const breaks: Shift[] = activeWorkShift.breaks.filter((b) => b.endTime);
    breaks.push(currentBreak);
    activeWorkShift = {
      ...activeWorkShift,
      breaks,
    };

    this.updateWorkShift(activeWorkShift);
  }

  startLunchBreak() {
    let activeWorkShift: Shift = this.user.workShifts.filter((s) => !s.endTime)[0];

    // Build new lunch break
    const newLunchBreak: Shift = {
      endTime: null,
      startTime: this.formattedNewDate,
    };

    // Update shift
    const lunchBreaks: Shift[] = activeWorkShift.lunchBreaks ? activeWorkShift.lunchBreaks : [];
    lunchBreaks.push(newLunchBreak);
    activeWorkShift = {
      ...activeWorkShift,
      lunchBreaks,
    };

    this.updateWorkShift(activeWorkShift);
  }

  stopLunchBreak() {
    // Update lunch break
    let activeWorkShift: Shift = this.user.workShifts.filter((s) => !s.endTime)[0];
    let activeLunchBreak: Shift = activeWorkShift.lunchBreaks.filter((b) => !b.endTime)[0];
    activeLunchBreak = {
      endTime: this.formattedNewDate,
      startTime: activeLunchBreak.startTime.substring(0, 19),
    };

    // Update shift
    const lunchBreaks: Shift[] =  activeWorkShift.lunchBreaks.filter((b) => b.endTime);
    lunchBreaks.push(activeLunchBreak);
    activeWorkShift = {
      ...activeWorkShift,
      lunchBreaks,
    };

    this.updateWorkShift(activeWorkShift);
  }

  search() {
    this.registerTriggered = false;
    this.searchTriggered = true;

    if (this.userIdCtrl.value && this.userIdCtrl.value.length > 2) {
      this.userService.getUser(this.userIdCtrl.value).subscribe(
        (user) => {
          this.user = user;
          this.allowRegister = !user;
        });
    }
  }

  register() {
    this.registerTriggered = true;
    this.searchTriggered = false;
    this.allowRegister = false;
  }

  private updateWorkShift(workShift: Shift) {
    const workShifts: Shift[] =
      this.user.workShifts ? this.user.workShifts.filter((s) => s.endTime !== null) : [];
    workShifts.push(workShift);

    // Update User
    this.user = {
      ...this.user,
      workShifts,
    };
    this.userService.updateUser(this.user);
  }

}
