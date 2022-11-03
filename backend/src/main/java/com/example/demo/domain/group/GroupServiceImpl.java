package com.example.demo.domain.group;


import com.example.demo.core.generic.ExtendedServiceImpl;
import com.example.demo.domain.user.User;
import com.example.demo.domain.user.UserRepository;
import com.example.demo.domain.user.UserService;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.management.InstanceAlreadyExistsException;
import javax.management.InstanceNotFoundException;
import java.util.UUID;

@Service
public class GroupServiceImpl extends ExtendedServiceImpl<Group> implements GroupService {
    GroupRepository groupRepository;
    @Autowired
    protected GroupServiceImpl(GroupRepository repository,
                               Logger logger,
                               GroupRepository groupRepository) {
        super(repository, logger);
        this.groupRepository = groupRepository;
    }

    @Override
    public Group findByUserId(UUID userId) throws InstanceNotFoundException {
        logger.trace("Searching group from user: {}", userId);
        return groupRepository.findByMembers_Id(userId);
    }

    @Override
    public Group createGroup(Group group) throws InstanceAlreadyExistsException {
        return save(group);
    }

}
