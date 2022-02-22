package com.paychex.timeclock.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "User")
public class User {
    @Id
    private String id;

    private Role role;

    private String firstName;

    private String lastName;

    @Indexed(unique=true)
    private String userId;

    List<Shift> workShifts;

    public User(String firstName, String lastName, String userId, Role role) {
        super();
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userId = userId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public List<Shift> getWorkShifts() {
        return workShifts;
    }

    public void setWorkShifts(List<Shift> workShifts) {
        this.workShifts = workShifts;
    }
}
