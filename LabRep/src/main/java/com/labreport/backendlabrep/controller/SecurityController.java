package com.labreport.backendlabrep.controller;

import java.util.HashMap;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties.Authentication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// import com.labreport.backendlabrep.dto.AuthRequest;w
import com.labreport.backendlabrep.dto.CreateUserRequest;
import com.labreport.backendlabrep.entity.Technician;
import com.labreport.backendlabrep.service.securityService.JwtService;
import com.labreport.backendlabrep.service.securityService.SecurityService;

// import io.jsonwebtoken.Jwt;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMethod;



@RestController
@RequestMapping("/auth")
@Slf4j
public class SecurityController {
    
    private final SecurityService securityService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    
    public SecurityController(SecurityService securityService, JwtService jwtService,
            AuthenticationManager authenticationManager) {
        this.securityService = securityService;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }



    //<<<<<<<<SIGNUP POST>>>>>>>>>>
    @RequestMapping(value= {"/signUp","/createTechnician","/addUser"}, method=RequestMethod.POST)
    public Technician createTechnician(@RequestBody CreateUserRequest req) {
        return securityService.createTechnician(req);
    }

    
    //<<<<<<<<<<LOGIN POST>>>>>>>>>>>>
    @RequestMapping(value={"/login","/generateToken"}, method = RequestMethod.POST)
    public HashMap<String,Object> generateToken(@RequestBody Object[] req) {// WARN => AuthRequest is Object => ["BarışManço@mail.com","0000"]
        Object username = req[0].toString();// WARN => using email for username
        Object password = req[1].toString();
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username.toString(), password.toString()));//Authentication manager UserService'in loadUserByUsername'ini çağırır ve otomatik olarak UserDetailService aracılığyla veri tabanına sorgu yapar.

        log.info("Authenticate object => "+authentication);

        if(authentication.isAuthenticated()){
            Object tech = securityService.getByEmail(username.toString());
            String token = jwtService.generateToken(username.toString());//creating Token with username. or pw?
            HashMap<String, Object> data = new HashMap<>();
            data.put("user", tech);
            data.put("token", token);

            // ArrayList<Object> data = new ArrayList<Object>(); list.add(token); list.add(tech);
            return data;
        }

        log.info("invalid Login:  "+username);//TO DO => Learn Logger //Redirecting server logs to /dev/null
        throw new UsernameNotFoundException("Geçersiz kullanıcı adı yada şifre :"+username+"_"+password);
    }




    // @RequestMapping("/master")
    // public String login() {
    //     return jwtService.generateToken(securityService.loadUserByUsername("master"));
    // }
    
}
    // Method[] x = GeneralConfig.class.getMethods();
