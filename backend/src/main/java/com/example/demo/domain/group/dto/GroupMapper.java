package com.example.demo.domain.group.dto;

import com.example.demo.core.generic.ExtendedMapper;
import com.example.demo.core.generic.ExtendedService;
import com.example.demo.domain.group.Group;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface GroupMapper extends ExtendedMapper<Group, GroupDTO> {

}
