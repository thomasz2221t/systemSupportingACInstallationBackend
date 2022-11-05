package pl.polsl.acsupport.bootstraping;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import pl.polsl.acsupport.bootstraping.services.BootStrapingService;

@Log4j2
@AllArgsConstructor
@Component
public class BootStraping {
    private final BootStrapingService bootStrapService;

    @EventListener(ApplicationReadyEvent.class)
    private void init(){
        try{
            log.info("BootStraping starting");
            bootStrapService.boot();
            log.info("BootStraping success");
        }catch(Exception e){
            log.error("BootStrping failed with error: " + e);
            e.printStackTrace();
            throw e;
        }
    }
}
