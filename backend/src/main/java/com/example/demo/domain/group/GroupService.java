package com.example.demo.domain.group;

import com.example.demo.core.generic.ExtendedRepository;
import com.example.demo.core.generic.ExtendedService;
import com.example.demo.domain.user.User;
import org.springframework.data.jpa.repository.Query;

import javax.management.InstanceAlreadyExistsException;
import javax.management.InstanceNotFoundException;
import java.util.UUID;

public interface GroupService extends ExtendedService<Group> {
    Group findByUserId(UUID userId) throws InstanceNotFoundException;

    Group createGroup(Group group) throws InstanceAlreadyExistsException;

}
