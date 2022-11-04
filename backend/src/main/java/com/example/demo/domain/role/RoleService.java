package com.example.demo.domain.role;

import com.example.demo.core.generic.ExtendedService;

public interface RoleService extends ExtendedService<Role> {

    Role findByName(String name);
}
