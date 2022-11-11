package pl.polsl.acsupport.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @PreAuthorize("hasAuthority('FIND_BUILDING')")
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Page<BuildingDto> findAllBuildings(@PageableDefault Pageable pageable){
        return buildingService.findAll(pageable);
    }

    @PreAuthorize("hasAuthority('FIND_BUILDING')")
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public BuildingDto findBuilding(@PathVariable Long id){
        return buildingService.get(id);
    }

    @PreAuthorize("hasAuthority('CREATE_BUILDING')")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Long create(@RequestBody BuildingDto buildingDto){
        return buildingService.create(buildingDto).getId();
    }

    @PreAuthorize("hasAuthority('UPDATE_BUILDING')")
    @PatchMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void update(@PathVariable Long id, @RequestBody BuildingDto buildingDto){
        buildingService.update(id, buildingDto);
    }

    @PreAuthorize("hasAuthority('DELETE_BUILDING')")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable Long id){
        buildingService.delete(id);
    }
}
