package com.example.demo.domain.user;

import com.example.demo.core.generic.ExtendedServiceImpl;
import com.example.demo.domain.group.GroupService;
import com.example.demo.domain.role.RoleService;
import com.example.demo.domain.user.dto.UpdateUserDTO;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.management.InstanceNotFoundException;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
public class UserServiceImpl extends ExtendedServiceImpl<User> implements UserService {

  private final BCryptPasswordEncoder passwordEncoder;
  private final GroupService groupService;
  private final RoleService roleService;

  private final UserRepository userRepository;
  private final Logger logger;

  @Autowired
  public UserServiceImpl(UserRepository repository,
                         BCryptPasswordEncoder passwordEncoder,
                         GroupService groupService,
                         RoleService roleService,
                         UserRepository userRepository, Logger logger) {
    super(repository,logger);
    this.passwordEncoder = passwordEncoder;
    this.groupService = groupService;
    this.roleService = roleService;
    this.userRepository = userRepository;
    this.logger = logger;
  }

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    return ((UserRepository) repository).findByEmail(email)
                                        .map(UserDetailsImpl::new)
                                        .orElseThrow(() -> new UsernameNotFoundException(email));
  }
  @Override
  public User register(User user) {
    logger.trace("encoding users password");
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    logger.info("encoded users password");
    user.addRole(roleService.findByName("USER"));
    logger.info("added default role to new User");
    return save(user);
  }
  public User addUserToGroup(UUID userId, UUID groupId) throws InstanceNotFoundException {
    logger.trace("fetching user with id: {}", userId);
    Optional<User> optionalUser= repository.findById(userId);
    if (optionalUser.isPresent()) {
      User user = optionalUser.get();
        user.setGroup(groupService.findById(groupId));
        logger.info("added user to group");
        return save(user);
    }
    throw new InstanceNotFoundException();
  }

  @Override
  public User updateUser(UUID userId, UpdateUserDTO dto) throws InstanceNotFoundException {
    if (repository.existsById(userId)) {
      User user = repository.findById(userId).get();
      user.setEmail(dto.getEmail());
      user.setFirstName(dto.getFirstName());
      user.setLastName(dto.getLastName());
      user.setGroup(dto.getGroup() != null ? groupService.findById(dto.getGroup().getId()) : null);
      return save(user);
    }
    throw new InstanceNotFoundException("User doesn't exist");
  }

}
