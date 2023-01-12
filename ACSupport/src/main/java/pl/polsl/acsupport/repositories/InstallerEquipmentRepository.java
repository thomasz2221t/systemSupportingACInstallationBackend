package pl.polsl.acsupport.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.acsupport.entities.InstallerEquipment;

@Repository
public interface InstallerEquipmentRepository extends CrudRepository<InstallerEquipment,Long>, PagingAndSortingRepository<InstallerEquipment, Long> {
}
