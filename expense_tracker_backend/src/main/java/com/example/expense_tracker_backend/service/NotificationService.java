package com.example.expense_tracker_backend.service;

import com.example.expense_tracker_backend.dto.responses.ApiResponseDto;
import com.example.expense_tracker_backend.entity.Notification;
import com.example.expense_tracker_backend.entity.User;
import jakarta.mail.MessagingException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.List;

@Service
public interface NotificationService {

    void sendUserRegistrationVerificationEmail(User user) throws MessagingException, UnsupportedEncodingException;

    void sendForgotPasswordVerificationEmail(User user) throws MessagingException, UnsupportedEncodingException;

    void sendNotification(String email, String message, String type) throws MessagingException, UnsupportedEncodingException;

    ResponseEntity<ApiResponseDto<?>> getUserNotifications(String email);

        void markAsRead(Long id);

        void markAllAsRead(String email);
    }


