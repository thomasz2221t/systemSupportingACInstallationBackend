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
import pl.polsl.acsupport.entities.*;
import pl.polsl.acsupport.enums.PermissionName;
import pl.polsl.acsupport.enums.RoleName;
import pl.polsl.acsupport.repositories.*;
import pl.polsl.acsupport.services.*;

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
    BuildingTypeRepository buildingTypeRepository;

    @Autowired
    BuildingTypeService buildingTypeService;

    @Autowired
    RoomRepository roomRepository;

    @Autowired
    RoomService roomService;

    @Autowired
    PermissionRepository permissionRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    BuildingRepository buildingRepository;

    @Autowired
    RoomTypeRepository roomTypeRepository;

    @Autowired
    RoomTypeService roomTypeService;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    protected void populateDatabase(){
        super.populateDatabase();
        bootStrapingEntryService.createIfNotExists(BootStrapingLabel.CREATE_DEFAULT_BUILDINGS, this::createDefaultBuildings);
        bootStrapingEntryService.createIfNotExists(BootStrapingLabel.CREATE_DEFAULT_USERS, this::createDefaultUsers);
        bootStrapingEntryService.createIfNotExists(BootStrapingLabel.CREATE_DEFAULT_ROLES, this::createDefaultRoles);
        bootStrapingEntryService.createIfNotExists(BootStrapingLabel.CREATE_DEFAULT_BUILDING_TYPES, this::createDefaultBuildingTypes);
        bootStrapingEntryService.createIfNotExists(BootStrapingLabel.ASSIGN_DEFAULT_BUILDING_TYPES_TO_BUILDINGS, this::assignDefaultBuildingTypesToDefaultBuildings);
        bootStrapingEntryService.createIfNotExists(BootStrapingLabel.CREATE_DEFAULT_ROOMS, this::createDefaultRooms);
        bootStrapingEntryService.createIfNotExists(BootStrapingLabel.ASSIGN_USER_TO_ROLES, this::assignDefaultUsersToDefaultRoles);
        bootStrapingEntryService.createIfNotExists(BootStrapingLabel.ASSIGN_DEFAULT_USERS_TO_DEFAULT_BUILDINGS,this::assignDefaultUsersToDefaultBuildings);
        bootStrapingEntryService.createIfNotExists(BootStrapingLabel.ASSING_DEFAULT_ROOM_TO_BUILDINGS,this::assignDefaultRoomsToDefaultBuildings);
        bootStrapingEntryService.createIfNotExists(BootStrapingLabel.CREATE_DEFAULT_ROOM_TYPES, this::createDefaultRoomTypes);
        bootStrapingEntryService.createIfNotExists(BootStrapingLabel.ASSING_DEFAULT_ROOM_TYPES_TO_ROOMS,this::assignDefaultRoomTypesToRooms);
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

        User client2 = new User();
        client2.setLogin("client2");
        client2.setPassword(passwordEncoder.encode("inzynier"));
        client2.setFirstName("Adam");
        client2.setLastName("Baran");
        client2.setEmail("adam_baran@gmail.com");
        client2.setTelephone("000000888");
        client2.setEnabled(true);
        userRepository.save(client2);
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
        permissionsClient.add(addPermissions(FIND_ROOM_TYPE));
        permissionsClient.add(addPermissions(CREATE_ROOM_TYPE));
        permissionsClient.add(addPermissions(DELETE_ROOM_TYPE));
        permissionsClient.add(addPermissions(FIND_MESSAGES));
        permissionsClient.add(addPermissions(CREATE_MESSAGE));
        permissionsClient.add(addPermissions(FIND_SERVICE));
        permissionsClient.add(addPermissions(CREATE_SERVICE));
        permissionsClient.add(addPermissions(UPDATE_SERVICE));
        permissionsClient.add(addPermissions(DELETE_SERVICE));
        roleClient.setPermissions(permissionsClient);
        roleRepository.save(roleClient);

        Role roleOperator = new Role();
        roleOperator.setName(RoleName.OPERATOR);
        Set<Permission> permissionsOperator = new LinkedHashSet<>();
        permissionsOperator.addAll(permissionsClient);
        permissionsOperator.add(addPermissions(CREATE_BUILDING_TYPE));
        permissionsOperator.add(addPermissions(DELETE_BUILDING_TYPE));
        roleOperator.setPermissions(permissionsOperator);
        roleRepository.save(roleOperator);

        Role roleAdmin = new Role();
        roleAdmin.setName(RoleName.ADMIN);
        Set<Permission> permissionsAdmin = new LinkedHashSet<>();
        permissionsAdmin.addAll(permissionsOperator);
        permissionsAdmin.add(addPermissions(CREATE_USER));
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
        User client2 = userRepository.findUserByLogin("client2").orElseThrow(EntityNotFoundException::new);

        admin.setRoles(adminRoles);
        operator1.setRoles(operatorRoles);
        client1.setRoles(clientRoles);
        client2.setRoles(clientRoles);
    }

    private void createDefaultBuildingTypes(){
        BuildingType buildingType1 = new BuildingType();
        buildingType1.setName("Budynek mieszkalny");
        buildingTypeService.create(new BuildingTypeDto(buildingType1));

        BuildingType buildingType2 = new BuildingType();
        buildingType2.setName("Magazyny, budynki przemysłowe");
        buildingTypeService.create(new BuildingTypeDto(buildingType2));

        BuildingType buildingType3 = new BuildingType();
        buildingType3.setName("Budynek pełniący funkcje handlowo-usługową");
        buildingTypeService.create(new BuildingTypeDto(buildingType3));

        BuildingType buildingType4 = new BuildingType();
        buildingType4.setName("Budynek użyteczności publicznej");
        buildingTypeService.create(new BuildingTypeDto(buildingType4));
    }

    private void assignDefaultBuildingTypesToDefaultBuildings(){
        BuildingType buildingType1 = buildingTypeService.findById(1L);//Budynek mieszkalny
        Set<Building> buildingType1Set = buildingType1.getBuilding();

        BuildingType buildingType2 = buildingTypeService.findById(2L);//Magazyny, budynki przemysłowe
        Set<Building> buildingType2Set = buildingType2.getBuilding();

        BuildingType buildingType3 = buildingTypeService.findById(3L);//Budynek pełniący funkcje handlowo-usługową
        Set<Building> buildingType3Set = buildingType3.getBuilding();

        BuildingType buildingType4 = buildingTypeService.findById(4L);//Budynek uzytecznosci publicznej
        Set<Building> buildingType4Set = buildingType4.getBuilding();

        Building building1 = buildingService.findById(1L);//Przedsiębiorstwo piekarnicze składające się z częsci usługowej oraz produkcyjnej.
        building1.setType(buildingType3);
        buildingType3Set.add(building1);

        Building building2 = buildingService.findById(2L);//Pub w budynku jednopiętrowym z niewielkimi oknami.
        building2.setType(buildingType1);
        buildingType1Set.add(building2);

        Building building3 = buildingService.findById(3L);//Budynek dworca kolejowego Chorzów Batory.
        building3.setType(buildingType4);
        buildingType4Set.add(building3);

        Building building4 = buildingService.findById(4L);//Dom prywatny jednopiętrowy.
        building4.setType(buildingType1);
        buildingType1Set.add(building4);

        buildingType1.setBuilding(buildingType1Set);
        buildingType2.setBuilding(buildingType2Set);
        buildingType3.setBuilding(buildingType3Set);
        buildingType4.setBuilding(buildingType4Set);
        buildingTypeRepository.save(buildingType1);
        buildingTypeRepository.save(buildingType2);
        buildingTypeRepository.save(buildingType3);
        buildingTypeRepository.save(buildingType4);
    }

    private void createDefaultRooms(){
        Room room1 = new Room();
        room1.setName("Pomieszczenie usługowe pierkania");
        room1.setAreaWidth(BigDecimal.valueOf(20));
        room1.setAreaHeight(BigDecimal.valueOf(30));
        room1.setHeight(BigDecimal.valueOf(3));
        room1.setEnergyGivenOut(BigDecimal.valueOf(0));
        room1.setPeopleNumber(BigDecimal.valueOf(2));
        room1.setDescription("Pomieszczenie usługowe");
        roomService.create(new RoomDto(room1));

        Room room2 = new Room();
        room2.setName("Pomieszczenie produkcyjne pierkania");
        room2.setAreaWidth(BigDecimal.valueOf(15));
        room2.setAreaHeight(BigDecimal.valueOf(20));
        room2.setHeight(BigDecimal.valueOf(3));
        room2.setEnergyGivenOut(BigDecimal.valueOf(5));
        room2.setPeopleNumber(BigDecimal.valueOf(5));
        room2.setDescription("Pomieszczenie usługowe");
        roomService.create(new RoomDto(room2));

        Room room3 = new Room();
        room3.setName("Pomieszczenie główne");
        room3.setAreaWidth(BigDecimal.valueOf(40));
        room3.setAreaHeight(BigDecimal.valueOf(30));
        room3.setHeight(BigDecimal.valueOf(2.8));
        room3.setEnergyGivenOut(BigDecimal.valueOf(0));
        room3.setPeopleNumber(BigDecimal.valueOf(50));
        room3.setDescription("Miejsce w którym przebywa wiele osób");
        roomService.create(new RoomDto(room3));

        Room room4 = new Room();
        room4.setName("Pomieszczenie magazynowe");
        room4.setAreaWidth(BigDecimal.valueOf(5));
        room4.setAreaHeight(BigDecimal.valueOf(2));
        room4.setHeight(BigDecimal.valueOf(2.8));
        room4.setEnergyGivenOut(BigDecimal.valueOf(1));
        room4.setPeopleNumber(BigDecimal.valueOf(10));
        room4.setDescription("Magazyn na zapleczu");
        roomService.create(new RoomDto(room4));

        Room room5 = new Room();
        room5.setName("Główny hall dworca");
        room5.setAreaWidth(BigDecimal.valueOf(100));
        room5.setAreaHeight(BigDecimal.valueOf(200));
        room5.setHeight(BigDecimal.valueOf(10));
        room5.setEnergyGivenOut(BigDecimal.valueOf(20));
        room5.setPeopleNumber(BigDecimal.valueOf(70));
        room5.setDescription("Główne pomieszczenie dworcowe");
        roomService.create(new RoomDto(room5));

        Room room6 = new Room();
        room6.setName("Pokój gościnny");
        room6.setAreaWidth(BigDecimal.valueOf(30));
        room6.setAreaHeight(BigDecimal.valueOf(5));
        room6.setHeight(BigDecimal.valueOf(2.5));
        room6.setEnergyGivenOut(BigDecimal.valueOf(0.5));
        room6.setPeopleNumber(BigDecimal.valueOf(4));
        room6.setDescription("Pokój gościnny z patio");
        roomService.create(new RoomDto(room6));

        Room room7 = new Room();
        room7.setName("Serwerownia");
        room7.setAreaWidth(BigDecimal.valueOf(10));
        room7.setAreaHeight(BigDecimal.valueOf(8));
        room7.setHeight(BigDecimal.valueOf(2.5));
        room7.setEnergyGivenOut(BigDecimal.valueOf(53.4));
        room7.setPeopleNumber(BigDecimal.valueOf(1));
        room7.setDescription("Serwerownia w składziku");
        roomService.create(new RoomDto(room7));
    }

    public void assignDefaultUsersToDefaultBuildings(){
        User client1 = userRepository.findUserByLogin("client1").orElseThrow(EntityNotFoundException::new);
        Set<Building> client1Buildings = client1.getBuildings();
        Building building1 = buildingService.findById(1L);
        building1.setUser(client1);
        buildingRepository.save(building1);
        Building building2 = buildingService.findById(2L);
        building2.setUser(client1);
        buildingRepository.save(building2);
        Building building3 = buildingService.findById(3L);
        building3.setUser(client1);
        buildingRepository.save(building3);
        client1Buildings.add(building1);
        client1Buildings.add(building2);
        client1Buildings.add(building3);
        userRepository.save(client1);

        User client2 = userRepository.findUserByLogin("client2").orElseThrow(EntityNotFoundException::new);
        Set<Building> client2Buildings = client2.getBuildings();
        Building building4 = buildingService.findById(4L);
        building4.setUser(client2);
        buildingRepository.save(building4);
        client2Buildings.add(building4);
        userRepository.save(client2);
    }

    public void assignDefaultRoomsToDefaultBuildings() {
        Building building1 = buildingService.findById(1L);//Przedsiębiorstwo piekarnicze składające się z częsci usługowej oraz produkcyjnej.
        Set<Room> building1Rooms = building1.getRooms();

        Building building2 = buildingService.findById(2L);//Pub w budynku jednopiętrowym z niewielkimi oknami.
        Set<Room> building2Rooms = building2.getRooms();

        Building building3 = buildingService.findById(3L);//Budynek dworca kolejowego Chorzów Batory.
        Set<Room> building3Rooms = building3.getRooms();

        Building building4 = buildingService.findById(4L);//Dom prywatny jednopiętrowy.
        Set<Room> building4Rooms = building4.getRooms();

        Room room1 = roomService.findById(1L);//Pomieszczenie uslugowe piekarni
        room1.setBuilding(building1);
        building1Rooms.add(room1);
        roomRepository.save(room1);

        Room room2 = roomService.findById(2L);//Pomieszczenie produkcyjne piekarni
        room2.setBuilding(building1);
        building1Rooms.add(room2);
        roomRepository.save(room2);

        Room room3 = roomService.findById(3L);//Pomieszczenie glowne
        room3.setBuilding(building2);
        building2Rooms.add(room3);
        roomRepository.save(room3);

        Room room4 = roomService.findById(4L);//Pomieszczenie magazynowe
        room4.setBuilding(building2);
        building2Rooms.add(room4);
        roomRepository.save(room4);

        Room room5 = roomService.findById(5L);//Glowne hall dworcowa
        room5.setBuilding(building3);
        building3Rooms.add(room5);
        roomRepository.save(room5);

        Room room6 = roomService.findById(6L);//Pokoj goscinny
        room6.setBuilding(building4);
        building4Rooms.add(room6);
        roomRepository.save(room6);

        Room room7 = roomService.findById(7L);//Serwerownia
        room7.setBuilding(building4);
        building4Rooms.add(room7);
        roomRepository.save(room7);

        building1.setRooms(building1Rooms);
        building2.setRooms(building2Rooms);
        building3.setRooms(building3Rooms);
        building4.setRooms(building4Rooms);
        buildingRepository.save(building1);
        buildingRepository.save(building2);
        buildingRepository.save(building3);
        buildingRepository.save(building4);
    }

    public void createDefaultRoomTypes(){
        RoomType roomType1 = new RoomType();
        roomType1.setName("Pomieszczenie Mieszkalne");
        roomTypeRepository.save(roomType1);

        RoomType roomType2 = new RoomType();
        roomType2.setName("Pomieszczenie usługowo-handlowe");
        roomTypeRepository.save(roomType2);

        RoomType roomType3 = new RoomType();
        roomType3.setName("Pomieszczenie produkcyjne");
        roomTypeRepository.save(roomType3);

        RoomType roomType4 = new RoomType();
        roomType4.setName("Biuro");
        roomTypeRepository.save(roomType4);

        RoomType roomType5 = new RoomType();
        roomType5.setName("Handel wielkopowierzchniowy");
        roomTypeRepository.save(roomType5);

        RoomType roomType6 = new RoomType();
        roomType6.setName("Serwerownia");
        roomTypeRepository.save(roomType6);

        RoomType roomType7 = new RoomType();
        roomType7.setName("Magazyn");
        roomTypeRepository.save(roomType7);

        RoomType roomType8 = new RoomType();
        roomType8.setName("Hala produkcyjna");
        roomTypeRepository.save(roomType8);

        RoomType roomType9 = new RoomType();
        roomType9.setName("Miejsce publiczne");
        roomTypeRepository.save(roomType9);
    }

    public void assignDefaultRoomTypesToRooms(){
        RoomType roomType1 = roomTypeService.findById(1L);
        Set<Room> roomType1Rooms = roomType1.getRooms();

        RoomType roomType2 = roomTypeService.findById(2L);
        Set<Room> roomType2Rooms = roomType2.getRooms();

        RoomType roomType3 = roomTypeService.findById(3L);
        Set<Room> roomType3Rooms = roomType3.getRooms();

        /*RoomType roomType4 = roomTypeService.findById(4L);
        Set<Room> roomType4Rooms = roomType4.getRooms();*/

        /*RoomType roomType5 = roomTypeService.findById(5L);
        Set<Room> roomType5Rooms = roomType5.getRooms();*/

        RoomType roomType6 = roomTypeService.findById(6L);
        Set<Room> roomType6Rooms = roomType6.getRooms();

        RoomType roomType7 = roomTypeService.findById(7L);
        Set<Room> roomType7Rooms = roomType7.getRooms();

        /*RoomType roomType8 = roomTypeService.findById(8L);
        Set<Room> roomType8Rooms = roomType8.getRooms();*/

        RoomType roomType9 = roomTypeService.findById(9L);
        Set<Room> roomType9Rooms = roomType9.getRooms();

        Room room1 = roomService.findById(1L);//Pomieszczenie usługowe pierkania
        room1.setType(roomType2);
        roomType2Rooms.add(room1);
        roomRepository.save(room1);

        Room room2 = roomService.findById(2L);//Pomieszczenie produkcyjne pierkania
        room2.setType(roomType3);
        roomType3Rooms.add(room2);
        roomRepository.save(room2);

        Room room3 = roomService.findById(3L);//Pomieszczenie główne
        room3.setType(roomType9);
        roomType9Rooms.add(room3);
        roomRepository.save(room3);

        Room room4 = roomService.findById(4L);//Pomieszczenie magazynowe
        room4.setType(roomType7);
        roomType7Rooms.add(room4);
        roomRepository.save(room4);

        Room room5 = roomService.findById(5L);//Główny hall dworca
        room5.setType(roomType9);
        roomType9Rooms.add(room5);
        roomRepository.save(room5);

        Room room6 = roomService.findById(6L);//Pokój gościnny
        room6.setType(roomType1);
        roomType1Rooms.add(room6);
        roomRepository.save(room6);

        Room room7 = roomService.findById(7L);//Serwerownia
        room7.setType(roomType6);
        roomType6Rooms.add(room7);
        roomRepository.save(room7);

        roomType1.setRooms(roomType1Rooms);
        roomType2.setRooms(roomType2Rooms);
        roomType3.setRooms(roomType3Rooms);
        roomType6.setRooms(roomType6Rooms);
        roomType7.setRooms(roomType7Rooms);
        roomType9.setRooms(roomType9Rooms);
        roomTypeRepository.save(roomType1);
        roomTypeRepository.save(roomType2);
        roomTypeRepository.save(roomType3);
        roomTypeRepository.save(roomType6);
        roomTypeRepository.save(roomType7);
        roomTypeRepository.save(roomType9);
    }


}
