//package com.example.expense_tracker_backend.service.util;
//
//
//import com.google.zxing.*;
//import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
//import com.google.zxing.client.j2se.MatrixToImageWriter;
//
//import javax.imageio.ImageIO;
//import java.awt.image.BufferedImage;
//import java.io.*;
//
//public class QRCodeUtil {
//
//    /**
//     * Generate QR code PNG bytes from a string (usually JSON)
//     * @param text input string to encode
//     * @return PNG image bytes
//     * @throws Exception
//     */
//    public static byte[] generateQRCode(String text) throws Exception {
//        int width = 300;
//        int height = 300;
//
//        BitMatrix bitMatrix = new MultiFormatWriter()
//                .encode(text, BarcodeFormat.QR_CODE, width, height);
//
//        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
//        MatrixToImageWriter.writeToStream(bitMatrix, "PNG", outputStream);
//
//        return outputStream.toByteArray();
//    }
//
//    /**
//     * Read QR code from InputStream and return decoded string (JSON)
//     * @param input InputStream of QR image file
//     * @return Decoded string from QR code
//     * @throws Exception
//     */
//    public static String readQRCode(InputStream input) throws Exception {
//        BufferedImage bufferedImage = ImageIO.read(input);
//        if (bufferedImage == null) {
//            throw new IllegalArgumentException("Could not read image from input");
//        }
//
//        LuminanceSource source = new BufferedImageLuminanceSource(bufferedImage);
//        BinaryBitmap bitmap = new BinaryBitmap(new HybridBinarizer(source));
//
//        Result result = new MultiFormatReader().decode(bitmap);
//        return result.getText();
//    }
//}
