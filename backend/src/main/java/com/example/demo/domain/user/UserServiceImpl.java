package com.example.demo.domain.user;

import com.example.demo.core.generic.ExtendedServiceImpl;
import com.example.demo.domain.group.GroupService;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.management.InstanceNotFoundException;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserServiceImpl extends ExtendedServiceImpl<User> implements UserService {

  private final PasswordEncoder passwordEncoder;
  private GroupService groupService;

  @Autowired
  public UserServiceImpl(UserRepository repository,
                         Logger logger,
                         PasswordEncoder passwordEncoder,
                         GroupService groupService) {
    super(repository, logger);
    this.passwordEncoder = passwordEncoder;
    this.groupService = groupService;
  }

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    return ((UserRepository) repository).findByEmail(email)
                                        .map(UserDetailsImpl::new)
                                        .orElseThrow(() -> new UsernameNotFoundException(email));
  }
  @Override
  public User register(User user) {
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    return save(user);
  }
  public User addUserToGroup(UUID userId, UUID groupId) throws InstanceNotFoundException {
    Optional<User> optionalUser= repository.findById(userId);
    if (optionalUser.isPresent()) {
      User user = optionalUser.get();
        user.setGroup(groupService.findById(groupId));
        return save(user);
    }
    throw new InstanceNotFoundException();
  }
}
