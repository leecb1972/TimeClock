package com.paychex.timeclock.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;
import java.util.List;

public class Shift {
    @Id
    private String id;

    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss[.SSS][.SS][.S]")
    LocalDateTime startTime;

    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss[.SSS][.SS][.S]")
    LocalDateTime endTime;

    List<Shift> breaks;
    List<Shift> lunchBreaks;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public List<Shift> getBreaks() {
        return breaks;
    }

    public void setBreaks(List<Shift> breaks) {
        this.breaks = breaks;
    }

    public List<Shift> getLunchBreaks() {
        return lunchBreaks;
    }

    public void setLunchBreaks(List<Shift> lunchBreaks) {
        this.lunchBreaks = lunchBreaks;
    }
}
