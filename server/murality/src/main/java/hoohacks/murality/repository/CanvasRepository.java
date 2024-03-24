package hoohacks.murality.repository;

import hoohacks.murality.entity.Canvas;
import hoohacks.murality.entity.Photo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CanvasRepository extends CrudRepository<Canvas, Long> {

    Canvas findCanvasByCid(@Param("cid")  long cid);

    Canvas deleteCanvasByCid(@Param("cid") long cid);

    List<Canvas> findAllByUidOrderByLastModifyTime(@Param("uid") long uid);
}
