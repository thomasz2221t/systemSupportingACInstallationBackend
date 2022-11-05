package pl.polsl.acsupport.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.acsupport.entities.Room;

@Repository
public interface RoomRepository extends CrudRepository<Room,Long>, PagingAndSortingRepository<Room,Long> {
}
