package com.example.firstTest.Message.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginForm {

    private String userName;

    public String getPassword() {
        return password;
    }

    public String getUserName() {
        return userName;
    }

    private String password;


}