package pl.polsl.acsupport.bootstraping.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.acsupport.bootstraping.enums.BootStrapingLabel;
import pl.polsl.acsupport.entities.BootStrapingEntry;

import java.util.Optional;

@Repository
public interface BootStrapingEntryRepository extends CrudRepository<BootStrapingEntry, Long> {

    Optional<BootStrapingEntry> findById(Long id);

    boolean existsByLabel(BootStrapingLabel label);
}
