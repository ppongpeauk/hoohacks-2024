package hoohacks.murality.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import hoohacks.murality.entity.Photo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PhotoDTO {


    @JsonProperty("fileLink")
    String fileLink;

    // User Who Uploader
    @JsonProperty("uid")
    long uid;

    @JsonProperty("cid")
    long cid;

    // position (x, y)
    @JsonProperty("x")
    String x;

    @JsonProperty("y")
    String y;

    // size
    @JsonProperty("width")
    String width;

    @JsonProperty("height")
    String height;

    public Photo toPhoto() {
        Photo photo = new Photo();
        photo.setFileLink(fileLink);
        photo.setCid(cid);
        photo.setUid(uid);
        photo.setX(x);
        photo.setY(y);
        photo.setWidth(width);
        photo.setHeight(height);
        return photo;
    }
}
