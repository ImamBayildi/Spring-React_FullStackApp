package com.labreport.backendlabrep.dto;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    
    ROLE_TECH("TECH"),
    ROLE_MASTER("MASTER");

    private String value;

    Role(String value) {
        this.value = value;
    }

    public String getValue() {
        return this.value;
    }
    
    @Override
    public String getAuthority() {
        return name();
    }

}
