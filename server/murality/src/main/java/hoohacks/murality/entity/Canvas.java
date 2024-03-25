package hoohacks.murality.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "canvas")
public class Canvas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long cid;

    // userId by photo creater
    long uid;

    // pic
    // List<Photo> pictures; -> "1,2,3,4,5"
    String pictures;

    Time createTime;

    Time lastModifyTime;
}
