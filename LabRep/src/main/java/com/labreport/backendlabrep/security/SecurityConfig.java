package com.labreport.backendlabrep.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.labreport.backendlabrep.service.securityService.SecurityService;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    private final JwtAuthFilter myJwtAuthFilter;
    private final SecurityService mySecurityService;
    private final PasswordEncoder myPasswordEncoder;

    public SecurityConfig(JwtAuthFilter myJwtAuthFilter, SecurityService mySecurityService,
            PasswordEncoder myPasswordEncoder) {
        this.myJwtAuthFilter = myJwtAuthFilter;
        this.mySecurityService = mySecurityService;
        this.myPasswordEncoder = myPasswordEncoder;
    }

    @Bean
    public SecurityFilterChain mSecurityFilterChain(HttpSecurity httpSec) {
        try {
            return httpSec
                    .csrf(AbstractHttpConfigurer::disable)
                    .authorizeHttpRequests(
                            auth -> auth
                                    .requestMatchers("/signIn/**", "/signUp/**", "/auth/**").permitAll()
                                    .requestMatchers("/report/getByFullName/**", "/report/getByTc/**").permitAll()
                                    .requestMatchers("/report/**").hasAnyRole("TECH", "MASTER")
                                    .requestMatchers("/technician/**").hasAnyRole("TECH", "MASTER")// .authenticated()
                                    .requestMatchers("/master/**").hasRole("MASTER")// .hasAllRoles(..)
                                    .requestMatchers("/**").permitAll()
                    )
                    .sessionManagement(x -> x.sessionCreationPolicy(SessionCreationPolicy.NEVER))
                    .authenticationProvider(authenticaticationProvider())
                    .addFilterBefore(myJwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                    .build();
        } catch (Exception e) {
            System.out.println("SECURITY FILTER CHAIN BROKEN");
            throw null;
        }
    }

    @Bean
    public AuthenticationProvider authenticaticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(mySecurityService);
        authenticationProvider.setPasswordEncoder(myPasswordEncoder);
        return authenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}