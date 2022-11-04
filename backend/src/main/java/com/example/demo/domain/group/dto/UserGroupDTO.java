package com.example.demo.domain.group.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.UUID;

/**
 * A DTO for the {@link com.example.demo.domain.user.User} entity
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class UserGroupDTO implements Serializable {
    private UUID id;
    private String firstName;
    private String lastName;
    private String email;
}