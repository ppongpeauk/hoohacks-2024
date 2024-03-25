package hoohacks.murality.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.amazonaws.util.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.UUID;

@Service
public class StorageService {

    @Value("${cloud.aws.bucket.name}")
    private String bucketName;

    @Autowired
    private AmazonS3 s3Client;

    public String uploadFile(byte[] fileBytes) {
        String fileName = UUID.randomUUID().toString();

        try {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(fileBytes.length);
            ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(fileBytes);

            PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, fileName, byteArrayInputStream, metadata);

            s3Client.putObject(putObjectRequest);

            return fileName;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public byte[] downloadFile(String fileName) throws IOException {
        S3Object s3Object = null;
        S3ObjectInputStream inputStream = null;
        try {
            s3Object = s3Client.getObject(new GetObjectRequest(bucketName, fileName));
            if (s3Object == null) {
                throw new IOException("File not found: " + fileName);
            }
            inputStream = s3Object.getObjectContent();
            return IOUtils.toByteArray(inputStream);
        } catch (AmazonS3Exception e) {
            throw new IOException("File not found: " + fileName);
        }
    }

    public Boolean deleteFile(String fileName) {
        try {
            s3Client.getObjectMetadata(bucketName, fileName);
        } catch (AmazonS3Exception e) {
            throw new IllegalArgumentException("File not found: " + fileName);
        }

        try {
            s3Client.deleteObject(bucketName, fileName);
        } catch (AmazonS3Exception e) {
            throw new IllegalArgumentException("Error deleting file: " + fileName);
        }
        return true;
    }

    private File convertMultiPartFileToFile(MultipartFile file) {
        File convertedFile = new File(file.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(convertedFile)) {
            fos.write(file.getBytes());
        } catch (IOException e) {
            System.out.println("Error converting multipartFile to file" + e);
        }
        return convertedFile;
    }
}
