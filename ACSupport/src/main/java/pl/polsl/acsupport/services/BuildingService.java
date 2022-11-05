package pl.polsl.acsupport.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.polsl.acsupport.dtos.BuildingDto;
import pl.polsl.acsupport.entities.Building;
import pl.polsl.acsupport.repositories.BuildingRepository;

import javax.persistence.EntityNotFoundException;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class BuildingService {

    final private BuildingRepository buildingRepository;

    public Page<BuildingDto> findAll(Pageable pageable){
        final Page<Building> buildings = buildingRepository.findAll(pageable);
        return buildings.map(BuildingDto::new);
    }

    public Building findById(Long id){
        return buildingRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Building with given id not found"));
    }
    public BuildingDto get(Long id){
        final Building building = findById(id);
        return new BuildingDto(building);
    }

    @Transactional
    public Building create(BuildingDto buildingDto){
        Building building = new Building();
        return setDataFromDto(buildingDto, building);
    }

    @Transactional
    public Building update(Long id, BuildingDto buildingDto){
        Building building = findById(id);
        return setDataFromDto(buildingDto, building);
    }

    private Building setDataFromDto(BuildingDto buildingDto, Building building) {
        building.setName(buildingDto.getName());
        building.setImagePath(buildingDto.getImagePath());
        building.setStreet(buildingDto.getStreet());
        building.setPostCode(buildingDto.getPostCode());
        building.setCity(buildingDto.getCity());
        building.setRegion(buildingDto.getRegion());
        building.setDescription(buildingDto.getDescription());
        return buildingRepository.save(building);
    }

    @Transactional
    public void delete(Long id){
        buildingRepository.delete(findById(id));
    }
}
