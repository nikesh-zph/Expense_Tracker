package com.example.expense_tracker_backend.repo;

import com.example.expense_tracker_backend.entity.SavedTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SavedTransactionRepository  extends JpaRepository<SavedTransaction, Long> {
    List<SavedTransaction> findByUserIdOrderByUpcomingDateAsc(long userId);
}
