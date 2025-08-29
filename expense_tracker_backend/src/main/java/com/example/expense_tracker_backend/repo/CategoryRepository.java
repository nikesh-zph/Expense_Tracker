package com.example.expense_tracker_backend.repo;

import com.example.expense_tracker_backend.entity.Category;
import com.example.expense_tracker_backend.entity.TransactionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

    boolean existsByCategoryNameAndTransactionType(String categoryName, TransactionType transactionType);

}