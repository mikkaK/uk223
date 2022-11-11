package com.example.demo.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import javax.validation.constraints.Email;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.UUID;

/**
 * A DTO for the {@link com.example.demo.domain.user.User} entity
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class UpdateUserDTO implements Serializable {
    private UUID id;
    @Size(min = 2, max = 50)
    private String firstName;
    @Size(min = 2, max = 60)
    private String lastName;
    @Size(min = 2, max = 60)
    @Email
    private String email;
    private GroupIdDTO group;
}