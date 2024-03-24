package hoohacks.murality.service;

import hoohacks.murality.entity.Photo;
import hoohacks.murality.entity.User;
import hoohacks.murality.repository.PhotoRepository;
import hoohacks.murality.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ResponseStatusException;

import javax.management.RuntimeErrorException;
import java.util.List;
import java.util.Optional;

@Service
public class PhotoService {

    @Autowired
    PhotoRepository photoRepository;

    @Autowired
    UserRepository userRepository;


    public Photo getPhoto(Long pid) {
        Photo photo = null;
        try {
            photo = photoRepository.findPhotoByPid(pid);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        return photo;
    }



    public Photo deletePhoto(Long pid) {
        Photo photo = getPhoto(pid);
        if (photo == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        try {
            photo = photoRepository.deletePhotoByPid(pid);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        return photo;
    }


    public List<Photo> getPhotosByUsername(String username) {
        List<Photo> photos = null;
        Long uid = null;
        try {
            uid = userRepository.getUserByUsername(username).getUid();
            photos = photoRepository.findPhotosByUid(uid);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        return photos;
    }

    public Photo save(Photo photo) {
        try {
            photo = photoRepository.save(photo);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        return photo;
    }
}
