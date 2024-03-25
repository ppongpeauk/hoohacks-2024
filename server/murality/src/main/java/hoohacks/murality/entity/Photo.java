package hoohacks.murality.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "photo")
public class Photo {

    @Id
    @Column(name = "pid")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long pid;

    String fileLink;

    // User Who Uploader
    long uid;

    long cid;

    // position (x, y)
    String x;

    String y;

    // size
    String width;

    String height;

}
