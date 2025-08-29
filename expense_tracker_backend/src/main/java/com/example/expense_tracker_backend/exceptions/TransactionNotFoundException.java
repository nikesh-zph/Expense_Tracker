package com.example.expense_tracker_backend.exceptions;

public class TransactionNotFoundException extends Exception {

    public TransactionNotFoundException(String message) {
        super(message);
    }
}

