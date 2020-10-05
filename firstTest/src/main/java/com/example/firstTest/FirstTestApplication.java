package com.example.firstTest;

import com.example.firstTest.repository.UserRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackageClasses = UserRepository.class)
public class FirstTestApplication {

	public static void main(String[] args) {
		SpringApplication.run(FirstTestApplication.class, args);

		System.out.println("hello hellllo");
	}

}
