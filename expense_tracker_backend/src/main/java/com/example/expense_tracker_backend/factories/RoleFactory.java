package com.example.expense_tracker_backend.factories;

import com.example.expense_tracker_backend.entity.Role;
import com.example.expense_tracker_backend.enums.ERole;
import com.example.expense_tracker_backend.exceptions.RoleNotFoundException;
import com.example.expense_tracker_backend.service.RoleService;
import org.springframework.stereotype.Component;

@Component
public class RoleFactory {

    private final RoleService roleService;

    public RoleFactory(RoleService roleService) {
        this.roleService = roleService;
    }

    public Role getInstance(String role) throws RoleNotFoundException {
        if (role.equals("admin")) {
            return roleService.findByName(ERole.ROLE_ADMIN);
        } else if (role.equals("user")) {
            return roleService.findByName(ERole.ROLE_USER);
        }
        throw new RoleNotFoundException("Invalid role name: " + role);
    }
}
