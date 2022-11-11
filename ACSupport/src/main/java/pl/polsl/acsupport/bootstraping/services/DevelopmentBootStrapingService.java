package pl.polsl.acsupport.bootstraping.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import pl.polsl.acsupport.bootstraping.enums.BootStrapingLabel;
import pl.polsl.acsupport.dtos.BuildingDto;
import pl.polsl.acsupport.dtos.BuildingTypeDto;
import pl.polsl.acsupport.dtos.UserDto;
import pl.polsl.acsupport.entities.Building;
import pl.polsl.acsupport.entities.BuildingType;
import pl.polsl.acsupport.entities.User;
import pl.polsl.acsupport.services.BuildingService;
import pl.polsl.acsupport.services.BuildingTypeService;
import pl.polsl.acsupport.services.UserService;

@Profile("development")
@Service
public class DevelopmentBootStrapingService extends BootStrapingService {

    @Autowired
    BuildingService buildingService;

    @Autowired
    UserService userService;

    @Autowired
    BuildingTypeService buildingTypeService;

    @Override
    protected void populateDatabase(){
        super.populateDatabase();
        bootStrapingEntryService.createIfNotExists(BootStrapingLabel.CREATE_DEFAULT_BUILDINGS, this::createDefaultBuildings);
        bootStrapingEntryService.createIfNotExists(BootStrapingLabel.CREATE_DEFAULT_USERS, this::createDefaultUsers);
        bootStrapingEntryService.createIfNotExists(BootStrapingLabel.CREATE_DEFAULT_BUILDING_TYPES, this::createDefaultBuildingTypes);
    }

    private void createDefaultBuildings(){
        Building building1 = new Building();
        building1.setName("Piekarnia");
        building1.setStreet("ul. Piotrowicka 200");
        building1.setPostCode("40-000");
        building1.setCity("Katowice");
        building1.setRegion("Śląskie");
        building1.setDescription("Przedsiębiorstwo piekarnicze składające się z częsci usługowej oraz produkcyjnej.");
        buildingService.create(new BuildingDto(building1));

        Building building2 = new Building();
        building2.setName("Pub");
        building2.setStreet("ul. Witosa 0");
        building2.setPostCode("40-000");
        building2.setCity("Katowice");
        building2.setRegion("Śląskie");
        building2.setDescription("Pub w budynku jednopiętrowym z niewielkimi oknami.");
        buildingService.create(new BuildingDto(building2));

        Building building3 = new Building();
        building3.setName("Dworzec Kolejowy");
        building3.setStreet("ul. Dworcowa 12");
        building3.setPostCode("41-000");
        building3.setCity("Chorzów");
        building3.setRegion("Śląskie");
        building3.setDescription("Budynek dworca kolejowego Chorzów Batory.");
        buildingService.create(new BuildingDto(building3));

        Building building4 = new Building();
        building4.setName("Dom Prywatny Jana Kowalskiego");
        building4.setStreet("ul. Kokosanek 112");
        building4.setPostCode("40-000");
        building4.setCity("Katowice");
        building4.setRegion("Śląskie");
        building4.setDescription("Dom prywatny jednopiętrowy.");
        buildingService.create(new BuildingDto(building4));
    }

    private void createDefaultUsers(){
        User admin = new User();
        admin.setLogin("admin");
        admin.setPassword("inzynier");
        admin.setFirstName("Jan");
        admin.setLastName("Kowalski");
        admin.setEmail("jan_kowalski@gmail.com");
        admin.setTelephone("666999888");
        admin.setEnabled(true);
        userService.create(new UserDto(admin));

        User operator1 = new User();
        operator1.setLogin("operator1");
        operator1.setPassword("inzynier");
        operator1.setFirstName("Mateusz");
        operator1.setLastName("Nowak");
        operator1.setEmail("mateusz_nowak@gmail.com");
        operator1.setTelephone("000111222");
        operator1.setEnabled(true);
        userService.create(new UserDto(operator1));

        User client1 = new User();
        client1.setLogin("client1");
        client1.setPassword("inzynier");
        client1.setFirstName("Mariusz");
        client1.setLastName("Brzęczyszczykiewicz");
        client1.setEmail("mariusz_brzeczyszczykiewicz@gmail.com");
        client1.setTelephone("333444555");
        client1.setEnabled(true);
        userService.create(new UserDto(client1));
    }

    private void createDefaultBuildingTypes(){
        BuildingType buildingType1 = new BuildingType();
        buildingType1.setName("Budynek mieszkalny");
        buildingTypeService.create(new BuildingTypeDto(buildingType1));

        BuildingType buildingType2 = new BuildingType();
        buildingType2.setName("Magazyny, budynki przemysłowe");
        buildingTypeService.create(new BuildingTypeDto(buildingType2));

        BuildingType buildingType3 = new BuildingType();
        buildingType3.setName("Budynek pełniący firmę handlowo-usługową");
        buildingTypeService.create(new BuildingTypeDto(buildingType3));
    }
}
