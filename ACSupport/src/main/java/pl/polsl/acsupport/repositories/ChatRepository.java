package pl.polsl.acsupport.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.acsupport.entities.Chat;

@Repository
public interface ChatRepository extends CrudRepository<Chat,Long> {
}
