package com.example.demo.domain.group.dto;

import com.example.demo.core.generic.ExtendedDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.io.Serializable;

/**
 * A DTO for the {@link com.example.demo.domain.user.User} entity
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class UserGroupDTO extends ExtendedDTO implements Serializable {
    private String firstName;
    private String lastName;
    private String email;
}