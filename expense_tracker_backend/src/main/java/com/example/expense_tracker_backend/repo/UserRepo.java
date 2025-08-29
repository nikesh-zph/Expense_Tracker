package com.example.expense_tracker_backend.repo;

import com.example.expense_tracker_backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    User findByVerificationCode(String verificationCode);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    @Query("SELECT u.email FROM User u WHERE u.id = :id")
    String findEmailById(@Param("id") long id);


    @Query(value = "SELECT * from users u " +
            "JOIN user_roles ur ON u.id = ur.user_id " +
            "WHERE ur.role_id = :roleId AND (u.username LIKE %:keyword% OR u.email LIKE %:keyword%)", nativeQuery = true)
    Page<User> findAll(Pageable pageable, @Param("roleId") int roleId, @Param("keyword") String keyword);


}
