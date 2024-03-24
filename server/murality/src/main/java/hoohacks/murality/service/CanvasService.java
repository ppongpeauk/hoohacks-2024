package hoohacks.murality.service;

import hoohacks.murality.entity.Canvas;
import hoohacks.murality.entity.User;
import hoohacks.murality.repository.CanvasRepository;
import hoohacks.murality.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Service
public class CanvasService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    CanvasRepository canvasRepository;

    public List<Canvas> getCanvas(String userName) {
        User user = userRepository.getUserByUsername(userName);
        // checker

        Long uid = user.getUid();
        List<Canvas> canvasList = canvasRepository.findAllByUidOrderByLastModifyTime(uid);

        return canvasList;
    }

    public Canvas getCanvasById(Long cid) {
        return canvasRepository.findCanvasByCid(cid);
    }

    public Canvas deleteCanvas(String userName) {

        return null;
    }

    public void save(Canvas canvas) {
        canvasRepository.save(canvas);
    }
}
