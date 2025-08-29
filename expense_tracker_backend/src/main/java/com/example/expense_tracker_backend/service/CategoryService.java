package com.example.expense_tracker_backend.service;

import com.example.expense_tracker_backend.dto.request.CategoryRequestDto;
import com.example.expense_tracker_backend.dto.responses.ApiResponseDto;
import com.example.expense_tracker_backend.entity.Category;
import com.example.expense_tracker_backend.exceptions.CategoryNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface CategoryService {

    ResponseEntity<ApiResponseDto<?>> getCategories();

    boolean existsCategory(int id);

    Category getCategoryById(int id) throws CategoryNotFoundException;

    ResponseEntity<ApiResponseDto<?>> addNewCategory(CategoryRequestDto categoryRequestDto) throws Exception;

    ResponseEntity<ApiResponseDto<?>> updateCategory(int categoryId, CategoryRequestDto categoryRequestDto) throws CategoryNotFoundException;

    ResponseEntity<ApiResponseDto<?>> enableOrDisableCategory(int categoryId) throws CategoryNotFoundException;
}
