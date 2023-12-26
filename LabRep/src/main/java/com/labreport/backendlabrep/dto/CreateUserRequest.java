package com.labreport.backendlabrep.dto;

import java.util.Set;



// import javax.management.relation.Role;
// import org.apache.catalina.Role;

// import lombok.Builder;
// import lombok.Data;
// import lombok.NoArgsConstructor;
// import lombok.AllArgsConstructor;
// import lombok.RequiredArgsConstructor;


// @Builder
public record CreateUserRequest(
        String fullName,
        String email,
        String password,
        Set<Role> authorities
) {
    // Otomatik olarak getter metodları ve constructor oluşturulur. Equals, hashCode ve toString metotlarını sağlar.
}