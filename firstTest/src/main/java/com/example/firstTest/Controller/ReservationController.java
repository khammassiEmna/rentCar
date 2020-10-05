package com.example.firstTest.Controller;


import com.example.firstTest.Exception.ResourceNotFoundException;
import com.example.firstTest.SendEmailService;
import com.example.firstTest.models.Car;
import com.example.firstTest.models.Reservation;
import com.example.firstTest.models.User;
import com.example.firstTest.repository.ReservationRepository;
import com.example.firstTest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.zip.DataFormatException;
import java.util.zip.Inflater;

import static java.time.temporal.ChronoUnit.DAYS;

@RestController
@CrossOrigin(origins = "http://localhost:4200")

@RequestMapping("/reservation")
public class ReservationController {
@Autowired
    ReservationRepository reservationRepo;
@Autowired
    UserRepository userRepo;
@Autowired
    SendEmailService sendEmailService;


    @PostMapping("/{username}")
    public Boolean createReservation(@PathVariable(value ="username")String username, @Valid @RequestBody Reservation reservation) throws ResourceNotFoundException {


        Optional<Reservation> reserv=reservationRepo.findByCarAndDate(reservation.getCar(),reservation.getDateDeb());
       if(reserv.isPresent()){
           return false;
       }
Float price=reservation.getCar().getPrice();
     long days=DAYS.between(reservation.getDateDeb(),reservation.getDateFin());
     reservation.setPrice(price*days);
      User user=(userRepo.findByUserName(username)).get();
        reservation.setUser(user);
        reservationRepo.save(reservation);
        return true;
    }

    @GetMapping("/notConfirmed")
    public List<Reservation> getNotConfirmed(){

        List<Reservation> reservations=reservationRepo.notConfirmed();
        reservations.forEach(r-> {
            byte[] b;
            b = decompressBytes(r.getCar().getPicByte());
            r.getCar().setPicByte(b);

        });


        return reservations;

    }

@DeleteMapping("/{id}")
public Boolean deleteReservation(@PathVariable int id)
{

    reservationRepo.deleteById(id);
    return true;
}




    @GetMapping("/confirm/{id}")
    public Boolean confirm(@PathVariable int id){
        System.out.println("iddd"+id);
        Reservation reserv=(reservationRepo.findById(id)).get();
        Car car=reserv.getCar();
        LocalDate dateDeb=reserv.getDateDeb();
        Optional<Reservation> reservation=reservationRepo.findByCarAndDate(car,dateDeb);
        if(reservation.isPresent()){return false;}
        reserv.setConfirmed(true);
        reservationRepo.save(reserv);
        String to=reserv.getUser().getEmail();
        System.out.println("maillll"+to);

        sendEmailService.sendEmail(to,"votre reservation est bien confirmée","Confirmation de reservation ");

        return true;
    }

    @GetMapping("/getByCar/{carId}")
    public Boolean getByCar(@PathVariable("carId")int carId)
    {
        LocalDate currentDate=java.time.LocalDate.now();
        Optional<Reservation[]> reservations=reservationRepo.findByCar(carId,currentDate);
        return  (reservations.isPresent());
    }

@GetMapping("/ofTheDay")
    public List<Reservation> getReserv(){
    LocalDate currentDate=java.time.LocalDate.now();

    List<Reservation> reservations=(reservationRepo.reserOfTheDay(currentDate));
    if(reservations.size()>0){
        reservations.forEach(r-> {
            byte[] b;
            b = decompressBytes(r.getCar().getPicByte());
            System.out.println("decompresse"+b);

            r.getCar().setPicByte(b);

        });
        return reservations;
    }
    return null;
}
    @GetMapping("/byUser/{userName}")
    public List<Reservation> getByUser(@PathVariable("userName") String userName){
User user=(userRepo.findByUserName(userName)).get();
        List<Reservation> reservations=(reservationRepo.getByUser(user));
        if(reservations.size()>0){
            reservations.forEach(r-> {
                byte[] b;
                b = decompressBytes(r.getCar().getPicByte());
                System.out.println("decompresse"+b);

                r.getCar().setPicByte(b);

            });
            return reservations;
        }
        return null;
    }
    @GetMapping("/next")
    public List<Reservation> getNext(){
        LocalDate currentDate=java.time.LocalDate.now();

        List<Reservation> reservations=(reservationRepo.getNext(currentDate));
        if(reservations.size()>0){
        reservations.forEach(r-> {
            byte[] b;
            b = decompressBytes(r.getCar().getPicByte());
            System.out.println("decompresse"+b);

            r.getCar().setPicByte(b);

        });
            return reservations;
        }
        return null;
    }

    @GetMapping("/getOne/{id}")

    public Reservation getReservation (@PathVariable("id")int id)
    {
        return reservationRepo.findById(id).get();
    }

    @GetMapping("/old")
    public List<Reservation>  getOld(){
        LocalDate currentDate=java.time.LocalDate.now();

        List<Reservation> reservations=(reservationRepo.getOld(currentDate));
        if(reservations.size()>0){
            reservations.forEach(r-> {
                byte[] b;
                b = decompressBytes(r.getCar().getPicByte());
                r.getCar().setPicByte(b);

            });
            return reservations;
        }
        return null;
    }


    @GetMapping("/return")
    public List<Reservation>  returnOfTheDay(){
        LocalDate currentDate=java.time.LocalDate.now();
        List<Reservation> reservations=(reservationRepo.returnOfTheDay(currentDate));
        if(reservations.size()>0){
            reservations.forEach(r-> {
                byte[] b;
                b = decompressBytes(r.getCar().getPicByte());
                System.out.println("decompresse"+b);

                r.getCar().setPicByte(b);

            });
            return reservations;
        }
        return null;
    }


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


    @PutMapping("/{id}")

public Boolean updateReserv(@PathVariable("id")int id,@RequestBody Reservation reservation){
      Optional<Reservation> reserv=reservationRepo.findByCarAndDate(reservation.getCar(),reservation.getDateDeb());
      if(reserv.isPresent()){
          int idR=reserv.get().getId();

          if(id !=  idR){

              return false;
          }
      }
        Float price=reservation.getCar().getPrice();
        long days=DAYS.between(reservation.getDateDeb(),reservation.getDateFin());
        reservation.setPrice(price*days);
    reservationRepo.save(reservation);
      return true;
    }

}
