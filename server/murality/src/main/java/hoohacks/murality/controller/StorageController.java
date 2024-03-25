package hoohacks.murality.controller;
import hoohacks.murality.entity.Photo;
import hoohacks.murality.service.PhotoService;
import hoohacks.murality.service.StorageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/storage")
public class StorageController {

    @Autowired
    private StorageService service;

    @Autowired
    private PhotoService photoService;

    @PostMapping("")
    public ResponseEntity<String> uploadFile(@RequestBody byte[] fileBytes) {
        try {
            // Assuming your service can handle a byte array directly
            String fileName = service.uploadFile(fileBytes);

            if (fileName == null) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Failed to upload the file.");
            }

            return ResponseEntity.ok(fileName);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while uploading the file.");
        }
    }

    @GetMapping("/{file_link}")
    public ResponseEntity<?> downloadFile(@PathVariable String file_link) {
        try {
            byte[] data = service.downloadFile(file_link);
            ByteArrayResource resource = new ByteArrayResource(data);
            return ResponseEntity
                    .ok()
                    .contentLength(data.length)
                    .header("Content-type", "application/octet-stream")
                    .header("Content-disposition", "attachment; filename=\"" + file_link + "\"")
                    .body(resource);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/{file_link}")
    public ResponseEntity<String> deleteFile(@PathVariable String file_link) {
        if (!service.deleteFile(file_link)) {
            return new ResponseEntity<>("File not found: " + file_link, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
