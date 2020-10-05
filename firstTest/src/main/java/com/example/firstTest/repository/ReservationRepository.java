package com.example.firstTest.repository;


import com.example.firstTest.models.Car;
import com.example.firstTest.models.Reservation;
import com.example.firstTest.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation,Integer> {
    @Query("Select r from Reservation r where r.confirmed IS NULL")
    List<Reservation> notConfirmed();

    @Query("Select r from Reservation r where r.car = :car and r.dateDeb <= :dateDeb and r.dateFin >= :dateDeb and r.confirmed IS NOT NULL")
    Optional<Reservation> findByCarAndDate(@Param("car") Car car, @Param("dateDeb") LocalDate dateDeb);

    @Query("Select r from Reservation r where r.car.id = :carId and r.dateDeb >= :currentDate")
    Optional<Reservation[]> findByCar(@Param("carId") int carId, @Param("currentDate") LocalDate currentDate);

    @Query("Select r from Reservation r where r.dateDeb = :currentDate and r.confirmed IS NOT NULL")
     List<Reservation> reserOfTheDay(@Param("currentDate") LocalDate currentDate);

    @Query("Select r from Reservation r where r.dateFin = :currentDate and r.confirmed IS NOT NULL")
    List<Reservation> returnOfTheDay(@Param("currentDate") LocalDate currentDate);

    @Query("Select r from Reservation r where r.dateDeb > :currentDate and r.confirmed IS NOT NULL")
     List<Reservation> getNext(@Param("currentDate") LocalDate currentDate);


    @Query("Select r from Reservation r where r.dateFin < :currentDate and r.confirmed IS NOT NULL")
    List<Reservation> getOld(@Param("currentDate") LocalDate currentDate);

    @Query("Select r from Reservation r where r.user = :user")
    List<Reservation> getByUser(@Param("user") User user);

}
