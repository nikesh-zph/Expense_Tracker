package com.example.expense_tracker_backend.service;

import com.example.expense_tracker_backend.dto.request.SavedTransactionRequestDto;
import com.example.expense_tracker_backend.dto.responses.ApiResponseDto;
import com.example.expense_tracker_backend.exceptions.TransactionNotFoundException;
import com.example.expense_tracker_backend.exceptions.UserNotFoundException;
import com.example.expense_tracker_backend.exceptions.UserServiceLogicException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface SavedTransactionService {
    ResponseEntity<ApiResponseDto<?>> createSavedTransaction(SavedTransactionRequestDto requestDto) throws UserServiceLogicException, UserNotFoundException;
    ResponseEntity<ApiResponseDto<?>> addSavedTransaction(long savedTransactionId) throws UserServiceLogicException, TransactionNotFoundException;
    ResponseEntity<ApiResponseDto<?>> editSavedTransaction(long savedTransactionId, SavedTransactionRequestDto requestDto) throws UserServiceLogicException, TransactionNotFoundException;
    ResponseEntity<ApiResponseDto<?>> deleteSavedTransaction(long savedTransactionId) throws UserServiceLogicException, TransactionNotFoundException;
    ResponseEntity<ApiResponseDto<?>> skipSavedTransaction(long savedTransactionId) throws UserServiceLogicException, TransactionNotFoundException;
    ResponseEntity<ApiResponseDto<?>> getAllTransactionsByUser(long userId) throws UserServiceLogicException, UserNotFoundException;
    ResponseEntity<ApiResponseDto<?>> getAllTransactionsByUserAndMonth(long userId) throws UserServiceLogicException, UserNotFoundException;
    ResponseEntity<ApiResponseDto<?>> getSavedTransactionById(long savedTransactionId) throws UserServiceLogicException, TransactionNotFoundException;
}
