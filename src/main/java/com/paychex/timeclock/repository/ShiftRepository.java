package com.paychex.timeclock.repository;

import com.paychex.timeclock.model.Shift;

import java.util.List;

public interface ShiftRepository {

   void updateShift(String userId,  List<Shift> workShifts);

}