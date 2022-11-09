package com.example.demo.domain.group.dto;

import com.example.demo.core.generic.ExtendedMapper;
import com.example.demo.domain.group.Group;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface GroupMapper extends ExtendedMapper<Group, GroupDTO> {

    @AfterMapping
    default void linkMembers(@MappingTarget Group group) {
        if (group.getMembers() != null) {
            group.getMembers().forEach(member -> member.setGroup(group));
        }
    }
}
