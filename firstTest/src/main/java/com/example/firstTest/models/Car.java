package com.example.firstTest.models;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDate;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})

public class Car {
    public Car() {
        super();
    }

    public String getMatricule() {
        return matricule;
    }



    public void setMatricule(String matricule) {
        this.matricule = matricule;
    }

    public Car(String name, String type, byte[] picByte, Model model,String matricule,String creationYear,Float price,LocalDate date) {
        this.name = name;
        this.type = type;
        this.picByte = picByte;
        this.model=model;
        this.date=date;
        this.matricule=matricule;
        this.creationYear=creationYear;
        this.price=price;
    }
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    private LocalDate date;
    private Float price;

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    @Column(name = "name")
    private String name;
    @Column(name = "type")
    private String type;
    //image bytes can have large lengths so we specify a value
    //which is more than the default length for picByte column
    @Column(name = "picByte", length = 10000000)
    private byte[] picByte;

    public String getCreationYear() {
        return creationYear;
    }

    public void setCreationYear(String creationYear) {
        this.creationYear = creationYear;
    }

    @ManyToOne
    @JoinColumn(name = "model")
    private Model model;

    private String matricule;
    private String creationYear;

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public byte[] getPicByte() {
        return picByte;
    }
    public void setPicByte(byte[] picByte) {
        this.picByte = picByte;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Model getModel() {
        return model;
    }

    public void setBrand(Model model) {
        this.model = model;
    }
}


