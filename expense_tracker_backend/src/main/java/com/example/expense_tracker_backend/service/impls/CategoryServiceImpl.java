package com.example.expense_tracker_backend.service.impls;

import com.example.expense_tracker_backend.dto.request.CategoryRequestDto;
import com.example.expense_tracker_backend.dto.responses.ApiResponseDto;
import com.example.expense_tracker_backend.entity.Category;
import com.example.expense_tracker_backend.enums.ApiResponseStatus;
import com.example.expense_tracker_backend.exceptions.CategoryNotFoundException;
import com.example.expense_tracker_backend.repo.CategoryRepository;
import com.example.expense_tracker_backend.service.CategoryService;
import com.example.expense_tracker_backend.service.TransactionTypeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private TransactionTypeService transactionTypeService;

    @Override
    public ResponseEntity<ApiResponseDto<?>> getCategories() {
        return ResponseEntity.ok(
                new ApiResponseDto<>(
                        ApiResponseStatus.SUCCESS,
                        HttpStatus.OK,
                        categoryRepository.findAll()
                )
        );
    }

    @Override
    public boolean existsCategory(int id) {
        return categoryRepository.existsById(id);
    }

    @Override
    public Category getCategoryById(int id) throws CategoryNotFoundException {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException("Category not found with id" + id));
    }

    @Override
    public ResponseEntity<ApiResponseDto<?>> addNewCategory(CategoryRequestDto categoryRequestDto) throws Exception {

        if (categoryRepository.existsByCategoryNameAndTransactionType(
                categoryRequestDto.getCategoryName(),
                transactionTypeService.getTransactionById(categoryRequestDto.getTransactionTypeId()
                ))) {
            throw new CategoryNotFoundException("Category already found");
        }

        Category category = new Category(
                categoryRequestDto.getCategoryName(),
                transactionTypeService.getTransactionById(categoryRequestDto.getTransactionTypeId()),
                true
        );

        try {
            categoryRepository.save(category);

            return ResponseEntity.status(HttpStatus.CREATED).body(
                    new ApiResponseDto<>(
                            ApiResponseStatus.SUCCESS, HttpStatus.CREATED, "Category has been successfully added!"
                    )
            );
        }catch(Exception e) {
            log.error("Failed to add new category: " + e.getMessage());
            throw new Exception("Failed to add new category: Try again later!");
        }

    }

    @Override
    public ResponseEntity<ApiResponseDto<?>> updateCategory(int categoryId, CategoryRequestDto categoryRequestDto) throws CategoryNotFoundException {

        Category category = getCategoryById(categoryId);

        category.setCategoryName(categoryRequestDto.getCategoryName());
        category.setTransactionType(transactionTypeService.getTransactionById(categoryRequestDto.getTransactionTypeId()));

        try {
            categoryRepository.save(category);

            return ResponseEntity.status(HttpStatus.CREATED).body(
                    new ApiResponseDto<>(
                            ApiResponseStatus.SUCCESS, HttpStatus.CREATED, "Category has been successfully updated!"
                    )
            );
        } catch (Exception e) {
            log.error("Failed to update category: " + e.getMessage());
            throw new CategoryNotFoundException("Category not found");
        }
    }


    @Override
    public ResponseEntity<ApiResponseDto<?>> enableOrDisableCategory(int categoryId) throws CategoryNotFoundException {
        Category category = getCategoryById(categoryId);

        try {

            category.setEnabled(!category.isEnabled());
            categoryRepository.save(category);

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ApiResponseDto<>(
                            ApiResponseStatus.SUCCESS, HttpStatus.OK, "Category has been updated successfully!"
                    )
            );
        }catch(Exception e) {
            log.error("Failed to enable/disable category: " + e.getMessage());
            throw new CategoryNotFoundException("Failed to update category: Try again later!");
        }
    }

}