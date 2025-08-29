package com.example.expense_tracker_backend.controller;

import com.example.expense_tracker_backend.dto.request.SignInRequestDto;
import com.example.expense_tracker_backend.dto.responses.JwtResponseDto;
import com.example.expense_tracker_backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mywallet/auth")
@RequiredArgsConstructor
public class SignInController {

    private final UserService authService;

    @PostMapping("/signin")
    public ResponseEntity<JwtResponseDto> signIn(@RequestBody @Valid SignInRequestDto signInRequestDto)  {
        return authService.signIn(signInRequestDto);
    }
}