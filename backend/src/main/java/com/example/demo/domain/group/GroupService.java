package com.example.demo.domain.group;

import com.example.demo.core.generic.ExtendedRepository;
import com.example.demo.core.generic.ExtendedService;
import org.springframework.data.jpa.repository.Query;

import javax.management.InstanceNotFoundException;
import java.util.UUID;

public interface GroupService extends ExtendedService<Group> {
    Group findByUserId(UUID userId) throws InstanceNotFoundException;


}
