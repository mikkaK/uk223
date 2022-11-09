package com.example.demo.domain.user;

import com.example.demo.core.generic.ExtendedService;
import org.springframework.security.core.userdetails.UserDetailsService;

import javax.management.InstanceAlreadyExistsException;
import javax.management.InstanceNotFoundException;
import java.util.UUID;

public interface UserService extends UserDetailsService, ExtendedService<User> {
  User register(User user);
  User addUserToGroup(UUID userId, UUID groupId) throws InstanceNotFoundException, InstanceAlreadyExistsException;
}
