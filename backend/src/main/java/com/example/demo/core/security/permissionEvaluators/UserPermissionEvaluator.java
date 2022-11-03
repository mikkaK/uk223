package com.example.demo.core.security.permissionEvaluators;

import com.example.demo.domain.group.GroupService;
import com.example.demo.domain.user.User;
import org.springframework.stereotype.Component;

import javax.management.InstanceNotFoundException;
import java.util.UUID;

@Component
public class UserPermissionEvaluator {
  private final GroupService groupService;

  public UserPermissionEvaluator(GroupService groupService) {
    this.groupService = groupService;
  }
  public boolean isMemberOfGroup(UUID groupId, User principal) throws InstanceNotFoundException {
    return groupService.findByUserId(groupId).getMembers().contains(principal);
  }

  public boolean hasSameId(User principal, UUID userId){
    return principal.getId().equals(userId);
  }

  public boolean isUserAboveAge(User principal, int age) {
    return true;
  }

}
