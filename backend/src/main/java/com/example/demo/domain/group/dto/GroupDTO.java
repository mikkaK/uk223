package com.example.demo.domain.group.dto;

import com.example.demo.core.generic.ExtendedDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Set;
import java.util.UUID;

/**
 * A DTO for the {@link com.example.demo.domain.group.Group} entity
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class GroupDTO extends ExtendedDTO implements Serializable {
    private UUID id;
    @Size(min = 1, max = 100)
    @NotNull
    private String groupName;
    @Size(min = 1, max = 100)
    @NotNull
    private String groupMotto;
    @Size(min = 1, max = 255)
    @NotNull
    private String groupLogo;
    private Set<UserGroupDTO> members;
}