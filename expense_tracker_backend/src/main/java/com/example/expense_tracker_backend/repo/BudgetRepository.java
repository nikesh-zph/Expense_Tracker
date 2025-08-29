package com.example.expense_tracker_backend.repo;

import com.example.expense_tracker_backend.entity.Budget;
import com.example.expense_tracker_backend.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
    Budget findByUserIdAndMonthAndYearAndCategory(long userId, int month, long year, Category category);

    @Query("SELECT COALESCE(SUM(b.amount), 0) FROM Budget b WHERE b.userId = :userId AND b.month = :month AND b.year = :year")
    double getTotalBudgetByUserIdAndMonthAndYear(@Param("userId") long userId,
                                                 @Param("month") int month,
                                                 @Param("year") long year);
}
