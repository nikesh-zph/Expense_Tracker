package com.example.expense_tracker_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Budget {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long budgetId;

    private long userId;
    private double amount;
    private int month;
    private long year;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    public Budget(long userId, double amount, int month, long year, Category category) {
        this.userId = userId;
        this.amount = amount;
        this.month = month;
        this.year = year;
        this.category = category;
    }
}
