package pl.polsl.acsupport.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.polsl.acsupport.dtos.ServiceDto;
import pl.polsl.acsupport.dtos.ServiceTypeDto;
import pl.polsl.acsupport.entities.ServiceType;
import pl.polsl.acsupport.repositories.ServiceRepository;
import pl.polsl.acsupport.repositories.ServiceTypeRepository;

import javax.persistence.EntityNotFoundException;
import java.util.Set;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class ServiceService {

    private final ServiceRepository serviceRepository;

    private final ServiceTypeService serviceTypeService;

    private final ServiceTypeRepository serviceTypeRepository;

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
        service.setDate(serviceDto.getDate());
        service.setDescription(serviceDto.getDescription());
        return serviceRepository.save(service);
    }

    @Transactional
    public pl.polsl.acsupport.entities.Service update(Long id, ServiceDto serviceDto){
        pl.polsl.acsupport.entities.Service service = findById(id);
        service.setDate(serviceDto.getDate());
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
}
