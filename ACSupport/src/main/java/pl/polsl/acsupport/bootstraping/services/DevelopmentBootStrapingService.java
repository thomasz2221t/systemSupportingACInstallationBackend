package pl.polsl.acsupport.bootstraping.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import pl.polsl.acsupport.bootstraping.enums.BootStrapingLabel;
import pl.polsl.acsupport.dtos.BuildingDto;
import pl.polsl.acsupport.entities.Building;
import pl.polsl.acsupport.services.BuildingService;

@Profile("development")
@Service
public class DevelopmentBootStrapingService extends BootStrapingService {

    @Autowired
    BuildingService buildingService;

    @Override
    protected void populateDatabase(){
        super.populateDatabase();
        bootStrapingEntryService.createIfNotExists(BootStrapingLabel.CREATE_DEFAULT_BUILDINGS, this::createDefaultBuildings);
    }

    private void createDefaultBuildings(){
        Building building = new Building();
        building.setName("Piekarnia");
        building.setStreet("ul. Piotrowicka 200");
        building.setPostCode("40-000");
        building.setCity("Katowice");
        building.setRegion("Śląsk");
        building.setDescription("Opis piekarni");
        buildingService.create(new BuildingDto(building));
    }
}
