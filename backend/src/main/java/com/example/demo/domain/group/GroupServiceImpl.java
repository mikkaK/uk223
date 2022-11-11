package com.example.demo.domain.group;

import com.example.demo.core.generic.ExtendedServiceImpl;
import com.example.demo.domain.user.User;
import com.example.demo.domain.user.UserRepository;
import com.example.demo.domain.user.dto.UserDTO;
import com.example.demo.domain.user.dto.UserMapper;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.management.InstanceNotFoundException;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Service
@Slf4j
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

    //method that gets the group of a user by the users ID
    @Override
    public Group findByUserId(UUID userId) throws InstanceNotFoundException {
        logger.trace("Searching group from user: {}", userId);
        if (userRepository.existsById(userId)) {
            Group group = groupRepository.findByMembersId(userId);
            if (group == null){
                throw new InstanceNotFoundException("user isn't a member of any group");
            }
            return group;
        }
        throw new InstanceNotFoundException("User with id: " + userId + " not found");
    }

    //method which returns group by groups' ID
    @Override
    public Optional<Group> findByGroupId(UUID groupId) throws InstanceNotFoundException {
        logger.trace("Searching group with id: {}", groupId);
        if (groupRepository.existsById(groupId)) {
            return groupRepository.findById(groupId);
        }
        throw new InstanceNotFoundException("Group with id: " + groupId + " not found");
    }

    //method which creates and returns a new group
    @Override
    public Group createGroup(Group group) {
            return save(group);
    }
    //method which returns all members of given group by groups' ID
    @Override
    public Set<UserDTO> findMembersOfGroup(UUID id, int page, int size) throws InstanceNotFoundException {
        if (groupRepository.existsById(id)) {
            Set<User> members = userRepository.findByGroupId(id, PageRequest.of(page, size));
            return userMapper.toDTOs(members);
        }
        throw new InstanceNotFoundException("Group with id: " +id + " doesn't exist");
    }
    //method which handles and deletes a group by groups' ID
    @Override
    public void deleteGroup(UUID groupId) throws InstanceNotFoundException {
        if (groupRepository.existsById(groupId)) {
            Set<User> members = userRepository.findByGroupId(groupId);
            for (User user : members) {
                userRepository.save(user.setGroup(null));
            }
            groupRepository.deleteById(groupId);
            return;
        }
        throw new InstanceNotFoundException("Group with id: " + groupId + " doesn't exist");
    }
}
