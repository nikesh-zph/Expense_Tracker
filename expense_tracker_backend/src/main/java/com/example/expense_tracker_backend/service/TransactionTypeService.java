package com.example.expense_tracker_backend.service;

import com.example.expense_tracker_backend.entity.TransactionType;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TransactionTypeService {
    List<TransactionType> getAllTransactions();

    boolean existsByTransactionTypeId(int transactionTypeId);

    TransactionType getTransactionById(int transactionTypeId);

}