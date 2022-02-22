package com.paychex.timeclock.service;

import com.paychex.timeclock.model.User;
import com.paychex.timeclock.repository.ShiftRepository;
import com.paychex.timeclock.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Component
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ShiftRepository shiftRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User findUser(String userId) {
        if (userId != null && !userId.trim().isEmpty()) {
            return userRepository.findUser(userId);
        }

        return null;
    }

    @Transactional
    public void updateUser(User user) {
        if (user != null) {
            User existing = userRepository.findUser(user.getUserId());
            if(existing  != null) {
                userRepository.delete(existing);
            }
            BeanUtils.copyProperties(user, existing);
            userRepository.save(existing);
        }
    }

    @Transactional
    public User createUser(User user) {
        userRepository.save(user);
        return this.findUser(user.getUserId());
    }
}
