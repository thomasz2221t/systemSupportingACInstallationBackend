package pl.polsl.acsupport.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.polsl.acsupport.dtos.BuildingTypeDto;
import pl.polsl.acsupport.entities.BuildingType;
import pl.polsl.acsupport.repositories.BuildingTypeRepository;

import javax.persistence.EntityNotFoundException;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class BuildingTypeService {

    private final BuildingTypeRepository buildingTypeRepository;

    public Page<BuildingTypeDto> findAll(Pageable pageable){
        Page<BuildingType> buildingTypes = buildingTypeRepository.findAll(pageable);
        return buildingTypes.map(BuildingTypeDto::new);
    }

    public BuildingType findById(Long id){
        return buildingTypeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Building type with given id not found"));
    }

    public BuildingTypeDto get(Long id){
        BuildingType buildingType = findById(id);
        return new BuildingTypeDto(buildingType);
    }

    @Transactional
    public BuildingType create(BuildingTypeDto buildingTypeDto){
        BuildingType buildingType = new BuildingType();
        buildingType.setName(buildingTypeDto.getName());
        return buildingTypeRepository.save(buildingType);
    }

    @Transactional
    public void delete(Long id){
        buildingTypeRepository.delete(findById(id));
    }
}
