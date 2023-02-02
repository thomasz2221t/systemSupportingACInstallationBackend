package pl.polsl.acsupport.servicestests;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import pl.polsl.acsupport.dtos.OperatorServiceDto;
import pl.polsl.acsupport.dtos.RoomDto;
import pl.polsl.acsupport.dtos.ServiceDto;
import pl.polsl.acsupport.dtos.ServiceTypeDto;
import pl.polsl.acsupport.entities.*;
import pl.polsl.acsupport.repositories.RoomRepository;
import pl.polsl.acsupport.repositories.ServiceRepository;
import pl.polsl.acsupport.repositories.ServiceTypeRepository;
import pl.polsl.acsupport.services.RoomService;
import pl.polsl.acsupport.services.ServiceService;
import pl.polsl.acsupport.services.ServiceTypeService;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;

import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class ServiceServiceTests {

    @InjectMocks
    private ServiceService serviceService;

    @Mock
    private ServiceRepository serviceRepository;

    @Mock
    private ServiceTypeRepository serviceTypeRepository;

    @Mock
    private ServiceTypeService serviceTypeService;

    @Mock
    private RoomRepository roomRepository;

    @Mock
    private RoomService roomService;

    private Service service1 = new Service();

    private Room room1 = new Room();

    private ServiceType serviceType1 =  new ServiceType();

    private Building building1 = new Building();

    @Before
    public void setUp(){
        building1.setName("BuildingTestName");
        room1.setName("RoomTestName");
        room1.setAreaWidth(BigDecimal.valueOf(100));
        room1.setAreaHeight(BigDecimal.valueOf(200));
        room1.setHeight(BigDecimal.valueOf(10));
        room1.setEnergyGivenOut(BigDecimal.valueOf(20));
        room1.setPeopleNumber(BigDecimal.valueOf(70));
        room1.setDescription("Główne pomieszczenie dworcowe");
        room1.setBuilding(building1);

        Set<Room> roomSet = new LinkedHashSet<>();
        roomSet.add(room1);
        building1.setRooms(roomSet);
        User user = new User();
        user.setFirstName("XYZ");
        user.setLastName("ZZZ");
        building1.setUser(user);

        serviceType1.setName("ServiceTypeName");

        service1.setDate(LocalDateTime.of(2023,03,10,17,20));
        service1.setDescription("Miejsce przygotowane pod montaż");
        service1.setRoom(room1);
        service1.setType(serviceType1);
        Offer offer1 = new Offer();;
        offer1.setService(service1);
        offer1.setDatesBegining(LocalDateTime.now());
        offer1.setDatesEnd(LocalDateTime.now());
        service1.setOffer(offer1);
    }

    @Test
    public void findServiceType_WhenGivenServiceId_ThenShouldReturnServiceTypeMatchingWithObject(){
        //given
        when(serviceRepository.findById(service1.getId()))
                .thenReturn(Optional.ofNullable(service1));

        //when
        ServiceTypeDto received = serviceService.findServiceType(service1.getId());

        //then
        assertTrue(serviceType1.getId() == received.getId(),"Actual value does not match expected value");
        assertEquals("Actual value does not match expected value", serviceType1.getName(), received.getName());
    }

    @Test
    public void assignTypeToService_WhenGivenServiceIdAndTypeId_ThenShouldExecuteRepositoryMethodTwice(){
        //given
        when(serviceRepository.findById(service1.getId()))
                .thenReturn(Optional.ofNullable(service1));
        when(serviceTypeService.findById(serviceType1.getId()))
                .thenReturn(serviceType1);

        //when
        serviceService.assignTypeToService(service1.getId(),serviceType1.getId());

        //then
        verify(serviceRepository, times(1)).save(any(Service.class));
        verify(serviceTypeRepository, times(1)).save(any(ServiceType.class));
    }

    @Test
    public void findServiceRoom_WhenGivenServiceId_ThenShouldReturnRoomDtoFromServiceRoom(){
        //given
        when(serviceRepository.findById(service1.getId()))
                .thenReturn(Optional.ofNullable(service1));

        //when
        RoomDto received = serviceService.findServiceRoom(service1.getId());

        //then
        assertTrue(room1.getId() == received.getId(),"Actual value does not match expected value");
        assertEquals("Actual value does not match expected value", room1.getName(), received.getName());
    }

    @Test
    public void revertAssigningTypeFromService_WhenGivenServiceId_ThenShouldExecuteRepositoryMethodTwice(){
        //given
        when(serviceRepository.findById(service1.getId()))
                .thenReturn(Optional.ofNullable(service1));

        //when
        serviceService.revertAssigningTypeFromService(service1.getId());

        //then
        verify(serviceRepository, times(1)).save(any(Service.class));
        verify(serviceTypeRepository, times(1)).save(any(ServiceType.class));
    }

    @Test
    public void assignServiceToRoom_WhenGivenServiceIdAndRoomId_ThenShouldExecuteRepositoryMethodTwice(){
        //given
        when(serviceRepository.findById(service1.getId()))
                .thenReturn(Optional.ofNullable(service1));
        when(roomService.findById(room1.getId()))
                .thenReturn(room1);

        //when
        serviceService.assignServiceToRoom(service1.getId(),room1.getId());

        //then
        verify(serviceRepository, times(1)).save(any(Service.class));
        verify(roomRepository, times(1)).save(any(Room.class));
    }

    @Test
    public void revertAssigningServiceFromRoom_WhenGivenServiceServiceId_ThenShouldExecuteRepositoryMethodTwice(){
        //given
        when(serviceRepository.findById(service1.getId()))
                .thenReturn(Optional.ofNullable(service1));

        //when
        serviceService.revertAssigningServiceFromRoom(service1.getId());

        //then
        verify(serviceRepository, times(1)).save(any(Service.class));
        verify(roomRepository, times(1)).save(any(Room.class));
    }

    @Test
    public void findServiceByBuildingId_WhenGivenBuildingId_ThenShouldReturnAssignedServices(){
        //given
        Pageable pageable = PageRequest.of(0, 1);
        List<Service> list= new ArrayList<>();
        list.add(service1);
        Page<Service> page = new PageImpl<>(list, pageable, list.size());
        when(serviceRepository.findAllByBuildingId(building1.getId(), PageRequest.of(0,1)))
                .thenReturn(page);

        //when
        Page<ServiceDto> receivedPage = serviceService.findServiceByBuildingId(building1.getId(), PageRequest.of(0,1));

        //then
        assertEquals("Number of elements in received page is incorrect",receivedPage.getTotalElements(),list.size());
    }

    @Test
    public void findAllOperatorServices_WhenGivenBuildingId_ThenShouldReturnOperatorService(){
        //given
        Pageable pageable = PageRequest.of(0, 1);
        List<Service> list= new ArrayList<>();
        list.add(service1);
        Page<Service> page = new PageImpl<>(list, pageable, list.size());
        when(serviceRepository.findAllByBuildingId(building1.getId(), PageRequest.of(0,1)))
                .thenReturn(page);

        //when
        Page<OperatorServiceDto> receivedPage = serviceService.findAllOperatorServices(building1.getId(), PageRequest.of(0,1));

        //then
        assertEquals("Number of elements in received page is incorrect",receivedPage.getTotalElements(),list.size());
    }
}
