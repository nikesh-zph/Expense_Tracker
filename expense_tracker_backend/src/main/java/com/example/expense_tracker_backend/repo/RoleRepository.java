package com.example.expense_tracker_backend.repo;

import com.example.expense_tracker_backend.entity.Role;
import com.example.expense_tracker_backend.enums.ERole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
    boolean existsByName(ERole name);
}
