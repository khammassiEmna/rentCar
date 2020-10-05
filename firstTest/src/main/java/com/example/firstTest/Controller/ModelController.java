package com.example.firstTest.Controller;
import com.example.firstTest.models.Car;
import com.example.firstTest.repository.CarRepository;
import org.springframework.http.ResponseEntity.BodyBuilder;


import com.example.firstTest.Exception.ResourceNotFoundException;
import com.example.firstTest.models.Brand;
import com.example.firstTest.models.Model;
import com.example.firstTest.repository.BrandRepository;
import com.example.firstTest.repository.ModelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/model")
public class ModelController  {
    @Autowired
    private ModelRepository modelRepo;
    @Autowired
    BrandRepository brandRepo;
    @Autowired
    CarRepository carRepo;
    @GetMapping("/all")
    public List<Model> getAllModels() {
        List<Model> models= modelRepo.findAll();
        if (models.isEmpty()){
            return null;
        }
        return models;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Model> getModelById(@PathVariable(value = "id") int modelId) throws ResourceNotFoundException {
        Model model =modelRepo.findById(modelId)
                .orElseThrow(() -> new ResourceNotFoundException("No Brand found with this id:: " + modelId));
        return ResponseEntity.ok().body(model);
    }

    @PostMapping("/add/{id}")
    public Model addModel(@PathVariable(value = "id") String brandId, @RequestBody Model model) throws IOException {
        int id=Integer.parseInt(brandId);

        Brand brand = brandRepo.getOne(id);


        ///////////////un truc consernant get et set de brand dans carEntity doit être vérifier
        Model model1=new Model(model.id, model.name, brand);
        return modelRepo.save(model1);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Model> updateModel(@PathVariable(value = "id") int modelId,
                                                @Valid @RequestBody Model modelDetails) throws ResourceNotFoundException {
        Model model = modelRepo.findById(modelId)
                .orElseThrow(() -> new ResourceNotFoundException("No brand found with this id :: " + modelId));
        model.setName(modelDetails.getName());
model.setBrand(modelDetails.getBrand());

        final Model updatedModel = modelRepo.save(model);
        return ResponseEntity.ok(updatedModel);
    }

    @DeleteMapping("/delete/{id}")
    public Boolean deleteModel(@PathVariable(value = "id") int modelId)
            throws ResourceNotFoundException {
        Model model = modelRepo.findById(modelId).get();
       Optional<List<Car>> cars=carRepo.findByModelName(model.name);
       if(cars.isPresent())
           return false;
modelRepo.delete(model);
       return true ;

    }
@GetMapping("/byBrand/{brandId}")
    public Boolean getByBrand(@PathVariable("brandId") int id){
        Optional<Model[]> models=modelRepo.findByBrand(id);
        if(models.isPresent()){return true;}
        return false;
}

@GetMapping("byName/{modelName}")
    public Boolean getByName(@PathVariable("modelName")String modelName)
{
    Optional<Model> model=modelRepo.findByName(modelName);
    return (model.isPresent());
}
}
