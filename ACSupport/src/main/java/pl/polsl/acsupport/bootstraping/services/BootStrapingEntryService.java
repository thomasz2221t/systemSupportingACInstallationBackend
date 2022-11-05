package pl.polsl.acsupport.bootstraping.services;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.polsl.acsupport.bootstraping.enums.BootStrapingLabel;
import pl.polsl.acsupport.bootstraping.repositories.BootStrapingEntryRepository;
import pl.polsl.acsupport.entities.BootStrapingEntry;

@Log4j2
@AllArgsConstructor
@Transactional
@Service
public class BootStrapingEntryService {
    private final BootStrapingEntryRepository bootStrapingEntryRepository;

    public void createIfNotExists(BootStrapingLabel bootStrapingLabel, Runnable runnable) {
        String entryStatus = "Is already initialized";
        boolean entryExists = existsByLabel(bootStrapingLabel);

        if (!entryExists) {
            runnable.run();
            create(bootStrapingLabel);
            entryStatus = "Creating initializing method";
        }

        logMessage(bootStrapingLabel, entryStatus);
    }
    public boolean existsByLabel(BootStrapingLabel bootStrapingLabel){
        return bootStrapingEntryRepository.existsByLabel(bootStrapingLabel);
    }

    public BootStrapingEntry create(BootStrapingLabel bootStrapingLabel){
        BootStrapingEntry bootStrapingEntry = new BootStrapingEntry();
        bootStrapingEntry.setLabel(bootStrapingLabel);
        return bootStrapingEntryRepository.save(bootStrapingEntry);
    }

    public void logMessage(BootStrapingLabel bootStrapingLabel, String entryStatus){
        String entryMessage = "initializing method " + bootStrapingLabel + " -> " + entryStatus;
        log.info(entryMessage);
    }

}
