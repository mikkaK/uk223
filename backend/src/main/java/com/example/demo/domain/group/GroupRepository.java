package com.example.demo.domain.group;

import com.example.demo.core.generic.ExtendedRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface GroupRepository extends ExtendedRepository<Group> {
    @Query("select g from Group g inner join g.members members where members.id = ?1")
    Group findByMembers_Id(UUID id);
}
