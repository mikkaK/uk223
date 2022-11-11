package com.example.demo.domain.group;

import com.example.demo.core.generic.ExtendedService;
import com.example.demo.domain.user.dto.UserDTO;

import javax.management.InstanceAlreadyExistsException;
import javax.management.InstanceNotFoundException;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public interface GroupService extends ExtendedService<Group> {
    Group findByUserId(UUID userId) throws InstanceNotFoundException;

    Optional<Group> findByGroupId(UUID groupId) throws InstanceNotFoundException;

    Group createGroup(Group group) throws InstanceAlreadyExistsException;

    Set<UserDTO> findMembersOfGroup(UUID id, int page, int size);

    void deleteGroup(UUID groupId) throws InstanceNotFoundException;

}
