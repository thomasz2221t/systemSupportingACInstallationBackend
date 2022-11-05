package pl.polsl.acsupport.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.acsupport.entities.User;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long>, PagingAndSortingRepository<User,Long> {

    Optional<User> findUserByLogin(String login);
}
