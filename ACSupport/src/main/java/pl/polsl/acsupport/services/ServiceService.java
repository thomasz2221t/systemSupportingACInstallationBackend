package pl.polsl.acsupport.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.polsl.acsupport.dtos.ServiceDto;
import pl.polsl.acsupport.repositories.ServiceRepository;

import javax.persistence.EntityNotFoundException;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class ServiceService {

    final ServiceRepository serviceRepository;

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
}
