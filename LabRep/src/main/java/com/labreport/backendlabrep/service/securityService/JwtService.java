package com.labreport.backendlabrep.service.securityService;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;  // import lombok.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.labreport.backendlabrep.config.MyKeyGenerator;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    // private final MyKeyGenerator myKeyGenerator;
    private final String aKey;
    
    public JwtService(MyKeyGenerator myKeyGenerator) {
        this.aKey = myKeyGenerator.aKeyGenerate();
    }

    @Value("${jwt.key}")
    private String jwtKey;

    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtKey);//aKey or jwt.Key
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(String username) {
        Map<String, Object> claims = new HashMap<>();// claims.put("role", "admin");
        return Jwts.builder().setClaims(claims).setSubject(username).setIssuedAt(new Date(System.currentTimeMillis()))//second = 1000ms
        .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 ))//1 hour
        .signWith(getSignKey(),SignatureAlgorithm.HS256).compact();
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        String username = extractUser(token);
        Date expirationDate = extractExpiration(token);
        
        return userDetails.getUsername().equals(username) && !expirationDate.before(new Date());
    }


    private Date extractExpiration(String token) {
        Claims claims = Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token).getBody();
        return claims.getExpiration();
    }

    public String extractUser(String token) {
        Claims claims = Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token).getBody();
        return claims.getSubject();
    }
       
    
    
}