package pl.polsl.acsupport.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
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
}
