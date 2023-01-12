package pl.polsl.acsupport.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.polsl.acsupport.entities.Service;

@Repository
public interface ServiceRepository extends CrudRepository<Service,Long>, PagingAndSortingRepository<Service,Long> {
    @Query("select s from services s join s.room r join r.building b where b.id = :buildingId")
    Page<Service> findAllByBuildingId(@Param("buildingId") Long buildingId, Pageable pageable);
}
