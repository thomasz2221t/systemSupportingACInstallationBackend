package pl.polsl.acsupport.bootstraping.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.polsl.acsupport.bootstraping.enums.BootStrapingLabel;
import pl.polsl.acsupport.dtos.BuildingDto;
import pl.polsl.acsupport.dtos.BuildingTypeDto;
import pl.polsl.acsupport.dtos.RoomDto;
import pl.polsl.acsupport.dtos.UserDto;
import pl.polsl.acsupport.entities.*;
import pl.polsl.acsupport.enums.PermissionName;
import pl.polsl.acsupport.enums.RoleName;
import pl.polsl.acsupport.repositories.PermissionRepository;
import pl.polsl.acsupport.repositories.RoleRepository;
import pl.polsl.acsupport.repositories.UserRepository;
import pl.polsl.acsupport.services.BuildingService;
import pl.polsl.acsupport.services.BuildingTypeService;
import pl.polsl.acsupport.services.RoomService;
import pl.polsl.acsupport.services.UserService;

import javax.persistence.EntityNotFoundException;
import java.math.BigDecimal;
import java.util.LinkedHashSet;
import java.util.Set;

import static pl.polsl.acsupport.enums.PermissionName.*;

@Profile("development")
@Service
public class DevelopmentBootStrapingService extends BootStrapingService {

    @Autowired
    BuildingService buildingService;

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    BuildingTypeService buildingTypeService;

    @Autowired
    RoomService roomService;

    @Autowired
    PermissionRepository permissionRepository;

    @Autowired
    RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    protected void populateDatabase(){
        super.populateDatabase();
        bootStrapingEntryService.createIfNotExists(BootStrapingLabel.CREATE_DEFAULT_BUILDINGS, this::createDefaultBuildings);
        bootStrapingEntryService.createIfNotExists(BootStrapingLabel.CREATE_DEFAULT_USERS, this::createDefaultUsers);
        bootStrapingEntryService.createIfNotExists(BootStrapingLabel.CREATE_DEFAULT_ROLES, this::createDefaultRoles);
        bootStrapingEntryService.createIfNotExists(BootStrapingLabel.CREATE_DEFAULT_BUILDING_TYPES, this::createDefaultBuildingTypes);
        bootStrapingEntryService.createIfNotExists(BootStrapingLabel.CREATE_DEFAULT_ROOMS, this::createDefaultRooms);
        bootStrapingEntryService.createIfNotExists(BootStrapingLabel.ASSIGN_USER_TO_ROLES, this::assignDefaultUsersToDefaultRoles);
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
        admin.setPassword(passwordEncoder.encode("inzynier"));
        admin.setFirstName("Jan");
        admin.setLastName("Kowalski");
        admin.setEmail("jan_kowalski@gmail.com");
        admin.setTelephone("666999888");
        admin.setEnabled(true);
        userRepository.save(admin);

        User operator1 = new User();
        operator1.setLogin("operator1");
        operator1.setPassword(passwordEncoder.encode("inzynier"));
        operator1.setFirstName("Mateusz");
        operator1.setLastName("Nowak");
        operator1.setEmail("mateusz_nowak@gmail.com");
        operator1.setTelephone("000111222");
        operator1.setEnabled(true);
        userRepository.save(operator1);

        User client1 = new User();
        client1.setLogin("client1");
        client1.setPassword(passwordEncoder.encode("inzynier"));
        client1.setFirstName("Mariusz");
        client1.setLastName("Brzęczyszczykiewicz");
        client1.setEmail("mariusz_brzeczyszczykiewicz@gmail.com");
        client1.setTelephone("333444555");
        client1.setEnabled(true);
        userRepository.save(client1);
    }

    private Permission addPermissions(PermissionName name) {
        Permission permission = new Permission();
        permission.setName(name);
        return permissionRepository.save(permission);
    }

    private void createDefaultRoles(){
        Role roleClient= new Role();
        roleClient.setName(RoleName.CLIENT);
        Set<Permission> permissionsClient = new LinkedHashSet<>();
        permissionsClient.add(addPermissions(FIND_BUILDING));
        permissionsClient.add(addPermissions(CREATE_BUILDING));
        permissionsClient.add(addPermissions(UPDATE_BUILDING));
        permissionsClient.add(addPermissions(DELETE_BUILDING));
        permissionsClient.add(addPermissions(FIND_BUILDING_TYPE));
        permissionsClient.add(addPermissions(FIND_ROOM));
        permissionsClient.add(addPermissions(CREATE_ROOM));
        permissionsClient.add(addPermissions(UPDATE_ROOM));
        permissionsClient.add(addPermissions(DELETE_ROOM));
        permissionsClient.add(addPermissions(FIND_USER));
        permissionsClient.add(addPermissions(UPDATE_USER));
        permissionsClient.add(addPermissions(DELETE_USER));
        roleClient.setPermissions(permissionsClient);
        roleRepository.save(roleClient);

        Role roleOperator = new Role();
        roleOperator.setName(RoleName.OPERATOR);
        Set<Permission> permissionsOperator = new LinkedHashSet<>();
        permissionsOperator.addAll(permissionsClient);
        permissionsOperator.add(addPermissions(CREATE_BUILDING_TYPE));
        permissionsOperator.add(addPermissions(DELETE_BUILDING_TYPE));
        permissionsClient.add(addPermissions(CREATE_USER));
        roleOperator.setPermissions(permissionsOperator);
        roleRepository.save(roleOperator);

        Role roleAdmin = new Role();
        roleAdmin.setName(RoleName.ADMIN);
        Set<Permission> permissionsAdmin = new LinkedHashSet<>();
        permissionsAdmin.addAll(permissionsOperator);
        //permissionsAdmin.add(addPermissions(ADD_OPERATOR));
        roleAdmin.setPermissions(permissionsAdmin);
        roleRepository.save(roleAdmin);
    }

