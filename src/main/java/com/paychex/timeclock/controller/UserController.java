package com.paychex.timeclock.controller;

import com.paychex.timeclock.model.User;
import com.paychex.timeclock.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{userId}")
    public User findUser(@PathVariable("userId") String userId) {
        return userService.findUser(userId);
    }

    @PutMapping(value = "/{userId}")
    @Transactional
    public void updateUser(@PathVariable("userId") String userId, @RequestBody User user) {
        User existingUser = userService.findUser(userId);
        if(existingUser != null && existingUser.getUserId().equalsIgnoreCase(user.getUserId())){
            userService.updateUser(user);
        }
    }

    @PostMapping("/create")
    @Transactional
    public User create(@RequestBody User user) {
        return userService.createUser(user);
    }
}
