package com.example.firstTest.repository;

import com.example.firstTest.models.Brand;
import com.example.firstTest.models.Car;
import com.example.firstTest.models.Model;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Optional;

public interface ModelRepository extends JpaRepository<Model,Integer> {
Optional<Model> findByName(String name);
    @Query("Select m from Model m where m.brand.id = :brandId")
    Optional<Model[]> findByBrand(@Param("brandId") int brandId);
}
