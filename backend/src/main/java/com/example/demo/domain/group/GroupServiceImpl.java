package com.example.demo.domain.group;

import com.example.demo.core.generic.ExtendedServiceImpl;
import com.example.demo.domain.user.User;
import com.example.demo.domain.user.UserRepository;
import com.example.demo.domain.user.dto.UserDTO;
import com.example.demo.domain.user.dto.UserMapper;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.management.InstanceAlreadyExistsException;
import javax.management.InstanceNotFoundException;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Service
public class GroupServiceImpl extends ExtendedServiceImpl<Group> implements GroupService {
    GroupRepository groupRepository;
    UserRepository userRepository;
    UserMapper userMapper;

    @Autowired
    protected GroupServiceImpl(GroupRepository repository,
            Logger logger,
            GroupRepository groupRepository,
            UserRepository userRepository,
            UserMapper userMapper) {
        super(repository, logger);
        this.groupRepository = groupRepository;
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Override
    public Group findByUserId(UUID userId) {
        logger.trace("Searching group from user: {}", userId);
        return groupRepository.findByMembers_Id(userId);
    }

    @Override
    public Optional<Group> findByGroupId(UUID groupId) throws InstanceNotFoundException {
        logger.trace("Searching group with id: {}", groupId);
        return groupRepository.findById(groupId);
    }

    @Override
    public Group createGroup(Group group) throws InstanceAlreadyExistsException {
        return save(group);
    }

    @Override
    public Set<UserDTO> findMembersOfGroup(UUID id, int page, int size) {
        Set<User> members = userRepository.findByGroup_Id(id, PageRequest.of(page, size));
        return userMapper.toDTOs(members);
    }

    @Override
    public void deleteGroup(UUID groupId) throws InstanceNotFoundException {
        if (groupRepository.existsById(groupId)) {
            Set<User> members = userRepository.findByGroup_Id(groupId);
            for (User user : members) {
                userRepository.save(user.setGroup(null));
            }
            groupRepository.deleteById(groupId);
            return;
        }
        throw new InstanceNotFoundException("Group with id: " + groupId + " doesn't exist");
    }
}
