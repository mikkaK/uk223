package com.example.demo.domain.role.authority.dto;

import com.example.demo.core.generic.ExtendedMapper;
import com.example.demo.domain.role.authority.Authority;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AuthorityMapper extends ExtendedMapper<Authority, AuthorityDTO> {
}

