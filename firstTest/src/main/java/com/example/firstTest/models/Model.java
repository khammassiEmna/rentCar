package com.example.firstTest.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})

public class Model {

    public String getName() {
        return name;
    }

    public Brand getBrand() {
        return brand;
    }

    public void setBrand(Brand brand) {
        this.brand = brand;
    }

    public void setName(String name) {
        this.name = name;
    }

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    public int id;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @NotNull
    public String name;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brand")
    private Brand brand;

    @OneToMany(mappedBy = "model")
    @JsonIgnore
    List<Car> cars;

    public List<Car> getCars() {
        return cars;
    }

    public Model(int id,String name, Brand brand) {
        this.id=id;
        this.name=name;
        this.brand=brand;
    }

    public void setCars(List<Car> cars) {
        this.cars = cars;
    }
}
