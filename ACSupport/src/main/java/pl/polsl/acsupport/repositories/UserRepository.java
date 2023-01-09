package pl.polsl.acsupport.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.polsl.acsupport.entities.User;
import pl.polsl.acsupport.enums.RoleName;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long>, PagingAndSortingRepository<User,Long> {

    Optional<User> findUserByLogin(String login);

    @Query("SELECT u FROM users u JOIN u.roles roles WHERE roles.name =:name")
    Page<User> findAllByRoles(@Param("name") RoleName name, Pageable pageable);
}
