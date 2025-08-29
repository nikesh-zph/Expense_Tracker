package com.example.expense_tracker_backend.controller;

import com.example.expense_tracker_backend.dto.request.NotificationRequest;
import com.example.expense_tracker_backend.dto.responses.ApiResponseDto;
import com.example.expense_tracker_backend.service.NotificationService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
@CrossOrigin
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping("/{email}")
    public ResponseEntity<ApiResponseDto<?>> getNotifications(@PathVariable String email) {
        return notificationService.getUserNotifications(email);
    }

    @PostMapping("/mark-read/{id}")
    public void markAsRead(@PathVariable Long id) {
        notificationService.markAsRead(id);
    }

    @PostMapping("/mark-all-read/{email}")
    public void markAllAsRead(@PathVariable String email) {
        notificationService.markAllAsRead(email);
    }


    @PostMapping("/send")
    public ResponseEntity<String> sendNotification(@RequestBody NotificationRequest request) throws MessagingException, UnsupportedEncodingException {
        notificationService.sendNotification(request.getEmail(), request.getMessage(), request.getType());
        return ResponseEntity.ok("Notification sent successfully");
    }
}
