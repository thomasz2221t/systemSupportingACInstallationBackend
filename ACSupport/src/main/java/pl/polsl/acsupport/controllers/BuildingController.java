package pl.polsl.acsupport.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pl.polsl.acsupport.dtos.BuildingDto;
import pl.polsl.acsupport.services.BuildingService;

@RequiredArgsConstructor
@RequestMapping("/building")
@RestController
@Validated
public class BuildingController {

    private final BuildingService buildingService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Page<BuildingDto> findAllBuildings(@PageableDefault Pageable pageable){
        return buildingService.findAll(pageable);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public BuildingDto findBuilding(@PathVariable Long id){
        return buildingService.get(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Long create(@RequestBody BuildingDto buildingDto){
        return buildingService.create(buildingDto).getId();
    }

    @PatchMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void update(@PathVariable Long id, @RequestBody BuildingDto buildingDto){
        buildingService.update(id, buildingDto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable Long id){
        buildingService.delete(id);
    }
}
