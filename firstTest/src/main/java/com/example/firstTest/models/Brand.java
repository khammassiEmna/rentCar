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

public class Brand {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    public int id;


    public List<Model> getModels() {
        return models;
    }

    public void setModels(List<Model> models) {
        this.models = models;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @NotNull
    public String name;




    @OneToMany(mappedBy = "brand")
    @JsonIgnore
      List<Model> models;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
