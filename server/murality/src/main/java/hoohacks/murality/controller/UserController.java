package hoohacks.murality.controller;

import hoohacks.murality.entity.User;
import hoohacks.murality.module.Response;
import hoohacks.murality.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("get/{username}")
    public ResponseEntity getUserProfile(@PathVariable String username) {
        // getId by username

        User user = null;
        return new ResponseEntity(user, HttpStatus.OK);
    }

    @PutMapping("update/{username}")
    public ResponseEntity updateUserProfile(RequestBody requestBody) {

        User user = userService.updateUser(requestBody);

        return new ResponseEntity(null, HttpStatus.OK);
    }
}
