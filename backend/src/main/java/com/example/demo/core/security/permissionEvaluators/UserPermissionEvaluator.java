package com.example.demo.core.security.permissionEvaluators;

import com.example.demo.domain.group.Group;
import com.example.demo.domain.group.GroupService;
import com.example.demo.domain.group.dto.GroupMapper;
import com.example.demo.domain.user.User;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.management.InstanceNotFoundException;
import java.lang.reflect.Member;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Component
public class UserPermissionEvaluator {
  @Autowired
  public UserPermissionEvaluator(Logger logger,GroupService groupService){
    this.logger = logger;
    this.groupService=groupService;
  }
  private final GroupService groupService;

  private final Logger logger;
  public boolean isMemberOfGroup(UUID groupId, User principal) throws InstanceNotFoundException {
    Optional<Group> group = groupService.findByGroupId(groupId);
    if(group.isPresent()){
        Set<User> members = group.get().getMembers();
        User[] membersArray = new User[members.size()];
        members.toArray(membersArray);
        for (int i = 0; i < membersArray.length; i++) {
            if(membersArray[i].getId().equals(principal.getId())){
                logger.info("true");
                return true;
            }
        }

    }return false;

  }

  public boolean hasSameId(User principal, UUID userId){
    return principal.getId().equals(userId);
  }
}
