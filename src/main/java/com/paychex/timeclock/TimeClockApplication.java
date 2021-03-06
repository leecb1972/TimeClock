package com.paychex.timeclock;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;


@SpringBootApplication
public class TimeClockApplication  extends SpringBootServletInitializer
{
    public static void main(String[] args)
    {
        new TimeClockApplication().configure(new SpringApplicationBuilder(TimeClockApplication.class)).run(args);
    }


}