package com.example.firstTest.repository;

import com.example.firstTest.models.Car;
import com.example.firstTest.models.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public  interface CarRepository  extends JpaRepository<Car,Integer> {
    Optional<Car> findByName(String name);
    @Query(value="Select * from Car order by date desc limit 10",nativeQuery = true)
    List<Car> selectRecent();

    @Query("Select c from Car c where c.model.name like %:modelName% or c.model.brand.name like %:modelName%")
    Optional<List<Car>> findByModel(@Param("modelName") String modelName);

    @Query("Select c from Car c where c.model.name = :modelName")
    Optional<List<Car>> findByModelName(@Param("modelName") String modelName);

    @Query("Select c from Car c where c.model.name like %:modelName% or c.model.brand.name like %:modelName% order by c.date desc")
    Optional<List<Car>> findRecentByModel(@Param("modelName") String modelName);


    @Query("Select c from Car c where c.price < :price")
    List<Car> findByPrice(@Param("price") Float price);

    @Query(nativeQuery = true,value="Select * from Car c where c.price < :price order by c.date desc limit 10")
    List<Car> findNewByPrice(@Param("price") Float price);


}
