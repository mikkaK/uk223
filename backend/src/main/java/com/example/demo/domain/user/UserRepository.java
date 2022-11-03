package com.example.demo.domain.user;

import com.example.demo.core.generic.ExtendedRepository;
import java.util.Optional;
import java.util.UUID;

import com.example.demo.domain.group.Group;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends ExtendedRepository<User> {
  Optional<User> findByEmail(String email);


}
