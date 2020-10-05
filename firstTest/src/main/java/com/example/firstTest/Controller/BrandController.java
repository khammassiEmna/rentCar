package com.example.firstTest.Controller;


import com.example.firstTest.Exception.ResourceNotFoundException;
import com.example.firstTest.models.Brand;
import com.example.firstTest.repository.BrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")

@RequestMapping("/brand")
public class BrandController  {
@Autowired
   private BrandRepository brandRepo;
    @GetMapping("/all")
    public List<Brand> getAllBrands() {
        List<Brand> brands= brandRepo.findAll();
        if(brands.isEmpty()){
            return null;
        }else return brands;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Brand> getBrandById(@PathVariable(value = "id") int brandeId) throws ResourceNotFoundException {
        Brand brand = brandRepo.findById(brandeId)
                .orElseThrow(() -> new ResourceNotFoundException("No Brand found with this id:: " + brandeId));
        return ResponseEntity.ok().body(brand);
    }

    @PostMapping("/")
    public Brand createBrand(@Valid @RequestBody Brand brand) throws ResourceNotFoundException {

        return brandRepo.save(brand);
    }
    @GetMapping("/byName/{brandName}")
    public Optional<Brand> getByName(@PathVariable("brandName")String brandName){
        Optional<Brand> brand=brandRepo.findByName(brandName);
        if (brand.isPresent()){
            return brand;
        }
        return null;
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Brand> updateEmployee(@PathVariable(value = "id") int brandId,
                                                   @Valid @RequestBody Brand brandDetails) throws ResourceNotFoundException {
        Brand brand = brandRepo.findById(brandId)
                .orElseThrow(() -> new ResourceNotFoundException("No brand found with this id :: " + brandId));
brand.setName(brandDetails.getName());

        final Brand updatedBrand = brandRepo.save(brand);
        return ResponseEntity.ok(updatedBrand);
    }

    @DeleteMapping("/delete/{id}")
    public Map<String, Boolean> deleteBrand(@PathVariable(value = "id") int brandId)
            throws ResourceNotFoundException {
        Brand brand = brandRepo.findById(brandId)
                .orElseThrow(() -> new ResourceNotFoundException("No brand found with this id :: " + brandId));
        System.out.println("******** "+brand);


 brandRepo.delete(brand);

Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