    private void assignDefaultUsersToDefaultRoles(){
        Set<Role> adminRoles = new LinkedHashSet<>();
        Set<Role> operatorRoles = new LinkedHashSet<>();
        Set<Role> clientRoles = new LinkedHashSet<>();

        Role adminRole = roleRepository.findByName(RoleName.ADMIN).orElseThrow(EntityNotFoundException::new);
        Role operatorRole = roleRepository.findByName(RoleName.OPERATOR).orElseThrow(EntityNotFoundException::new);
        Role clientRole = roleRepository.findByName(RoleName.CLIENT).orElseThrow(EntityNotFoundException::new);

        adminRoles.add(adminRole);
        operatorRoles.add(operatorRole);
        clientRoles.add(clientRole);

        User admin = userRepository.findUserByLogin("admin").orElseThrow(EntityNotFoundException::new);
        User operator1 = userRepository.findUserByLogin("operator1").orElseThrow(EntityNotFoundException::new);
        User client1 = userRepository.findUserByLogin("client1").orElseThrow(EntityNotFoundException::new);

        admin.setRoles(adminRoles);
        operator1.setRoles(operatorRoles);
        client1.setRoles(clientRoles);
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

    private void createDefaultRooms(){
        Room room1 = new Room();
        room1.setName("Pomieszczenie usługowe pierkania");
        room1.setAreaWidth(BigDecimal.valueOf(20));
        room1.setAreaHeight(BigDecimal.valueOf(30));
        room1.setHeight(BigDecimal.valueOf(3));
        room1.setDescription("Pomieszczenie usługowe");
        roomService.create(new RoomDto(room1));

        Room room2 = new Room();
        room2.setName("Pomieszczenie produkcyjne pierkania");
        room2.setAreaWidth(BigDecimal.valueOf(15));
        room2.setAreaHeight(BigDecimal.valueOf(20));
        room2.setHeight(BigDecimal.valueOf(3));
        room2.setDescription("Pomieszczenie usługowe");
        roomService.create(new RoomDto(room2));

        Room room3 = new Room();
        room3.setName("Pomieszczenie główne");
        room3.setAreaWidth(BigDecimal.valueOf(40));
        room3.setAreaHeight(BigDecimal.valueOf(30));
        room3.setHeight(BigDecimal.valueOf(2.8));
        room3.setDescription("Miejsce w którym przebywa wiele osób");
        roomService.create(new RoomDto(room3));

        Room room4 = new Room();
        room4.setName("Pomieszczenie magazynowe");
        room4.setAreaWidth(BigDecimal.valueOf(5));
        room4.setAreaHeight(BigDecimal.valueOf(2));
        room4.setHeight(BigDecimal.valueOf(2.8));
        room4.setDescription("Magazyn na zapleczu");
        roomService.create(new RoomDto(room4));

        Room room5 = new Room();
        room5.setName("Główny hall dworca");
        room5.setAreaWidth(BigDecimal.valueOf(100));
        room5.setAreaHeight(BigDecimal.valueOf(200));
        room5.setHeight(BigDecimal.valueOf(10));
        room5.setDescription("Główne pomieszczenie dworcowe");
        roomService.create(new RoomDto(room5));

        Room room6 = new Room();
        room6.setName("Pokój gościnny");
        room6.setAreaWidth(BigDecimal.valueOf(30));
        room6.setAreaHeight(BigDecimal.valueOf(5));
        room6.setHeight(BigDecimal.valueOf(2.5));
        room6.setDescription("Pokój gościnny z patio");
        roomService.create(new RoomDto(room6));

        Room room7 = new Room();
        room7.setName("Serwerownia");
        room7.setAreaWidth(BigDecimal.valueOf(10));
        room7.setAreaHeight(BigDecimal.valueOf(8));
        room7.setHeight(BigDecimal.valueOf(2.5));
        room7.setDescription("Serwerownia w składziku");
        roomService.create(new RoomDto(room7));

    }
}
