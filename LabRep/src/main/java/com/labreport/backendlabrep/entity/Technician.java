package com.labreport.backendlabrep.entity;

import java.util.Date;
import java.util.Set;

import org.springframework.security.core.userdetails.UserDetails;

import com.labreport.backendlabrep.dto.Role;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data   //TO DO => Manuel Generate
@Entity
@Table(name = "t_technician")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Technician implements UserDetails{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false, unique = true)
    private Long id;

    @Column(name = "fullName", length = 100, nullable = false)
    private String fullName;

    @Column(name = "e-mail", length = 100, nullable = false, unique = true)
    private String email;

    @Column(name = "password", length = 100, nullable = false)
    private String password;

    @Temporal(TemporalType.DATE)
    @Column(name = "startingDate", nullable = false)
    private Date startingDate;

    @Column(name = "isWorking", columnDefinition = "BIT default 1")
    private Boolean isWorking;
    
    // This relation throwing exception => https://www.baeldung.com/hibernate-initialize-proxy-exception
    // @OneToMany(mappedBy = "writer", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    // private Set<Report> reports; //List == Set: ???

    // @OneToMany(fetch = FetchType.EAGER)
    @ElementCollection(targetClass = Role.class, fetch = FetchType.EAGER)
    @JoinTable(name = "authorities", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "role", nullable = false)
    @Enumerated(EnumType.STRING)
    private Set<Role> authorities;

    @Override
    public String getUsername() {// for auth
        return email;
    }

    //Kullanıcının hesap süresi dolmuş mu?
    private boolean accountNonExpired;
    //Kullanıcının hesabı etkin mi?
    private boolean isEnabled;
    //Kullanıcının hesabı kilitli mi?
    private boolean accountNonLocked;
    //Kullanıcının kimlik doğrulama bilgileri süresi dolmuş mu?
    private boolean credentialsNonExpired;

}
