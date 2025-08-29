package com.example.expense_tracker_backend.controller;


import com.example.expense_tracker_backend.dto.request.SignUpRequestDto;
import com.example.expense_tracker_backend.dto.responses.ApiResponseDto;
import com.example.expense_tracker_backend.exceptions.UserAlreadyExistsException;
import com.example.expense_tracker_backend.exceptions.UserNotFoundException;
import com.example.expense_tracker_backend.exceptions.UserServiceLogicException;
import com.example.expense_tracker_backend.exceptions.UserVerificationFailedException;
import com.example.expense_tracker_backend.service.AuthService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/mywallet/auth")
@RequiredArgsConstructor
public class SignUpController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<ApiResponseDto<?>> registerUser(@RequestBody @Valid SignUpRequestDto signUpRequestDto) throws MessagingException, UnsupportedEncodingException, UserAlreadyExistsException, UserServiceLogicException {
        return authService.save(signUpRequestDto);
    }

    @GetMapping("/signup/verify")
    public ResponseEntity<ApiResponseDto<?>> verifyUserRegistration(@Param("code") String code) throws UserVerificationFailedException {
        return authService.verifyRegistrationVerification(code);
    }

    @GetMapping("/signup/resend")
    public ResponseEntity<ApiResponseDto<?>> resendVerificationCode(@Param("email") String email) throws UserNotFoundException, MessagingException, UnsupportedEncodingException, UserServiceLogicException {
        return authService.resendVerificationCode(email);
    }

}
