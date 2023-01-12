package pl.polsl.acsupport.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.acsupport.entities.RoomType;

@Repository
public interface RoomTypeRepository extends CrudRepository<RoomType, Long>, PagingAndSortingRepository<RoomType, Long> {
}
