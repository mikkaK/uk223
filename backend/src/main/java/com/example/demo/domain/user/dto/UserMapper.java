package com.example.demo.domain.user.dto;

import com.example.demo.core.generic.ExtendedMapper;
import com.example.demo.domain.user.User;
import org.mapstruct.*;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper extends ExtendedMapper<User, UserDTO> {

    User fromUserRegisterDTO(UserRegisterDTO dto);

    User updateUserDTOToUser(UpdateUserDTO updateUserDTO);

    UpdateUserDTO userToUpdateUserDTO(User user);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    User updateUserFromUpdateUserDTO(UpdateUserDTO updateUserDTO, @MappingTarget User user);
}
