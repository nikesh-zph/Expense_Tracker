    package com.example.expense_tracker_backend.controller;

    import com.example.expense_tracker_backend.dto.request.ResetPasswordRequestDto;
    import com.example.expense_tracker_backend.dto.responses.ApiResponseDto;
    import com.example.expense_tracker_backend.exceptions.UserNotFoundException;
    import com.example.expense_tracker_backend.exceptions.UserServiceLogicException;
    import com.example.expense_tracker_backend.exceptions.UserVerificationFailedException;
    import com.example.expense_tracker_backend.service.AuthService;
    import jakarta.validation.Valid;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.data.repository.query.Param;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;

    @RestController
    @RequestMapping("/mywallet/auth/forgotPassword")
    public class ForgotPasswordController {

        @Autowired
        private AuthService authService;

        @GetMapping("/verifyEmail")
        public ResponseEntity<ApiResponseDto<?>> verifyEmail(@Param("email") String email)
                throws UserNotFoundException, UserServiceLogicException {
            return authService.verifyEmailAndSendForgotPasswordVerificationEmail(email);
        }

        @GetMapping("/verifyCode")
        public ResponseEntity<ApiResponseDto<?>> verifyCode(@Param("code") String code)
                throws UserVerificationFailedException, UserServiceLogicException {
            return authService.verifyForgotPasswordVerification(code);
        }

        @PostMapping("/resetPassword")
        public ResponseEntity<ApiResponseDto<?>> resetPassword(@RequestBody @Valid ResetPasswordRequestDto resetPasswordDto)
                throws UserNotFoundException, UserServiceLogicException {
            return authService.resetPassword(resetPasswordDto);
        }

        @GetMapping("/resendEmail")
        public ResponseEntity<ApiResponseDto<?>> resendEmail(@Param("email") String email)
                throws UserNotFoundException, UserServiceLogicException {
            return authService.verifyEmailAndSendForgotPasswordVerificationEmail(email);
        }
    }