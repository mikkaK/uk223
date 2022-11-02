package com.example.demo.domain.group;

import com.example.demo.core.generic.ExtendedRepository;
import com.example.demo.core.generic.ExtendedService;

import java.util.UUID;

public interface GroupService extends ExtendedService<Group> {
    Group findByUserId(UUID userId);
}
