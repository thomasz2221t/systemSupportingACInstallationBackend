package pl.polsl.acsupport.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pl.polsl.acsupport.dtos.OperatorServiceDto;
import pl.polsl.acsupport.dtos.RoomDto;
import pl.polsl.acsupport.dtos.ServiceDto;
import pl.polsl.acsupport.dtos.ServiceTypeDto;
import pl.polsl.acsupport.services.ServiceService;

@RequiredArgsConstructor
@RequestMapping("/service")
@RestController
@Validated
public class ServiceController {

    public ServiceService serviceService;

    @PreAuthorize("hasAuthority('FIND_SERVICE')")
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ServiceDto findService (@PathVariable Long id){
        return serviceService.get(id);
    }

    @PreAuthorize("hasAuthority('CREATE_SERVICE')")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Long create(@RequestBody ServiceDto serviceDto){
        return serviceService.create(serviceDto).getId();
    }

    @PreAuthorize("hasAuthority('UPDATE_SERVICE')")
    @PatchMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void update (@PathVariable Long id, @RequestBody ServiceDto serviceDto){
        serviceService.update(id,serviceDto);
    }

    @PreAuthorize("hasAuthority('DELETE_SERVICE')")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete (@PathVariable Long id){
        serviceService.delete(id);
    }

    @PreAuthorize("hasAuthority('FIND_SERVICE')")
    @GetMapping("/type/{serviceId}")
    public ServiceTypeDto findServiceType(@PathVariable Long serviceId){
        return serviceService.findServiceType(serviceId);
    }

    @PreAuthorize("hasAuthority('UPDATE_SERVICE')")
    @PatchMapping("/assigntype/{serviceId}")
    public void assignTypeToService(@PathVariable Long serviceId, @RequestBody Long typeId){
        serviceService.assignTypeToService(serviceId, typeId);
    }

    @PreAuthorize("hasAuthority('UPDATE_SERVICE')")
    @PatchMapping("/reverttype/{serviceId}")
    public void revertAssigningTypeToService(@PathVariable Long serviceId){
        serviceService.revertAssigningTypeFromService(serviceId);
    }

    @PreAuthorize("hasAuthority('FIND_SERVICE')")
    @GetMapping("/room/{serviceId}")
    public RoomDto findServiceRoom(@PathVariable Long serviceId){
        return serviceService.findServiceRoom(serviceId);
    }

    @PreAuthorize("hasAuthority('UPDATE_SERVICE')")
    @PatchMapping("/assignroom/{serviceId}")
    public void assignServiceToRoom(@PathVariable Long serviceId, @RequestBody Long roomId){
        serviceService.assignServiceToRoom(serviceId, roomId);
    }

    @PreAuthorize("hasAuthority('UPDATE_SERVICE')")
    @PatchMapping("/revertroom/{serviceId}")
    public void revertAssigningServiceFromRoom(@PathVariable Long serviceId){
        serviceService.revertAssigningServiceFromRoom(serviceId);
    }

    @PreAuthorize("hasAuthority('FIND_SERVICE')")
    @GetMapping("/building/{buildingId}")
    @ResponseStatus(HttpStatus.OK)
    public Page<ServiceDto> findServiceByBuildingId (@PathVariable Long buildingId, @PageableDefault Pageable pageable){
        return serviceService.findServiceByBuildingId(buildingId, pageable);
    }

    @PreAuthorize("hasAuthority('FIND_SERVICE')")
    @GetMapping("/operator/{buildingId}")
    @ResponseStatus(HttpStatus.OK)
    public Page<OperatorServiceDto> findAllOperatorServices (@PathVariable Long buildingId, @PageableDefault Pageable pageable){
        return serviceService.findAllOperatorServices(buildingId, pageable);
    }
}
