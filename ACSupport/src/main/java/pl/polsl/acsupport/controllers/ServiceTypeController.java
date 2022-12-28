package pl.polsl.acsupport.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pl.polsl.acsupport.dtos.ServiceTypeDto;
import pl.polsl.acsupport.services.ServiceTypeService;

@RequiredArgsConstructor
@RequestMapping("/servicetype")
@RestController
@Validated
public class ServiceTypeController {
    private final ServiceTypeService serviceTypeService;

    @PreAuthorize("hasAuthority('FIND_SERVICE_TYPE')")
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Page<ServiceTypeDto> findAll(@PageableDefault Pageable pageable){
        return serviceTypeService.findAll(pageable);
    }

    @PreAuthorize("hasAuthority('FIND_SERVICE_TYPE')")
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ServiceTypeDto findServiceType(@PathVariable Long id){
        return serviceTypeService.get(id);
    }

    @PreAuthorize("hasAuthority('CREATE_SERVICE_TYPE')")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Long create(@RequestBody ServiceTypeDto serviceTypeDto){
        return serviceTypeService.create(serviceTypeDto).getId();
    }

    @PreAuthorize("hasAuthority('DELETE_SERVICE_TYPE')")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable Long id){
        serviceTypeService.delete(id);
    }
}
