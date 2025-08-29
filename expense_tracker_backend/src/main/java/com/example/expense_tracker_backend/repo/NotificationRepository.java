package com.example.expense_tracker_backend.repo;

import com.example.expense_tracker_backend.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByEmailOrderByTimestampDesc(String email);
}
