package com.labreport.backendlabrep.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

@Configuration
public class MyKeyGenerator {
    @Bean
    public String aKeyGenerate() {
        int randomValue = (int) ((Math.random() * (1999999999 - 1000000000)) + 1000000000);
        
        String secretKey = generateSecretKey(String.valueOf(randomValue));
        System.out.println("Generated Secret Key: " + secretKey);
        return secretKey;
    }

    public String generateSecretKey(String value) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = digest.digest(value.getBytes(StandardCharsets.UTF_8));

            return Base64.getEncoder().encodeToString(hashBytes);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return null;
    }
}