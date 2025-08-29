package com.example.expense_tracker_backend.service;

import com.example.expense_tracker_backend.dto.request.BudgetRequest;
import com.example.expense_tracker_backend.dto.responses.ApiResponseDto;
import com.example.expense_tracker_backend.exceptions.UserNotFoundException;
import com.example.expense_tracker_backend.exceptions.UserServiceLogicException;
import jakarta.mail.MessagingException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;

@Service
public interface BudgetService {
    ResponseEntity<ApiResponseDto<?>> createBudget(BudgetRequest budgetRequest) throws UserNotFoundException, UserServiceLogicException;
    ResponseEntity<ApiResponseDto<?>> getBudgetByMonthAndCategory(long userId, int month, long year, int categoryId) throws UserServiceLogicException;
    ResponseEntity<ApiResponseDto<?>> getTotalBudgetByMonth(long userId, int month, long year) throws UserServiceLogicException;
    ResponseEntity<ApiResponseDto<?>> getLimitBudgetByMonthAndCategory(long userId, int month, long year, int categoryId) throws UserServiceLogicException, UserNotFoundException, MessagingException, UnsupportedEncodingException;

}