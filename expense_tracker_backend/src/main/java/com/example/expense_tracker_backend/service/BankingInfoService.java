//package com.example.expense_tracker_backend.service;
//
//import com.example.expense_tracker_backend.entity.BankingInfo;
//import com.example.expense_tracker_backend.entity.User;
//import com.example.expense_tracker_backend.repo.BankingInfoRepository;
//import com.example.expense_tracker_backend.service.util.QRCodeUtil;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.util.Optional;
//
//@Service
//public class BankingInfoService {
//
//    @Autowired
//    private BankingInfoRepository bankingInfoRepository;
//
//    @Autowired
//    private ObjectMapper objectMapper;
//
//    /**
//     * Save bank info manually (sets owner)
//     */
//    public BankingInfo saveManual(BankingInfo info, Optional<User> user) {
//        info.setUser(user.orElseThrow());
//        return bankingInfoRepository.save(info);
//    }
//
//    /**
//     * Save bank info from QR (does NOT set owner)
//     */
//    public BankingInfo saveFromQR(MultipartFile file) throws Exception {
//        String json = QRCodeUtil.readQRCode(file.getInputStream());
//        BankingInfo info = objectMapper.readValue(json, BankingInfo.class);
//        info.setUser(null); // no owner
//        return bankingInfoRepository.save(info);
//    }
//}
