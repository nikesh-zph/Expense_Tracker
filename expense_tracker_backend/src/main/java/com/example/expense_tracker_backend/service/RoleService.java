package com.example.expense_tracker_backend.service;


import com.example.expense_tracker_backend.entity.Role;
import com.example.expense_tracker_backend.enums.ERole;
import org.springframework.stereotype.Service;

@Service
public interface RoleService {
    Role findByName(ERole eRole);
}