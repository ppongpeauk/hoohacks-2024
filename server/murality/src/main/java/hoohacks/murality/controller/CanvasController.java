package hoohacks.murality.controller;

import hoohacks.murality.entity.Canvas;
import hoohacks.murality.service.CanvasService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/canvas/")
@RequiredArgsConstructor
public class CanvasController {

    @Autowired
    CanvasService canvasService;

    @GetMapping("{username}")
    public ResponseEntity getCanvas(@PathVariable String username) {
        List<Canvas> canvasList = canvasService.getCanvas(username);

        if (canvasList.size() == 0) {
            return new ResponseEntity(null, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity(canvasList, HttpStatus.OK);
    }

    @GetMapping("delete/{username}")
    public ResponseEntity deleteCanvas(@PathVariable String username) {
        Canvas canvas = canvasService.deleteCanvas(username);
        if (canvas == null) {
            return new ResponseEntity(null, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity(null, HttpStatus.OK);
    }
}
