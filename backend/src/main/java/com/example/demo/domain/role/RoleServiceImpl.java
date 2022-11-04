package com.example.demo.domain.role;

import com.example.demo.core.generic.ExtendedRepository;
import com.example.demo.core.generic.ExtendedServiceImpl;
import org.slf4j.Logger;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl extends ExtendedServiceImpl<Role> implements RoleService {

private final RoleRepository roleRepository;
    protected RoleServiceImpl(ExtendedRepository<Role> repository, Logger logger, RoleRepository roleRepository) {
        super(repository, logger);
        this.roleRepository = roleRepository;
    }


    @Override
    public Role findByName(String name) {
        return roleRepository.findByName(name);
    }
}
