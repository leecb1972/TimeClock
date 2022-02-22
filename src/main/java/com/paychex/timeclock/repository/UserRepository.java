package com.paychex.timeclock.repository;

import com.paychex.timeclock.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface UserRepository extends MongoRepository<User, Long> {

    @Query("{userId:'?0'}")
    User findUser(String userId);

//    @Query(value="{category:'?0'}", fields="{'name' : 1, 'quantity' : 1}")
//    List<User> findAll(String category);

    public long count();

}