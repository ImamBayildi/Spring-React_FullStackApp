package com.labreport.backendlabrep.security;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.labreport.backendlabrep.service.securityService.JwtService;
import com.labreport.backendlabrep.service.securityService.SecurityService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthFilter extends OncePerRequestFilter{
    
    private final JwtService jwtService;
    private final SecurityService securityService;
    

    public JwtAuthFilter(JwtService jwtService, SecurityService securityService) {
        this.jwtService = jwtService;
        this.securityService = securityService;
    }
    
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
                String authHeader = request.getHeader("Authorization");
                String token = null;
                String userName = null;
                if(authHeader != null && authHeader.startsWith("Bearer ")){
                    token = authHeader.substring(7);
                    userName = jwtService.extractUser(token);
                }

                if(userName != null && SecurityContextHolder.getContext().getAuthentication() == null){
                    UserDetails userDetails = securityService.loadUserByUsername(userName);
                    System.out.println("userDetails Loaded => " + userDetails);
                    if(jwtService.validateToken(token, userDetails)){
                        System.out.println(" User Detail => "+userDetails);
                        UsernamePasswordAuthenticationToken UPAT = new UsernamePasswordAuthenticationToken(userDetails, null,userDetails.getAuthorities());
                        UPAT.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(UPAT);
                        System.out.println("User Authenticated => "+UPAT);
                    }
                }
                filterChain.doFilter(request, response);
    }
    
}
