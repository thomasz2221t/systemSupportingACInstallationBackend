package pl.polsl.acsupport.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pl.polsl.acsupport.dtos.BuildingTypeDto;
import pl.polsl.acsupport.services.BuildingTypeService;

@RequiredArgsConstructor
@RequestMapping("/buildingtype")
@RestController
@Validated
public class BuildingTypeController {

    private final BuildingTypeService buildingTypeService;

    @PreAuthorize("hasAuthority('FIND_BUILDING_TYPE')")
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Page<BuildingTypeDto> findAll(@PageableDefault Pageable pageable){
        return buildingTypeService.findAll(pageable);
    }

    @PreAuthorize("hasAuthority('FIND_BUILDING_TYPE')")
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public BuildingTypeDto findBuildingType(@PathVariable Long id){
        return buildingTypeService.get(id);
    }


    @PreAuthorize("hasAuthoriy('CREATE_BUILDING_TYPE')")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Long create(@RequestBody BuildingTypeDto buildingTypeDto){
        return buildingTypeService.create(buildingTypeDto).getId();
    }

    @PreAuthorize("hasAuthority('DELETE_BUILDING_TYPE')")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable Long id){
        buildingTypeService.delete(id);
    }
}
