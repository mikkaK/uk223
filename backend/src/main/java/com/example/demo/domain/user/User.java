package com.example.demo.domain.user;

import com.example.demo.core.generic.ExtendedEntity;
import com.example.demo.domain.group.Group;
import com.example.demo.domain.role.Role;
import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "users")
public class User extends ExtendedEntity {

  @Min(1)
  @Max(40)
  @Column(name = "first_name", nullable = false)
  private String firstName;
  @Min(1)
  @Max(40)
  @Column(name = "last_name", nullable = false)
  private String lastName;

  @Min(1)
  @Max(50)
  @Email
  @Column(name = "email", unique = true, nullable = false)
  private String email;
  @Min(1)
  @Max(40)
  @Column(name = "password", nullable = false)
  private String password;
  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(name = "users_role", joinColumns = @JoinColumn(name = "users_id", referencedColumnName = "id"),
             inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
  private Set<Role> roles = new HashSet<>();

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "group_id")
  @JsonBackReference
  private Group group;

  public void addRole(Role role){
    if (this.roles == null){
      this.roles = new HashSet<>();
    }
    this.roles.add(role);
  }

  public User() {
  }

  public User(UUID id, String firstName, String lastName, String email, String password, Set<Role> roles, Group group) {
    super(id);
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.roles = roles;
    this.group = group;
  }

  public String getFirstName() {
    return firstName;
  }

  public User setFirstName(String firstName) {
    this.firstName = firstName;
    return this;
  }

  public String getLastName() {
    return lastName;
  }

  public User setLastName(String lastName) {
    this.lastName = lastName;
    return this;
  }

  public String getEmail() {
    return email;
  }

  public User setEmail(String email) {
    this.email = email;
    return this;
  }

  public String getPassword() {
    return password;
  }

  public User setPassword(String password) {
    this.password = password;
    return this;
  }

  public Set<Role> getRoles() {
    return roles;
  }

  public User setRoles(Set<Role> roles) {
    this.roles = roles;
    return this;
  }

  public Group getGroup() {
    return group;
  }

  public User setGroup(Group group) {
    this.group = group;
    return this;
  }

}
