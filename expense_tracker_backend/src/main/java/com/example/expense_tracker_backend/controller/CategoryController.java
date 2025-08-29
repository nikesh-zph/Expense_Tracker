package com.example.expense_tracker_backend.controller;

import com.example.expense_tracker_backend.dto.request.CategoryRequestDto;
import com.example.expense_tracker_backend.dto.responses.ApiResponseDto;
import com.example.expense_tracker_backend.exceptions.CategoryNotFoundException;
import com.example.expense_tracker_backend.service.CategoryService;
import com.example.expense_tracker_backend.service.TransactionTypeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mywallet/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("/getAll")
//    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponseDto<?>> getAllCategories() {
        return categoryService.getCategories();
    }

    @PostMapping("/new")
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponseDto<?>> addNewCategory(@RequestBody @Valid CategoryRequestDto categoryRequestDto) throws Exception {
        return categoryService.addNewCategory(categoryRequestDto);
    }

    @PutMapping("/update")
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponseDto<?>> updateCategory(@Param ("categoryId") int categoryId,
                                                            @RequestBody @Valid CategoryRequestDto categoryRequestDto) throws CategoryNotFoundException {
        return categoryService.updateCategory(categoryId, categoryRequestDto);
    }

    @DeleteMapping("/delete")
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponseDto<?>> disableOrEnableCategory(@Param ("categoryId") int categoryId)
            throws  CategoryNotFoundException {
        return categoryService.enableOrDisableCategory(categoryId);
    }

}
