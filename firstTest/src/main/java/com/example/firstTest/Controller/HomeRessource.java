package com.example.firstTest.Controller;

import com.example.firstTest.Exception.ResourceNotFoundException;
import com.example.firstTest.security.jwt.JwtUtil;
import com.example.firstTest.Message.request.LoginForm;
import com.example.firstTest.Message.request.SignUpForm;
import com.example.firstTest.Message.response.JwtResponse;
import com.example.firstTest.Message.response.ResponseMessage;
import com.example.firstTest.models.*;
import com.example.firstTest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/auth")

public class HomeRessource {
    @Autowired
private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtUtil jwtProvider;
@Autowired
    PasswordEncoder encoder;
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser( @RequestBody LoginForm loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUserName(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtProvider.generateJwtToken(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername(), userDetails.getAuthorities()));
    }




    @PostMapping("/signup")
    public ResponseEntity<?> registerUser( @RequestBody SignUpForm signUpRequest) {
        if (userRepository.existsByUserName(signUpRequest.getUserName())) {
            return new ResponseEntity<>(new ResponseMessage("Fail -> Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

System.out.println("req reçue"+signUpRequest.getUserName()+" "+signUpRequest.getPassword()+signUpRequest.getPermis());

        // Creating user's account
        User user = new User(54525,signUpRequest.getFullName(),signUpRequest.getEmail(), signUpRequest.getPermis(),
                signUpRequest.getUserName(),
                encoder.encode(signUpRequest.getPassword()),signUpRequest.getRole());
                // encoder.encode(signUpRequest.getPassword()));
System.out.println("FullName "+user.getFullName()+"mail "+user.getEmail()+ "permis "+user.getPermis()
        +user.getUserName()+user.getPassword());

        userRepository.save(user);

        return new ResponseEntity<>(new ResponseMessage("User registered successfully!"), HttpStatus.OK);
    }













@GetMapping("/all")
    public List<User> getAll(){
        return userRepository.findClient();
}

@DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable("id")int id){
         userRepository.deleteById(id);
         return "done";
}

@GetMapping("/{username}")
    public ResponseEntity<User> getByName(@PathVariable("username") String userName){
    Optional<User> user= userRepository.findByUserName(userName) ;
    return ResponseEntity.ok().body(user.get());}


@GetMapping("/passwordCheck/{username}/{password}")
    public Boolean passwordCheck(@PathVariable("username")String username,@PathVariable("password")String password)
{
    User user=userRepository.findByUserName(username).get();

    return  encoder.matches(password,user.getPassword());

}

    @PutMapping("/{username}")
    public Boolean update(@PathVariable String username,@RequestBody User user){
        if(username.equals(user.getUserName())==false){
            Optional<User> user1=userRepository.findByUserName(user.getUserName());
            System.out.println("comparing the usernames");
            if(user1.isPresent()){
                return false;
            }
        }
        System.out.println("not comparing the usernames");

        user.setPassword(encoder.encode(user.getPassword()));
userRepository.save(user);
    return true;

}


 /*   @PostMapping("/signin")
    public String generateToken(@RequestBody AuthRequest authRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUserName(), authRequest.getPassword())
            );
        } catch (Exception ex) {
            throw new Exception("inavalid username/password");
        }
        return jwtUtil.generateToken(authRequest.getUserName());
    }*/

}
