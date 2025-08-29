package com.example.expense_tracker_backend.dataSeeders;


import com.example.expense_tracker_backend.entity.Category;
import com.example.expense_tracker_backend.entity.TransactionType;
import com.example.expense_tracker_backend.enums.ETransactionType;
import com.example.expense_tracker_backend.repo.CategoryRepository;
import com.example.expense_tracker_backend.repo.TransactionTypeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Component
@Order(2)
public class CategoryDataSeeder implements CommandLineRunner {
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private TransactionTypeRepository transactionTypeRepository;

    @Override
    public void run(String... args) throws Exception {
        // Fetch transaction types
        Optional<TransactionType> expenseTypeOpt = Optional.ofNullable(transactionTypeRepository.findByTransactionTypeName(ETransactionType.TYPE_EXPENSE));
        Optional<TransactionType> incomeTypeOpt = Optional.ofNullable(transactionTypeRepository.findByTransactionTypeName(ETransactionType.TYPE_INCOME));

        if (expenseTypeOpt.isPresent() && incomeTypeOpt.isPresent()) {
            TransactionType expenseType = expenseTypeOpt.get();
            TransactionType incomeType = incomeTypeOpt.get();

            // Seed expense categories
            List<String> expenseCategories = Arrays.asList("Rent", "Bills", "Groceries", "Transportation", "Healthcare");
            for (String categoryName : expenseCategories) {
                if (!categoryRepository.existsByCategoryNameAndTransactionType(categoryName, expenseType)) {
                    Category category = new Category();
                    category.setCategoryName(categoryName);
                    category.setTransactionType(expenseType);
                    category.isEnabled();
                    categoryRepository.save(category);
                }
            }

            // Seed income categories
            List<String> incomeCategories = Arrays.asList("Salary", "Freelance", "Investments", "Gifts", "Other");
            for (String categoryName : incomeCategories) {
                if (!categoryRepository.existsByCategoryNameAndTransactionType(categoryName, incomeType)) {
                    Category category = new Category();
                    category.setCategoryName(categoryName);
                    category.setTransactionType(incomeType);
                    category.isEnabled();
                    categoryRepository.save(category);
                }
            }
        } else {
            throw new RuntimeException("Transaction types not found. Ensure they are seeded before categories.");
        }
    }
}
