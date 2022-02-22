package com.paychex.timeclock.repository;

import com.mongodb.client.result.UpdateResult;
import com.paychex.timeclock.model.Shift;
import com.paychex.timeclock.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ShiftRepositoryImpl implements ShiftRepository {

    @Autowired
    MongoTemplate mongoTemplate;


    public void updateShift(String userId,  List<Shift> workShifts) {
        Query query = new Query(Criteria.where("userId").is(userId));
        Update update = new Update();
        update.set("workShifts", workShifts);

        UpdateResult result = mongoTemplate.updateFirst(query, update, User.class);

        if(result == null)
            System.out.println("No documents updated");
        else
            System.out.println(result.getModifiedCount() + " document(s) updated..");

    }

}