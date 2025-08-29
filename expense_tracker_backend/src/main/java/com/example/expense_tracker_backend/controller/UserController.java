package com.example.expense_tracker_backend.controller;

import com.example.expense_tracker_backend.dto.request.ResetPasswordRequestDto;
import com.example.expense_tracker_backend.dto.responses.ApiResponseDto;
import com.example.expense_tracker_backend.exceptions.RoleNotFoundException;
import com.example.expense_tracker_backend.exceptions.UserNotFoundException;
import com.example.expense_tracker_backend.exceptions.UserServiceLogicException;
import com.example.expense_tracker_backend.service.AuthService;
import com.example.expense_tracker_backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/mywallet/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    private final AuthService authService;

    @GetMapping("/getAll")
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponseDto<?>> getAllUsers(@Param("pageNumber") int pageNumber,
                                                         @Param("pageSize") int pageSize,
                                                         @Param("searchKey") String searchKey)
            throws RoleNotFoundException, UserServiceLogicException {
        return userService.getAllUsers(pageNumber, pageSize, searchKey);
    }

    @DeleteMapping("/disable")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponseDto<?>> disableUser(@Param("userId") long userId)
            throws UserNotFoundException, UserServiceLogicException {
        return userService.enableOrDisableUser(userId);
    }

    @PutMapping("/enable")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponseDto<?>> enableUser(@Param("userId") long userId)
            throws UserNotFoundException, UserServiceLogicException {
        return userService.enableOrDisableUser(userId);
    }

    @PostMapping("/settings/changePassword")
//    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponseDto<?>> changePassword(@RequestBody @Valid ResetPasswordRequestDto resetPasswordRequestDto)
            throws UserNotFoundException, UserServiceLogicException {
        return authService.resetPassword(resetPasswordRequestDto);
    }

    @PostMapping("/settings/profileImg")
//    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponseDto<?>> uploadProfileImg(@RequestParam("email") String email, @RequestParam("file") @Valid MultipartFile file)
            throws UserNotFoundException, UserServiceLogicException {
        return userService.uploadProfileImg(email, file);
    }

    @GetMapping("/settings/profileImg")
//    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponseDto<?>> getProfileImg(@RequestParam("email") String email)
            throws UserNotFoundException, UserServiceLogicException, IOException {
        return userService.getProfileImg(email);
    }

    @DeleteMapping("/settings/profileImg")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponseDto<?>> deleteProfileImg(@RequestParam("email") String email)
            throws UserNotFoundException, UserServiceLogicException, IOException {
        return userService.deleteProfileImg(email);
    }

    @GetMapping("/settings/profile")
//    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponseDto<?>> getProfile(@RequestParam("email") String email)
            throws UserNotFoundException, UserServiceLogicException, IOException {
        return userService.getProfileImg(email);
    }
}