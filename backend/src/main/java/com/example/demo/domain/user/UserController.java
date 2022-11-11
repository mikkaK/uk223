package com.example.demo.domain.user;

import com.example.demo.domain.user.dto.JoinGroupDTO;
import com.example.demo.domain.user.dto.UserDTO;
import com.example.demo.domain.user.dto.UserMapper;
import com.example.demo.domain.user.dto.UserRegisterDTO;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.management.InstanceAlreadyExistsException;
import javax.management.InstanceNotFoundException;
import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@Slf4j
@Validated
@RestController
@RequestMapping("/user")
public class UserController {

  private final UserService userService;
  private final UserMapper userMapper;

  private final Logger logger;

  @Autowired
  public UserController(UserService userService, UserMapper userMapper, Logger logger) {
    this.userService = userService;
    this.userMapper = userMapper;
    this.logger = logger;
  }
  @PreAuthorize(
          "hasAuthority('USER_READ') || @userPermissionEvaluator.hasSameId(authentication.principal.user, #id)")
  @GetMapping("/{id}")
  public ResponseEntity<UserDTO> retrieveById(@PathVariable UUID id) {
    logger.trace("fetching user with id: {}", id);
    User user = userService.findById(id);
    logger.trace("returning user: {} {}", user.getFirstName(), user.getLastName());
    return new ResponseEntity<>(userMapper.toDTO(user), HttpStatus.OK);
  }

  @GetMapping({"", "/"})
  public ResponseEntity<List<UserDTO>> retrieveAll() {
    logger.trace("fetching all users");
    List<User> users = userService.findAll();
    logger.trace("returning all users");
    return new ResponseEntity<>(userMapper.toDTOs(users), HttpStatus.OK);
  }
  @Transactional
  @PostMapping("/register")
  public ResponseEntity<UserDTO> register(@Valid @RequestBody UserRegisterDTO userRegisterDTO) {
    logger.trace("creating new user {} {} with email: {}", userRegisterDTO.getFirstName(), userRegisterDTO.getLastName(), userRegisterDTO.getEmail());
    User user = userService.register(userMapper.fromUserRegisterDTO(userRegisterDTO));
    logger.info("created new user with id: {}", user.getId());
    return new ResponseEntity<>(userMapper.toDTO(user), HttpStatus.CREATED);
  }
  @Transactional
  @PutMapping("/")
  public ResponseEntity<UserDTO> addUserToGroup(@Valid @RequestBody JoinGroupDTO dto) throws InstanceAlreadyExistsException, InstanceNotFoundException {
    logger.trace("adding user with id: {} to group with id: {}", dto.getUserId(), dto.getGroupId());
    User user = userService.addUserToGroup(dto.getUserId(), dto.getGroupId());
    logger.info("added user with id: {} to group with id: {}",dto.getUserId(), dto.getGroupId());
    return new ResponseEntity<>(userMapper.toDTO(user), HttpStatus.OK);
  }
  @Transactional
  @PutMapping("/{id}")
  @PreAuthorize(
      "hasAuthority('USER_MODIFY') || @userPermissionEvaluator.hasSameId(authentication.principal.user, #id)")
  public ResponseEntity<UserDTO> updateById(@PathVariable UUID id, @Valid @RequestBody UserDTO userDTO) {
    logger.trace("updating user with id: {}", userDTO.getId());
    User user = userService.updateById(id, userMapper.fromDTO(userDTO));
    logger.info("updated user with id: {}", user.getId());
    return new ResponseEntity<>(userMapper.toDTO(user), HttpStatus.OK);
  }
  @Transactional
  @DeleteMapping("/{id}")
  @PreAuthorize("hasAuthority('USER_DELETE')")
  public ResponseEntity<Void> deleteById(@PathVariable UUID id) {
    logger.trace("deleting user with id: {}", id);
    userService.deleteById(id);
    logger.info("user deleted");
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
