package com.example.demo.domain.user;

import com.example.demo.core.generic.ExtendedRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Repository
public interface UserRepository extends ExtendedRepository<User> {
  Optional<User> findByEmail(String email);


  @Query("select u from User u where u.group.id = :id")
  Set<User> findByGroup_Id(UUID id, PageRequest of);

}
