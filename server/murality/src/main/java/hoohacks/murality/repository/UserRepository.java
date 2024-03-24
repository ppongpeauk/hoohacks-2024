package hoohacks.murality.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import hoohacks.murality.entity.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {


    User getUserByUsername(@Param("username") String username);
}
