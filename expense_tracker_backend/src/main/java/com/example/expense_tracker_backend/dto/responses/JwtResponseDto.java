package com.example.expense_tracker_backend.dto.responses;

import lombok.Builder;
import lombok.Data;
import org.springframework.core.io.Resource;

import java.util.List;

@Data
@Builder
public class JwtResponseDto {
    private String token;
    private String type;
    private Long id;
    private String username;
    private String email;
    private List<String> roles;
}