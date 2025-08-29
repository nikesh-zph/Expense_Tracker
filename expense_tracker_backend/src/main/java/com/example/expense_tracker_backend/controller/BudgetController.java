package com.example.expense_tracker_backend.controller;

import com.example.expense_tracker_backend.dto.request.BudgetRequest;
import com.example.expense_tracker_backend.dto.responses.ApiResponseDto;
import com.example.expense_tracker_backend.exceptions.UserNotFoundException;
import com.example.expense_tracker_backend.exceptions.UserServiceLogicException;
import com.example.expense_tracker_backend.service.BudgetService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mywallet/budget")
public class BudgetController {

    private final BudgetService budgetService;

    @PostMapping("/create")
    public ResponseEntity<ApiResponseDto<?>> createBudget(@RequestBody BudgetRequest budgetRequest)
            throws UserNotFoundException, UserServiceLogicException {
        return budgetService.createBudget(budgetRequest);
    }

    @GetMapping("/getByCategory")
    public ResponseEntity<ApiResponseDto<?>> getBudgetByMonthAndCategory(@RequestParam long userId,
                                                              @RequestParam int month,
                                                              @RequestParam long year,
                                                              @RequestParam int categoryId)
            throws UserServiceLogicException {
        return budgetService.getBudgetByMonthAndCategory(userId, month, year, categoryId);
    }

    @GetMapping("/getTotal")
    public ResponseEntity<ApiResponseDto<?>> getBudgetByMonth(@RequestParam long userId,
                                                              @RequestParam int month,
                                                              @RequestParam long year)
            throws UserServiceLogicException {
        return budgetService.getTotalBudgetByMonth(userId, month, year);
    }

    @GetMapping("/getLimit")
    public ResponseEntity<ApiResponseDto<?>> getBudgetLimit(@RequestParam long userId,
                                                              @RequestParam int month,
                                                              @RequestParam long year,
                                                            @RequestParam int categoryId)
            throws UserServiceLogicException, UserNotFoundException, MessagingException, UnsupportedEncodingException {
        return budgetService.getLimitBudgetByMonthAndCategory(userId, month, year, categoryId);
    }
}

