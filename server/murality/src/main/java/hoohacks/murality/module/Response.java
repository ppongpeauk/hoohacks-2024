package hoohacks.murality.module;

import lombok.Data;

@Data
public class Response {

    private int code;
    private String message;
    private Object content;
}
