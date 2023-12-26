package com.labreport.backendlabrep.dto;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    
    ROLE_TECH("TECH"),
    ROLE_MASTER("MASTER");

    private String value;

    /**
     * Parametre olarak gelen rol adını tutar.
     * @param value rol adı
     */
    Role(String value) {
        this.value = value;
    }

    public String getValue() {
        return this.value;
    }

    /**
     * GrantedAuthority arayüzünden gelen metodu uygular.
     * @return Kullanıcı rolünün yetki adı
     */
    @Override
    public String getAuthority() {
        return name();
    }

}
