package com.example.demo.domain.group;


import com.example.demo.core.generic.ExtendedServiceImpl;
import com.example.demo.domain.user.UserRepository;
import com.example.demo.domain.user.UserService;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class GroupServiceImpl extends ExtendedServiceImpl<Group> implements GroupService {
    UserRepository userRepository;
    @Autowired
    protected GroupServiceImpl(GroupRepository repository, Logger logger, UserRepository userService) {
        super(repository, logger);
        this.userRepository = userService;
    }

    @Override
    public Group findByUserId(UUID userId){

    }

}
