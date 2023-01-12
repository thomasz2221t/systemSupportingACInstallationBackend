package pl.polsl.acsupport.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pl.polsl.acsupport.dtos.InstallerEquipmentDto;
import pl.polsl.acsupport.services.InstallerEquipmentService;

@RequiredArgsConstructor
@RequestMapping("/equipment")
@RestController
@Validated
public class InstallerEquipmentController {

    private final InstallerEquipmentService installerEquipmentService;

    @PreAuthorize("hasAuthority('FIND_EQUIPMENT')")
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Page<InstallerEquipmentDto> findAll(@PageableDefault Pageable pageable){
        return installerEquipmentService.findAll(pageable);
    }

    @PreAuthorize("hasAuthority('FIND_EQUIPMENT')")
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public InstallerEquipmentDto findInstallerEquipment(@PathVariable Long id){
        return installerEquipmentService.get(id);
    }

    @PreAuthorize("hasAuthority('CREATE_EQUIPMENT')")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Long createInstallerEquipment(@RequestBody InstallerEquipmentDto dto){
        return installerEquipmentService.create(dto).getId();
    }

    @PreAuthorize("hasAuthority('UPDATE_EQUIPMENT')")
    @PatchMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void updateInstallerEquipment(@PathVariable Long id, @RequestBody InstallerEquipmentDto dto){
        installerEquipmentService.update(id,dto);
    }

    @PreAuthorize("hasAuthority('DELETE_EQUIPMENT')")
    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteInstallerEquipment(@PathVariable Long id){
        installerEquipmentService.delete(id);
    }
}
