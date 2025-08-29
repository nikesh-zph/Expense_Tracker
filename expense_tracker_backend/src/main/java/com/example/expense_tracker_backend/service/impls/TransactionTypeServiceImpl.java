package com.example.expense_tracker_backend.service.impls;

import com.example.expense_tracker_backend.entity.TransactionType;
import com.example.expense_tracker_backend.repo.TransactionTypeRepository;
import com.example.expense_tracker_backend.service.TransactionTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class TransactionTypeServiceImpl implements TransactionTypeService {
    @Autowired
    private TransactionTypeRepository transactionTypeRepository;

    @Override
    public List<TransactionType> getAllTransactions() {
        return transactionTypeRepository.findAll();
    }

    @Override
    public boolean existsByTransactionTypeId(int transactionTypeId) {
        return transactionTypeRepository.existsById(transactionTypeId);
    }

    @Override
    public TransactionType getTransactionById(int transactionTypeId)  {
        return transactionTypeRepository.findById(transactionTypeId).orElseThrow();
    }


}