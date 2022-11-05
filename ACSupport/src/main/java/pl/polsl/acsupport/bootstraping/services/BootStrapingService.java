package pl.polsl.acsupport.bootstraping.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

public abstract class BootStrapingService {

    @Autowired
    protected BootStrapingEntryService bootStrapingEntryService;

    @Transactional
    public void boot(){
        populateDatabase();
    }

    protected void populateDatabase(){
    }


}
