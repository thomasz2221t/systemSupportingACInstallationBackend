package pl.polsl.acsupport.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.polsl.acsupport.dtos.ServiceTypeDto;
import pl.polsl.acsupport.entities.ServiceType;
import pl.polsl.acsupport.repositories.ServiceTypeRepository;

import javax.persistence.EntityNotFoundException;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class ServiceTypeService {

    private final ServiceTypeRepository serviceTypeRepository;

    public Page<ServiceTypeDto> findAll(Pageable pageable){
        Page<ServiceType> serviceTypes = serviceTypeRepository.findAll(pageable);
        return serviceTypes.map(ServiceTypeDto::new);
    }

    public ServiceType findById(Long id){
        return serviceTypeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Service type with given id not found"));
    }

    public ServiceTypeDto get(Long id){
        ServiceType serviceType = findById(id);
        return new ServiceTypeDto(serviceType);
    }

    @Transactional
    public ServiceType create(ServiceTypeDto serviceTypeDto){
        ServiceType serviceType = new ServiceType();
        serviceType.setName(serviceTypeDto.getName());
        return serviceTypeRepository.save(serviceType);
    }

    @Transactional
    public void delete(Long id){
        serviceTypeRepository.delete(findById(id));
    }
}
