package com.example.demo.domain.user.dto;

import com.example.demo.core.generic.ExtendedDTO;
import com.example.demo.domain.role.dto.RoleDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

/**
 * A DTO for the {@link User} entity
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class UserDTO extends ExtendedDTO implements Serializable{
    private UUID id;
    private String firstName;
    private String lastName;
    private String email;
    private Set<RoleDTO> roles = new HashSet<>();
    private GroupIdDTO group;
}