package com.example.expense_tracker_backend.dto.request;

import lombok.Data;

@Data
public class BudgetRequest {
    private long userId;
    private double amount;
    private int month;
    private long year;
    private int categoryId;
}
