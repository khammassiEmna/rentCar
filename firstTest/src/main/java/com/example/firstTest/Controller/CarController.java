package com.example.firstTest.Controller;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

import com.example.firstTest.models.Brand;
import com.example.firstTest.models.Car;
import com.example.firstTest.models.Model;
import com.example.firstTest.models.Reservation;
import com.example.firstTest.repository.BrandRepository;
import com.example.firstTest.repository.CarRepository;
import com.example.firstTest.repository.ModelRepository;
import com.example.firstTest.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/car")

public class CarController {
    @Autowired
    CarRepository carRepo;
    @Autowired
    ModelRepository modelRepo;
@Autowired
    ReservationRepository reservationRepo ;
    @GetMapping("/getRecent")
public List<Car> selectRecent (){
    List<Car> cars= new ArrayList<>();
    cars=carRepo.selectRecent();
        cars.forEach(c->{
            byte[] b;

            b=decompressBytes(c.getPicByte());
            c.setPicByte(b);

        });
   return cars;


}
    @PostMapping("/add")
    public Car addCar(@RequestParam("imageFile") MultipartFile file,@RequestParam("modelId") String modelId,@RequestParam("matricule") String matricule,@RequestParam("price") String price,@RequestParam("creationYear") String creationYear) throws IOException {
        System.out.println("Original Image Byte Size - " + file.getBytes().length);
        int id=Integer.parseInt(modelId);
         LocalDate date= LocalDate.now();

        Float price1=Float.parseFloat(price);
        Model model = modelRepo.getOne(id);

        ///////////////un truc consernant get et set de brand dans carEntity doit être vérifié
        Car car = new Car(file.getOriginalFilename(), file.getContentType(),compressBytes(file.getBytes()),model,matricule,creationYear,price1,date);
       return carRepo.save(car);
       // return ResponseEntity.status(HttpStatus.OK);
    }
    @GetMapping(path = { "/get/{imageName}" })
    public Car GetCar(@PathVariable("imageName") String imageName) throws IOException {
        final Optional<Car> retrievedImage = carRepo.findByName(imageName);
        Car car = new Car(retrievedImage.get().getName(), retrievedImage.get().getType(),
                decompressBytes(retrievedImage.get().getPicByte()),retrievedImage.get().getModel(),retrievedImage.get().getMatricule(),retrievedImage.get().getCreationYear(),null,null);
        return car;
    }

    @GetMapping("/getById/{id}")
            public Car getById(@PathVariable(value = "id") int id)

    {
        System.out.println("voilllla"+id);
        Car car=(carRepo.findById(id)).get();

        byte[] b;

        b=decompressBytes(car.getPicByte());
        car.setPicByte(b);

    return car;


    }

@GetMapping("/getByModel/{modelName}")
public List<Car> getByModel(@PathVariable("modelName") String modelName){
   Optional<List<Car>>
           cars=carRepo.findByModel(modelName);

   if (cars.isPresent()) {
       List<Car> cars1;
       cars1 = cars.get();
       cars1.forEach(c -> {
           byte[] b;
System.out.println("carName "+c.getName()+c.getModel().name);
           b = decompressBytes(c.getPicByte());
           c.setPicByte(b);

       });
       return cars1;
   }
return null;
}
    @GetMapping("/getRecentByModel/{modelName}")
    public List<Car> getRecentByModel(@PathVariable("modelName") String modelName){
        Optional<List<Car>>
                cars=carRepo.findRecentByModel(modelName);

        if (cars.isPresent()) {
            List<Car> cars1;
            cars1 = cars.get();
            cars1.forEach(c -> {
                byte[] b;
                System.out.println("carName "+c.getName()+c.getModel().name);
                b = decompressBytes(c.getPicByte());
                c.setPicByte(b);

            });
            return cars1;
        }
        return null;
    }
    @GetMapping(path = { "/get" })
    public List<Car> getAll() throws IOException {
        List<Car> cars= new ArrayList<>();

       cars= carRepo.findAll();
      cars.forEach(c->{
          byte[] b;

          b=decompressBytes(c.getPicByte());
          c.setPicByte(b);
      });

        return cars;
    }


    // compress the image bytes before storing it in the database
    public static byte[] compressBytes(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        try {
            outputStream.close();
        } catch (IOException e) {
        }
        System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);
        return outputStream.toByteArray();
    }
    // uncompress the image bytes before returning it to the angular application
    public static byte[] decompressBytes(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException ioe) {
        } catch (DataFormatException e) {
        }

        return outputStream.toByteArray();
    }

    @DeleteMapping("/{id}")
    public Boolean deleteCar(@PathVariable("id")int id)
    {
        Optional<Reservation[]> reservations=reservationRepo.findByCar(id,java.time.LocalDate.now());
        if (reservations.isPresent()){
            return false;
        }
        else
            carRepo.deleteById(id);
        return true;
    }


    @GetMapping("/getByPrice/{price}")
    public List<Car> getByPrice(@PathVariable("price")String price){
        List<Car>cars;
        float p=Float.parseFloat(price);
        if(p==0){
            cars= carRepo.findAll();
            cars.forEach(c->{
                byte[] b;
                b=decompressBytes(c.getPicByte());
                c.setPicByte(b);

            });

            return cars;        }
        else {
            cars=carRepo.findByPrice(p);
            cars.forEach(c->{
                byte[] b;
                b=decompressBytes(c.getPicByte());
                c.setPicByte(b);
                System.out.println("car"+c);

            });
            return cars;
        }
        }
    @GetMapping("/getNewByPrice/{price}")
    public List<Car> getNewByPrice(@PathVariable("price")String price){
        List<Car>cars;
        float p=Float.parseFloat(price);
        if(p==0){
            cars= carRepo.selectRecent();
            cars.forEach(c->{
                byte[] b;
                b=decompressBytes(c.getPicByte());
                c.setPicByte(b);

            });

            return cars;        }
        else {
            cars=carRepo.findNewByPrice(p);
            cars.forEach(c->{
                byte[] b;
                b=decompressBytes(c.getPicByte());
                c.setPicByte(b);
System.out.println("Newcar"+c);
            });
            return cars;
        }
    }



}

