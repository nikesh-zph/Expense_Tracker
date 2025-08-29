package com.example.expense_tracker_backend.service;


import com.example.expense_tracker_backend.dto.responses.ApiResponseDto;
import com.example.expense_tracker_backend.dto.responses.TransactionRequestDto;
import com.example.expense_tracker_backend.exceptions.CategoryNotFoundException;
import com.example.expense_tracker_backend.exceptions.TransactionNotFoundException;
import com.example.expense_tracker_backend.exceptions.UserNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface TransactionService {

    ResponseEntity<ApiResponseDto<?>> addTransaction(TransactionRequestDto transactionRequestDto) throws UserNotFoundException, CategoryNotFoundException, TransactionNotFoundException;
    ResponseEntity<ApiResponseDto<?>> getTransactionById(Long Transaction);
    ResponseEntity<ApiResponseDto<?>> updateTransaction(Long transactionId, TransactionRequestDto transactionRequestDto) throws UserNotFoundException, CategoryNotFoundException, TransactionNotFoundException;

    ResponseEntity<ApiResponseDto<?>> deleteTransaction(Long transactionId) throws TransactionNotFoundException;

    ResponseEntity<ApiResponseDto<?>> getAllTransactions(int pageNumber, int pageSize, String searchKey) throws TransactionNotFoundException;

    ResponseEntity<ApiResponseDto<?>> getTransactionsByUser(String email, int pageNumber, int pageSize, String searchKey, String sortField,  String transactionType) throws UserNotFoundException, TransactionNotFoundException;

}
