package com.example.demo.core.logging.domain.role.dto;

import com.example.demo.core.generic.ExtendedMapper;
import com.example.demo.core.logging.domain.role.Role;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface RoleMapper extends ExtendedMapper<Role, RoleDTO> {
}
