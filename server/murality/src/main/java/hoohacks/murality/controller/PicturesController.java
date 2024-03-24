package hoohacks.murality.controller;

import hoohacks.murality.dto.PhotoDTO;
import hoohacks.murality.entity.Canvas;
import hoohacks.murality.entity.Photo;
import hoohacks.murality.repository.UserRepository;
import hoohacks.murality.service.CanvasService;
import hoohacks.murality.service.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pictures")
public class PicturesController {

    @Autowired
    PhotoService photoService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CanvasService canvasService;


    @GetMapping("/of/{username}")
    public ResponseEntity getPhotosByUsername(@PathVariable String username) {

        List<Photo> photoList = photoService.getPhotosByUsername(username);
        if (photoList.size() == 0) {
            return new ResponseEntity(null, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity(photoList, HttpStatus.OK);
    }

    @GetMapping("/{pid}")
    public ResponseEntity getPhoto(@PathVariable String pid) {
        Long photoId = Long.parseLong(pid);
        Photo photo = photoService.getPhoto(photoId);
        if (photo == null) {
            return new ResponseEntity(null, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity(photo, HttpStatus.OK);
    }

//    @PostMapping("")
//    public ResponseEntity<String> addPhotos(@RequestParam("fileLink") String file,
//                                            @RequestParam("username") String username,
//                                            @RequestParam("album_id") String canvasId,
//                                            @RequestParam("x") String x,
//                                            @RequestParam("y") String y,
//                                            @RequestParam("width") String width,
//                                            @RequestParam("height") String height) {
//        long uid = userRepository.getUserByUsername(username).getUid();
//        long cid = Long.parseLong(canvasId);
//
//        Photo photo = new Photo();
//        photo.setFileLink(file);
//        photo.setUid(uid);
//        photo.setCid(cid);
//        photo.setX(x);
//        photo.setY(y);
//        photo.setWidth(width);
//        photo.setHeight(height);
//
//        try {
//            Canvas canvas = canvasService.getCanvasById(cid);
//            String pictures = canvas.getPictures();
//            if (pictures == null) {
//                pictures = "";
//            }
//            pictures += photo.getPid() + ",";
//            canvas.setPictures(pictures);
//            canvasService.save(canvas);
//        } catch (Exception e) {
//            return new ResponseEntity(null, HttpStatus.NOT_FOUND);
//        }
//        try {
//            photoService.save(photo);
//        } catch (Exception e) {
//            return new ResponseEntity(null, HttpStatus.NOT_FOUND);
//        }
//
//        return new ResponseEntity(null, HttpStatus.CREATED);
//    }

    @PostMapping("/add")
    public ResponseEntity<String> addPhoto(@RequestBody PhotoDTO dto) {
        Photo photo = dto.toPhoto();
        try {
            photoService.save(photo);
        } catch (Exception e) {
            return new ResponseEntity(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(null, HttpStatus.CREATED);
    }

    @PutMapping("/{pid}")
    public ResponseEntity updatePhoto(  @PathVariable String pid,
                                        @RequestParam("x") String x,
                                        @RequestParam("y") String y,
                                        @RequestParam("width") String width,
                                        @RequestParam("height") String height) {
        Long photoId = Long.parseLong(pid);

        Photo photo = photoService.getPhoto(photoId);
        photo.setX(x);
        photo.setY(y);
        photo.setWidth(width);
        photo.setHeight(height);

        photoService.save(photo);
        if (photo == null) {
            return new ResponseEntity(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(null, HttpStatus.OK);
    }

//    @GetMapping("/get/{pid}")
//    public ResponseEntity getPhoto(@PathVariable String pid) {
//        Long photoId = Long.parseLong(pid);
//
//        Photo photo = photoService.getPhoto(photoId);
//        if (photo == null) {
//            return new ResponseEntity(null, HttpStatus.NOT_FOUND);
//        }
//
//        return new ResponseEntity(photo, HttpStatus.OK);
//    }
}
