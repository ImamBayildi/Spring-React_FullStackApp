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
    
    
    @Override//Interceptor
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
                // JWT'yi Authorization başlığından al
                String authHeader = request.getHeader("Authorization");
                String token = null;
                String userName = null;
                if(authHeader != null && authHeader.startsWith("Bearer ")){
                    // JWT 7. karakterden başlıyor
                    token = authHeader.substring(7);
                    // JWT'den kullanıcı adını çıkart
                    userName = jwtService.extractUser(token);
                }

                if(userName != null && SecurityContextHolder.getContext().getAuthentication() == null){
                    // Kullanıcıyı kullanıcı adına göre yükler
                    UserDetails userDetails = securityService.loadUserByUsername(userName);//Neden UserDetails???
                    System.out.println("userDetails Loaded => " + userDetails);
                    if(jwtService.validateToken(token, userDetails)){
                        System.out.println(" User Detail => "+userDetails);
                        // Kullanıcıyı kimlik doğrulama token'ıyla kimlik doğrulama bilgilerini oluşturur   //TO DO => Review this UsernamePasswordAuthenticationToken
                        UsernamePasswordAuthenticationToken UPAT = new UsernamePasswordAuthenticationToken(userDetails, null,userDetails.getAuthorities());
                        // Kimlik doğrulama ayrıntılarını ayarlar
                        UPAT.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        // Kimlik doğrulama bilgilerini SecurityContextHolder üzerinde ayarlar
                        SecurityContextHolder.getContext().setAuthentication(UPAT);
                        System.out.println("User Authenticated => "+UPAT);
                    }
                }
                // filterChain'e devam et
                filterChain.doFilter(request, response);
    }
    
}
