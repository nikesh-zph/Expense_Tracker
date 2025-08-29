package com.example.expense_tracker_backend.dto.responses;


import com.example.expense_tracker_backend.enums.ApiResponseStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
public class ApiResponseDto<T> {
    private ApiResponseStatus status;

    private HttpStatus httpStatus;

    private T response;

}
