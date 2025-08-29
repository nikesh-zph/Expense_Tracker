package com.example.expense_tracker_backend.dataSeeders;


import com.example.expense_tracker_backend.entity.TransactionType;
import com.example.expense_tracker_backend.enums.ETransactionType;
import com.example.expense_tracker_backend.repo.TransactionTypeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
@Order(1)
public class TransactionTypeDataSeeder {

    @Autowired
    private TransactionTypeRepository transactionTypeRepository;

    @EventListener
    @Transactional
    public void LoadTransactionTypes(ContextRefreshedEvent event) {
        List<ETransactionType> transactionTypes = Arrays.stream(ETransactionType.values()).toList();
        for(ETransactionType eTransactionType: transactionTypes) {
            if (!transactionTypeRepository.existsByTransactionTypeName(eTransactionType)) {
                transactionTypeRepository.save(new TransactionType(eTransactionType));
            }
        }

    }
}