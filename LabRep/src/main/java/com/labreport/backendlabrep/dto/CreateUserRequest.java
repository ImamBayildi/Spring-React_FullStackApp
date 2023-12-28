package com.labreport.backendlabrep.dto;

import java.util.Set;

public record CreateUserRequest(
        String fullName,
        String email,
        String password,
        Set<Role> authorities
) {
}