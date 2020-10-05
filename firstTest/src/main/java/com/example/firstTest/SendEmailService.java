package com.example.firstTest;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;
import org.springframework.mail.javamail.JavaMailSender;

@Service
public class SendEmailService {
    @Autowired
    private JavaMailSender javaMailSender;
    public void sendEmail(String to,String body,String topic){
        System.out.println("sendiiiiiiiing mail");

        SimpleMailMessage simpleMailMessage=new SimpleMailMessage();
simpleMailMessage.setFrom("emnakhamassi@gmail.com");
simpleMailMessage.setTo( to);
simpleMailMessage.setSubject(topic);
simpleMailMessage.setText(body);

        javaMailSender.send(simpleMailMessage);
    }

}
