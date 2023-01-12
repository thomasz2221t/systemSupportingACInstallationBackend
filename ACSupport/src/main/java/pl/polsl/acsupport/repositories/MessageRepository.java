package pl.polsl.acsupport.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.acsupport.entities.Message;

@Repository
public interface MessageRepository extends CrudRepository<Message,Long>, PagingAndSortingRepository<Message,Long> {
}
