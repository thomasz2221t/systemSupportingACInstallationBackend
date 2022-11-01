package pl.polsl.acsupport.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.support.BackendId;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pl.polsl.acsupport.dtos.BuildingTypeDto;
import pl.polsl.acsupport.entities.BuildingType;
import pl.polsl.acsupport.services.BuildingTypeService;

@RequiredArgsConstructor
@RequestMapping("/buildingtype")
@RestController
@Validated
public class BuildingTypeController {

    private final BuildingTypeService buildingTypeService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Page<BuildingTypeDto> findAll(@PageableDefault Pageable pageable){
        return buildingTypeService.findAll(pageable);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public BuildingTypeDto findBuildingType(@PathVariable Long id){
        return buildingTypeService.get(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Long create(@RequestBody BuildingTypeDto buildingTypeDto){
        return buildingTypeService.create(buildingTypeDto).getId();
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable Long id){
        buildingTypeService.delete(id);
    }
}
