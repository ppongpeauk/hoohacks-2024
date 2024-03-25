package hoohacks.murality.service;

import hoohacks.murality.entity.User;
import hoohacks.murality.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;


    public User getUser(String username) {

        return null;
    }


    public User updateUser(RequestBody request) {


        return null;
    }


    public User deleteUser(String username) {

        return null;
    }

}
