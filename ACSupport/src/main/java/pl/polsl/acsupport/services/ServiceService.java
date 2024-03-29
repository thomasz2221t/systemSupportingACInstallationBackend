package pl.polsl.acsupport.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.polsl.acsupport.dtos.OperatorServiceDto;
import pl.polsl.acsupport.dtos.RoomDto;
import pl.polsl.acsupport.dtos.ServiceDto;
import pl.polsl.acsupport.dtos.ServiceTypeDto;
import pl.polsl.acsupport.entities.Offer;
import pl.polsl.acsupport.entities.Room;
import pl.polsl.acsupport.entities.ServiceType;
import pl.polsl.acsupport.repositories.OfferRepository;
import pl.polsl.acsupport.repositories.RoomRepository;
import pl.polsl.acsupport.repositories.ServiceRepository;
import pl.polsl.acsupport.repositories.ServiceTypeRepository;

import javax.persistence.EntityNotFoundException;
import java.math.BigDecimal;
import java.math.MathContext;
import java.time.LocalDateTime;
import java.util.Set;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class ServiceService {

    private final BigDecimal ENERGY_TO_QUBATURE_RATIO = BigDecimal.valueOf(25l);
    private final BigDecimal ENERGY_TO_HUMAN_RATIO = BigDecimal.valueOf(0.25);

    private final ServiceRepository serviceRepository;

    private final ServiceTypeService serviceTypeService;

    private final ServiceTypeRepository serviceTypeRepository;

    private final RoomService roomService;

    private final RoomRepository roomRepository;

    private final OfferRepository offerRepository;

    public Page<ServiceDto> findAll(Pageable pageable){
        final Page<pl.polsl.acsupport.entities.Service> services = serviceRepository.findAll(pageable);
        return services.map(ServiceDto::new);
    }

    public pl.polsl.acsupport.entities.Service findById(Long id){
        return serviceRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Service with given id not found"));
    }

    public ServiceDto get(Long id){
        final pl.polsl.acsupport.entities.Service service = findById(id);
        return new ServiceDto(service);
    }

    @Transactional
    public pl.polsl.acsupport.entities.Service create(ServiceDto serviceDto){
        pl.polsl.acsupport.entities.Service service = new pl.polsl.acsupport.entities.Service();
        Offer offer = new Offer();
        offer.setDatesBegining(LocalDateTime.now());
        offer.setDatesEnd(LocalDateTime.now());
        service.setDate(LocalDateTime.parse(serviceDto.getDate()));
        service.setDescription(serviceDto.getDescription());
        service.setOffer(offer);
        offer.setService(service);
        offerRepository.save(offer);
        return serviceRepository.save(service);
    }

    @Transactional
    public pl.polsl.acsupport.entities.Service update(Long id, ServiceDto serviceDto){
        pl.polsl.acsupport.entities.Service service = findById(id);
        service.setDate(LocalDateTime.parse(serviceDto.getDate()));
        service.setDescription(serviceDto.getDescription());
        return serviceRepository.save(service);
    }

    @Transactional
    public void delete(Long id){
        serviceRepository.delete(findById(id));
    }

    public ServiceTypeDto findServiceType(Long serviceId){
        pl.polsl.acsupport.entities.Service service = findById(serviceId);
        ServiceType type = service.getType();
        return new ServiceTypeDto(type);
    }

    @Transactional
    public void assignTypeToService(Long serviceId, Long typeId){
        ServiceType type = serviceTypeService.findById(typeId);
        pl.polsl.acsupport.entities.Service service = findById(serviceId);

        Set<pl.polsl.acsupport.entities.Service> services = type.getService();
        services.add(service);
        type.setService(services);

        service.setType(type);

        serviceRepository.save(service);
        serviceTypeRepository.save(type);
    }

    public RoomDto findServiceRoom(Long serviceId){
        pl.polsl.acsupport.entities.Service service = findById(serviceId);
        Room room = service.getRoom();
        return new RoomDto(room);
    }

    @Transactional
    public void revertAssigningTypeFromService(Long serviceId){
        pl.polsl.acsupport.entities.Service service = findById(serviceId);
        ServiceType type = service.getType();

        Set<pl.polsl.acsupport.entities.Service> services = type.getService();
        services.remove(service);
        type.setService(services);

        service.setType(null);

        serviceRepository.save(service);
        serviceTypeRepository.save(type);
    }

    @Transactional
    public void assignServiceToRoom(Long serviceId, Long roomId){
        pl.polsl.acsupport.entities.Service service = findById(serviceId);
        Room room = roomService.findById(roomId);

        Set<pl.polsl.acsupport.entities.Service> services = room.getServices();
        services.add(service);
        room.setServices(services);

        service.setRoom(room);

        serviceRepository.save(service);
        roomRepository.save(room);
    }

    @Transactional
    public void revertAssigningServiceFromRoom(Long serviceId){
        pl.polsl.acsupport.entities.Service service = findById(serviceId);
        Room room = service.getRoom();

        Set<pl.polsl.acsupport.entities.Service> services = room.getServices();
        services.remove(service);
        room.setServices(services);

        service.setRoom(null);

        serviceRepository.save(service);
        roomRepository.save(room);
    }

    public Page<ServiceDto> findServiceByBuildingId (Long buildingId, Pageable pageable){
        final Page<pl.polsl.acsupport.entities.Service> services = serviceRepository.findAllByBuildingId(buildingId,pageable);
        return services.map(ServiceDto::new);
    }

    private BigDecimal calculateRoomQubature(Room room){
        BigDecimal roomQubature = (room.getAreaWidth().multiply(room.getAreaHeight())).divide(room.getHeight());
        return roomQubature;
    }

    private BigDecimal calculateRequiredACPower(Room room){
        BigDecimal roomQubature = calculateRoomQubature(room);
        BigDecimal personEnergyIntake = room.getPeopleNumber().multiply(ENERGY_TO_HUMAN_RATIO).round(new MathContext(3));
        BigDecimal requiredACPower = ((roomQubature.divide(ENERGY_TO_QUBATURE_RATIO)).add(personEnergyIntake)).add(room.getEnergyGivenOut()).round(new MathContext(3));
        return requiredACPower;
    }

    public Page<OperatorServiceDto> findAllOperatorServices(Long buildingId, Pageable pageable){
        final Page<pl.polsl.acsupport.entities.Service> services = serviceRepository.findAllByBuildingId(buildingId, pageable);
        return services.map(service -> {
            OperatorServiceDto operatorServiceDto = new OperatorServiceDto();
            operatorServiceDto.setId(service.getId());
            operatorServiceDto.setInstalationDate(service.getDate().toString());
            String userNames = service.getRoom().getBuilding().getUser().getFirstName() + " " + service.getRoom().getBuilding().getUser().getLastName();
            operatorServiceDto.setClientsData(userNames);
            operatorServiceDto.setRoomId(service.getRoom().getId());
            operatorServiceDto.setBuildingId(service.getRoom().getBuilding().getId());
            operatorServiceDto.setRoomQubature(calculateRoomQubature(service.getRoom()));
            operatorServiceDto.setRequiredACPower(calculateRequiredACPower(service.getRoom()));
            operatorServiceDto.setDescription(service.getDescription());
            return operatorServiceDto;
        }
        );
    }
}
