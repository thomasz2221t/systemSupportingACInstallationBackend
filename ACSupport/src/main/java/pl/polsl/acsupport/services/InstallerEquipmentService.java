package pl.polsl.acsupport.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.polsl.acsupport.dtos.InstallerEquipmentDto;
import pl.polsl.acsupport.entities.InstallerEquipment;
import pl.polsl.acsupport.repositories.InstallerEquipmentRepository;

import javax.persistence.EntityNotFoundException;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class InstallerEquipmentService {

    private final InstallerEquipmentRepository installerEquipmentRepository;

    public Page<InstallerEquipmentDto> findAll(Pageable pageable){
        final Page<InstallerEquipment> installerEquipments = installerEquipmentRepository.findAll(pageable);
        return installerEquipments.map(InstallerEquipmentDto::new);
    }

    public InstallerEquipment findById(Long id){
        return installerEquipmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Installation equipment with given id not found"));
    }
    public InstallerEquipmentDto get(Long id){
        final InstallerEquipment installerEquipment = findById(id);
        return new InstallerEquipmentDto(installerEquipment);
    }

    @Transactional
    public InstallerEquipment create(InstallerEquipmentDto installerEquipmentDto){
        InstallerEquipment installerEquipment = new InstallerEquipment();
        installerEquipment.setName(installerEquipmentDto.getName());
        installerEquipment.setPrice(installerEquipmentDto.getPrice());
        installerEquipment.setProducer(installerEquipmentDto.getProducer());
        installerEquipment.setDescription(installerEquipmentDto.getDescription());
        return installerEquipmentRepository.save(installerEquipment);
    }

    @Transactional
    public InstallerEquipment update(Long id, InstallerEquipmentDto installerEquipmentDto){
        InstallerEquipment installerEquipment = findById(id);
        installerEquipment.setName(installerEquipmentDto.getName());
        installerEquipment.setPrice(installerEquipmentDto.getPrice());
        installerEquipment.setProducer(installerEquipmentDto.getProducer());
        installerEquipment.setDescription(installerEquipmentDto.getDescription());
        return installerEquipmentRepository.save(installerEquipment);
    }

    @Transactional
    public void delete(Long id){
        installerEquipmentRepository.delete(findById(id));
    }
}
