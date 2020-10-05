package com.example.firstTest.security.services;

import com.example.firstTest.security.services.MyUserDetails;
import com.example.firstTest.models.User;
import com.example.firstTest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MyUserDetailsService  implements UserDetailsService {
@Autowired
UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
         Optional<User> user=userRepository.findByUserName(userName);

User user1=user.get();

        System.out.println("Nom: "+user1.getUserName()+" Password: "+user1.getPassword()+" Role: "+user1.getRoles());

         user.orElseThrow(()->new UsernameNotFoundException("Not found"+userName));
       return  user.map(MyUserDetails::new).get();
//return MyUserDetails.build(user);
    }
}
