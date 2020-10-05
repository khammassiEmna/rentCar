package com.example.firstTest.repository;

import com.example.firstTest.models.Car;
import com.example.firstTest.models.Reservation;
import com.example.firstTest.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Integer> {
Optional<User> findByUserName(String userName);
Boolean existsByUserName(String username);
    @Query("Select u from User u where u.userName = :username and u.password = :password ")
   Optional<User> findByUserNameAndPassword(String username,String password);
    @Query("Select u from User u where u.roles='user'")
    List<User> findClient();
}
