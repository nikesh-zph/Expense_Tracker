package com.example.expense_tracker_backend.service.impls;

import com.example.expense_tracker_backend.dto.request.BudgetRequest;
import com.example.expense_tracker_backend.dto.responses.ApiResponseDto;
import com.example.expense_tracker_backend.entity.Budget;
import com.example.expense_tracker_backend.entity.Category;
import com.example.expense_tracker_backend.entity.Transaction;
import com.example.expense_tracker_backend.entity.User;
import com.example.expense_tracker_backend.enums.ApiResponseStatus;
import com.example.expense_tracker_backend.exceptions.UserNotFoundException;
import com.example.expense_tracker_backend.exceptions.UserServiceLogicException;
import com.example.expense_tracker_backend.repo.BudgetRepository;
import com.example.expense_tracker_backend.repo.CategoryRepository;
import com.example.expense_tracker_backend.repo.TransactionRepository;
import com.example.expense_tracker_backend.repo.UserRepo;
import com.example.expense_tracker_backend.service.BudgetService;

import com.example.expense_tracker_backend.service.NotificationService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;


@Component
public class BudgetServiceImpl implements BudgetService {

    @Autowired
    private BudgetRepository budgetRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private NotificationService notificationService;

    @Override
    public ResponseEntity<ApiResponseDto<?>> createBudget(BudgetRequest budgetRequest)
            throws UserNotFoundException, UserServiceLogicException {

        if (!userRepository.existsById(budgetRequest.getUserId())) {
            throw new UserNotFoundException("User not found with id " + budgetRequest.getUserId());
        }

        Category category = categoryRepository.findById(budgetRequest.getCategoryId())
                .orElseThrow(() -> new UserServiceLogicException("Category not found"));

        try {
            Budget budget = budgetRepository.findByUserIdAndMonthAndYearAndCategory(
                    budgetRequest.getUserId(),
                    budgetRequest.getMonth(),
                    budgetRequest.getYear(),
                    category
            );

            if (budget == null) {
                budget = new Budget(
                        budgetRequest.getUserId(),
                        budgetRequest.getAmount(),
                        budgetRequest.getMonth(),
                        budgetRequest.getYear(),
                        category
                );
            } else {
                budget.setAmount(budgetRequest.getAmount());
            }

            budgetRepository.save(budget);

            return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponseDto<>(
                    ApiResponseStatus.SUCCESS,
                    HttpStatus.CREATED,
                    "Budget created successfully!"
            ));
        } catch (Exception e) {
            throw new UserServiceLogicException("Failed to create budget: Try again later!");
        }
    }

    @Override
    public ResponseEntity<ApiResponseDto<?>> getBudgetByMonthAndCategory(long userId, int month, long year, int categoryId)
            throws UserServiceLogicException {

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new UserServiceLogicException("Category not found"));


        try {
            Budget budget = budgetRepository.findByUserIdAndMonthAndYearAndCategory(userId, month, year, category);
            double amount = budget == null ? 0 : budget.getAmount();

            return ResponseEntity.status(HttpStatus.OK).body(new ApiResponseDto<>(
                    ApiResponseStatus.SUCCESS,
                    HttpStatus.OK,
                    amount
            ));
        } catch (Exception e) {
            throw new UserServiceLogicException("Failed to fetch budget: Try again later!");
        }
    }
    @Override
    public ResponseEntity<ApiResponseDto<?>> getTotalBudgetByMonth(long userId, int month, long year)
            throws UserServiceLogicException {
        try {
            double totalAmount = budgetRepository.getTotalBudgetByUserIdAndMonthAndYear(userId, month, year);
            return ResponseEntity.status(HttpStatus.OK).body(new ApiResponseDto<>(
                    ApiResponseStatus.SUCCESS,
                    HttpStatus.OK,
                    totalAmount
            ));
        } catch (Exception e) {
            throw new UserServiceLogicException("Failed to fetch total budget: Try again later!");
        }
    }

    @Override
    public ResponseEntity<ApiResponseDto<?>> getLimitBudgetByMonthAndCategory(long userId, int month, long year, int categoryId) throws UserServiceLogicException, UserNotFoundException, MessagingException, UnsupportedEncodingException {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new UserServiceLogicException("Category not found"));

        Budget budget = budgetRepository.findByUserIdAndMonthAndYearAndCategory(userId, month, year, category);
        double budgetAmount = budget == null ? 0 : budget.getAmount();
        Double transactionAmount = transactionRepository.findTotalByUserIdAndCategory(userId, categoryId, month, year);
        transactionAmount = (transactionAmount != null) ? transactionAmount : 0.0;
        double remainingAmount = budgetAmount - transactionAmount;
        Map<String, Object> response  = new HashMap<>();
        response.put("budgetAmount", budgetAmount);
        response.put("transactionAmount", transactionAmount);
        response.put("remainingAmount", remainingAmount);
        String message = "You have reached the limit for " + category.getCategoryName();
       String email =  userRepository.findEmailById(userId);
        if( (!(transactionAmount == 0)) &&transactionAmount >= budgetAmount) {

            notificationService.sendNotification(email, message, "Limit Reached" );
        }

        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponseDto<>(
                ApiResponseStatus.SUCCESS,
                HttpStatus.OK,
                response
        ));
    }
}
