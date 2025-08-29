package com.example.expense_tracker_backend.service.impls;

import com.example.expense_tracker_backend.entity.Role;
import com.example.expense_tracker_backend.enums.ERole;
import com.example.expense_tracker_backend.repo.RoleRepository;
import com.example.expense_tracker_backend.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public Role findByName(ERole eRole) {
        return roleRepository.findByName(eRole)
                .orElseThrow(() -> new RuntimeException("Role is not found."));
    }
}