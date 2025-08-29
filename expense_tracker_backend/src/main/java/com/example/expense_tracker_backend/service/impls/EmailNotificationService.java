package com.example.expense_tracker_backend.service.impls;

import com.example.expense_tracker_backend.dto.responses.ApiResponseDto;
import com.example.expense_tracker_backend.entity.Notification;
import com.example.expense_tracker_backend.entity.User;
import com.example.expense_tracker_backend.enums.ApiResponseStatus;
import com.example.expense_tracker_backend.repo.NotificationRepository;
import com.example.expense_tracker_backend.service.NotificationService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.aspectj.weaver.ast.Not;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.util.List;

@Component
public class EmailNotificationService implements NotificationService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private NotificationRepository notificationRepository;

    @Value("${spring.mail.username}")
    private String fromMail;

    @Override
    public void sendUserRegistrationVerificationEmail(User user) throws MessagingException, UnsupportedEncodingException {
        String toAddress = user.getEmail();
        String fromAddress = fromMail;
        String senderName = "Company";
        String subject = "Please verify your registration";
        String content = "Dear " + user.getUsername() + ",<br><br>"
                + "<p>Thank you for joining us! We are glad to have you on board.</p><br>"
                + "<p>To complete the sign up process, enter the verification code in your device.</p><br>"
                + "<p>verification code: <strong>" + user.getVerificationCode() + "</strong></p><br>"
                + "<p><strong>Please note that the above verification code will be expired within 15 minutes.</strong></p>"
                + "<br>Thank you,<br>"
                + "Your company name.";

        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        helper.setText(content, true);

        javaMailSender.send(message);
    }



    public void sendForgotPasswordVerificationEmail(User user) throws MessagingException, UnsupportedEncodingException {
        String toAddress = user.getEmail();
        String fromAddress = fromMail;
        String senderName = "Company";
        String subject = "Forgot password - Please verify your Account";
        String content = "Dear " + user.getUsername() + ",<br><br>"
                + "<p>To change your password, enter the verification code in your device.</p><br>"
                + "<p>verification code: <strong>" + user.getVerificationCode() + "</strong></p><br>"
                + "<p><strong>Please note that the above verification code will be expired within 15 minutes.</strong></p>"
                + "<br>Thank you,<br>"
                + "Your company name.";

        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        helper.setText(content, true);

        javaMailSender.send(message);
    }

    @Override
    public void sendNotification(String email, String message, String type) throws MessagingException, UnsupportedEncodingException {
        Notification notification = Notification.builder()
                .email(email)
                .message(message)
                .type(type)
                .isRead(false)
                .timestamp(LocalDateTime.now())
                .build();
        notificationRepository.save(notification);
        MimeMessage message1 = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message1);
        helper.setFrom(fromMail, "Company");
        helper.setTo(email);
        helper.setSubject(type);
        helper.setText(message, true);
        javaMailSender.send(message1);

    }

    @Override
    public ResponseEntity<ApiResponseDto<?>> getUserNotifications(String email) {
        List<Notification> response =  notificationRepository.findByEmailOrderByTimestampDesc(email);
        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponseDto<>(
                ApiResponseStatus.SUCCESS,
                HttpStatus.OK,
                response
        ));
    }

    @Override
    public void markAsRead(Long id) {
        notificationRepository.findById(id).ifPresent(notification -> {
            notification.setRead(true);
            notificationRepository.saveAndFlush(notification);
        });
    }

    @Override
    public void markAllAsRead(String email) {
        List<Notification> notifications = notificationRepository.findByEmailOrderByTimestampDesc(email);
        notifications.forEach(n -> n.setRead(true));
        notificationRepository.saveAll(notifications);
    }
}