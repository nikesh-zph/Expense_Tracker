package com.example.expense_tracker_backend.exceptions;


public class CategoryNotFoundException extends Exception{
    public CategoryNotFoundException(String message) {
        super(message);
    }
}