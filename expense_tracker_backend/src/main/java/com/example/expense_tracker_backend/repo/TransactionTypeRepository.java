package com.example.expense_tracker_backend.repo;

import com.example.expense_tracker_backend.entity.TransactionType;
import com.example.expense_tracker_backend.enums.ETransactionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TransactionTypeRepository extends JpaRepository<TransactionType, Integer> {
    Optional<TransactionType> findById(int id);
    TransactionType findByTransactionTypeName(ETransactionType transactionTypeName);
    boolean existsByTransactionTypeName(ETransactionType transactionTypeName);
}
