package com.example.demo.domain.user.dto;

import com.example.demo.core.generic.ExtendedDTO;
import com.example.demo.domain.role.dto.RoleDTO;

import javax.validation.constraints.Email;
import java.util.Set;
import java.util.UUID;

public class UserRegisterDTO extends ExtendedDTO {

  private String firstName;

  private String lastName;

  @Email
  private String email;

  private String password;

  private Set<RoleDTO> roles;


  public UserRegisterDTO() {
  }

  public UserRegisterDTO(UUID id, String firstName, String lastName, String email, String password, Set<RoleDTO> roles) {
    super(id);
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.roles = roles;
  }

  public String getFirstName() {
    return firstName;
  }

  public UserRegisterDTO setFirstName(String firstName) {
    this.firstName = firstName;
    return this;
  }

  public String getLastName() {
    return lastName;
  }

  public UserRegisterDTO setLastName(String lastName) {
    this.lastName = lastName;
    return this;
  }

  public String getEmail() {
    return email;
  }

  public UserRegisterDTO setEmail(String email) {
    this.email = email;
    return this;
  }

  public String getPassword() {
    return password;
  }

  public UserRegisterDTO setPassword(String password) {
    this.password = password;
    return this;
  }

  public Set<RoleDTO> getRoles() {
    return roles;
  }

  public UserRegisterDTO setRoles(Set<RoleDTO> roles) {
    this.roles = roles;
    return this;
  }
}
