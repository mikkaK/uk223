package com.example.demo.domain.appUser;


import com.example.demo.domain.role.Role;
import lombok.Data;

import javax.persistence.*;
import java.util.Set;
import java.util.UUID;

@Data @Entity(name = "users")
public class User {
    //TODO:extend
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String username;
    private String password;

    //TODO Implement Role Relation
    @ManyToOne
    @JoinColumn(name="role_id", referencedColumnName="id")
    private Role role;
}

